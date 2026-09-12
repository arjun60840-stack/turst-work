import db from '../config/database';
import { env } from '../config/env';
import { haversineDistance } from '../utils/geo';
import logger from '../utils/logger';

interface MatchWeight {
  skill_match: number;
  availability: number;
  distance: number;
  reliability: number;
  experience: number;
  rating: number;
  verification: number;
  wage_compatibility: number;
}

interface MatchReason {
  factor: string;
  score: number;
  max_score: number;
  label: string;
  passed: boolean;
  detail?: string;
}

interface CandidateResult {
  candidate_id: string;
  candidate_type: 'worker' | 'cooperative';
  match_score: number;
  match_percentage: number;
  reasons: MatchReason[];
  worker?: any;
  cooperative?: any;
  members?: any[];
}

export class MatchingService {
  private weights: MatchWeight;

  constructor() {
    this.weights = {
      skill_match: env.MATCH_WEIGHT_SKILL,
      availability: env.MATCH_WEIGHT_AVAILABILITY,
      distance: env.MATCH_WEIGHT_DISTANCE,
      reliability: env.MATCH_WEIGHT_RELIABILITY,
      experience: env.MATCH_WEIGHT_EXPERIENCE,
      rating: env.MATCH_WEIGHT_RATING,
      verification: env.MATCH_WEIGHT_VERIFICATION,
      wage_compatibility: env.MATCH_WEIGHT_WAGE,
    };
  }

  async runMatching(jobId: string, maxResults: number = 10, maxDistanceKm?: number): Promise<CandidateResult[]> {
    const job = await db('job_requests').where({ id: jobId }).first();
    if (!job) throw new Error('Job not found');

    const requirements = await db('job_requirements')
      .where({ job_id: jobId })
      .join('skills', 'job_requirements.skill_id', 'skills.id')
      .select('job_requirements.*', 'skills.name as skill_name');

    const requiredSkillIds = requirements.map((r: any) => r.skill_id);
    const maxDist = maxDistanceKm || env.MAX_SERVICE_RADIUS_KM;

    let candidates: CandidateResult[] = [];

    if (job.hiring_type === 'group') {
      // Match cooperatives for group hiring
      const coopCandidates = await this.matchCooperatives(job, requiredSkillIds, requirements, maxDist);
      candidates.push(...coopCandidates);
    }

    // Also match individual workers
    const workerCandidates = await this.matchWorkers(job, requiredSkillIds, requirements, maxDist);
    candidates.push(...workerCandidates);

    // Sort by match score descending
    candidates.sort((a, b) => b.match_score - a.match_score);

    // Take top N results
    candidates = candidates.slice(0, maxResults);

    // Store results in job_candidates
    await db('job_candidates').where({ job_id: jobId }).del();
    for (const c of candidates) {
      await db('job_candidates').insert({
        id: require('uuid').v4(),
        job_id: jobId,
        worker_id: c.candidate_type === 'worker' ? c.candidate_id : null,
        cooperative_id: c.candidate_type === 'cooperative' ? c.candidate_id : null,
        match_score: c.match_score,
        match_reasons: JSON.stringify(c.reasons),
        is_selected: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    // Update job status to matching
    await db('job_requests').where({ id: jobId }).update({
      status: 'matching', updated_at: new Date().toISOString(),
    });

    return candidates;
  }

  private async matchWorkers(job: any, requiredSkillIds: string[], requirements: any[], maxDist: number): Promise<CandidateResult[]> {
    const workers = await db('workers')
      .where({ is_available: true })
      .whereNot({ verification_status: 'rejected' });

    const results: CandidateResult[] = [];

    for (const worker of workers) {
      // Get worker skills
      const workerSkills = await db('worker_skills')
        .where({ worker_id: worker.id })
        .join('skills', 'worker_skills.skill_id', 'skills.id')
        .select('worker_skills.*', 'skills.name as skill_name');

      const workerSkillIds = workerSkills.map((s: any) => s.skill_id);

      // Calculate distance
      let distance = maxDist + 1; // Default: out of range
      if (worker.latitude && worker.longitude && job.latitude && job.longitude) {
        distance = haversineDistance(worker.latitude, worker.longitude, job.latitude, job.longitude);
      }

      // Skip if out of range
      if (distance > maxDist) continue;

      // Feature extraction
      const features = this.extractWorkerFeatures(worker, workerSkills, workerSkillIds, requiredSkillIds, distance, maxDist, job);
      const { score, reasons } = this.calculateScore(features);

      // Only include if minimum threshold met
      if (score >= 0.2) {
        results.push({
          candidate_id: worker.id,
          candidate_type: 'worker',
          match_score: score,
          match_percentage: Math.round(score * 100),
          reasons,
          worker: { ...worker, skills: workerSkills },
        });
      }
    }

    return results;
  }

  private async matchCooperatives(job: any, requiredSkillIds: string[], requirements: any[], maxDist: number): Promise<CandidateResult[]> {
    const cooperatives = await db('cooperatives')
      .where({ is_active: true })
      .whereNot({ verification_status: 'rejected' });

    const results: CandidateResult[] = [];

    for (const coop of cooperatives) {
      // Get members
      const members = await db('cooperative_members')
        .where({ 'cooperative_members.cooperative_id': coop.id, 'cooperative_members.is_active': true })
        .join('workers', 'cooperative_members.worker_id', 'workers.id')
        .select('workers.*', 'cooperative_members.role as member_role');

      // Skip if not enough members
      if (members.length < job.workers_needed) continue;

      // Aggregate team skills
      const allTeamSkillIds: string[] = [];
      const allTeamSkills: any[] = [];
      let totalExperience = 0;

      for (const member of members) {
        const memberSkills = await db('worker_skills')
          .where({ worker_id: member.id })
          .join('skills', 'worker_skills.skill_id', 'skills.id')
          .select('worker_skills.*', 'skills.name as skill_name');
        
        allTeamSkills.push(...memberSkills);
        memberSkills.forEach((s: any) => {
          if (!allTeamSkillIds.includes(s.skill_id)) allTeamSkillIds.push(s.skill_id);
          totalExperience += s.years_experience || 0;
        });
      }

      // Calculate distance from coop or average member location
      let distance = maxDist + 1;
      if (coop.latitude && coop.longitude && job.latitude && job.longitude) {
        distance = haversineDistance(coop.latitude, coop.longitude, job.latitude, job.longitude);
      }
      if (distance > maxDist) continue;

      // Skill match for team
      const matchedSkills = requiredSkillIds.filter(id => allTeamSkillIds.includes(id));
      const skillScore = requiredSkillIds.length > 0
        ? matchedSkills.length / requiredSkillIds.length
        : 1;

      // Team capacity
      const capacityMatch = members.length >= job.workers_needed ? 1 : members.length / job.workers_needed;

      // Average reliability
      const avgReliability = members.reduce((s: number, m: any) => s + (m.reliability_score || 50), 0) / members.length;

      // Average rating
      const avgRating = members.reduce((s: number, m: any) => s + (m.average_rating || 0), 0) / members.length;

      // Average experience
      const avgExperience = totalExperience / Math.max(members.length, 1);

      // Verification
      const verifiedCount = members.filter((m: any) => m.verification_status === 'verified').length;
      const verificationScore = coop.verification_status === 'verified' ? 1 : (verifiedCount / members.length) * 0.7;

      // Distance score
      const distanceScore = Math.max(0, 1 - (distance / maxDist));

      // Wage compatibility
      const perWorkerBudget = job.budget / Math.max(job.workers_needed, 1);
      const wageScore = perWorkerBudget >= 200 ? 1 : perWorkerBudget / 200;

      const reasons: MatchReason[] = [];

      // Build reasons
      reasons.push({
        factor: 'skill_match', score: skillScore, max_score: 1,
        label: `${matchedSkills.length}/${requiredSkillIds.length} required skills available`,
        passed: skillScore >= 0.5,
        detail: matchedSkills.length === requiredSkillIds.length ? 'All required skills available' : `Has ${matchedSkills.length} of ${requiredSkillIds.length} required skills`,
      });
      reasons.push({
        factor: 'availability', score: capacityMatch, max_score: 1,
        label: `Team capacity: ${members.length} workers`,
        passed: capacityMatch >= 1,
        detail: `${members.length} available, ${job.workers_needed} needed`,
      });
      reasons.push({
        factor: 'distance', score: distanceScore, max_score: 1,
        label: `${distance.toFixed(1)} km away`,
        passed: distanceScore > 0.5,
      });
      reasons.push({
        factor: 'reliability', score: avgReliability / 100, max_score: 1,
        label: `${Math.round(avgReliability)}% reliability`,
        passed: avgReliability >= 70,
      });
      reasons.push({
        factor: 'experience', score: Math.min(avgExperience / 10, 1), max_score: 1,
        label: `${avgExperience.toFixed(0)} avg years experience`,
        passed: avgExperience >= 2,
      });
      reasons.push({
        factor: 'rating', score: avgRating / 5, max_score: 1,
        label: `${avgRating.toFixed(1)} avg rating`,
        passed: avgRating >= 3.5,
      });
      reasons.push({
        factor: 'verification', score: verificationScore, max_score: 1,
        label: coop.verification_status === 'verified' ? 'Verified cooperative' : `${verifiedCount}/${members.length} members verified`,
        passed: verificationScore >= 0.5,
      });
      reasons.push({
        factor: 'wage_compatibility', score: wageScore, max_score: 1,
        label: wageScore >= 0.8 ? 'Budget compatible' : 'Budget may be tight',
        passed: wageScore >= 0.6,
      });

      // Weighted score
      const totalScore =
        this.weights.skill_match * skillScore +
        this.weights.availability * capacityMatch +
        this.weights.distance * distanceScore +
        this.weights.reliability * (avgReliability / 100) +
        this.weights.experience * Math.min(avgExperience / 10, 1) +
        this.weights.rating * (avgRating / 5) +
        this.weights.verification * verificationScore +
        this.weights.wage_compatibility * wageScore;

      if (totalScore >= 0.2) {
        results.push({
          candidate_id: coop.id,
          candidate_type: 'cooperative',
          match_score: totalScore,
          match_percentage: Math.round(totalScore * 100),
          reasons,
          cooperative: coop,
          members: members.map((m: any) => ({ ...m })),
        });
      }
    }

    return results;
  }

  private extractWorkerFeatures(worker: any, workerSkills: any[], workerSkillIds: string[], requiredSkillIds: string[], distance: number, maxDist: number, job: any) {
    const matchedSkills = requiredSkillIds.filter(id => workerSkillIds.includes(id));
    const skillScore = requiredSkillIds.length > 0
      ? matchedSkills.length / requiredSkillIds.length : 1;

    const distanceScore = Math.max(0, 1 - (distance / maxDist));
    const reliabilityScore = (worker.reliability_score || 50) / 100;
    const totalExp = workerSkills.reduce((s: number, ws: any) => s + (ws.years_experience || 0), 0);
    const experienceScore = Math.min(totalExp / 10, 1);
    const ratingScore = (worker.average_rating || 0) / 5;
    const verificationScore = worker.verification_status === 'verified' ? 1 : worker.verification_status === 'pending' ? 0.5 : 0;
    const wageScore = job.budget >= 200 ? 1 : job.budget / 200;

    return {
      skillScore, matchedSkills, distanceScore, distance, reliabilityScore,
      experienceScore, totalExp, ratingScore, verificationScore, wageScore,
      workerSkills, requiredSkillIds,
    };
  }

  private calculateScore(f: any): { score: number; reasons: MatchReason[] } {
    const score =
      this.weights.skill_match * f.skillScore +
      this.weights.availability * 1 + // Available since filtered
      this.weights.distance * f.distanceScore +
      this.weights.reliability * f.reliabilityScore +
      this.weights.experience * f.experienceScore +
      this.weights.rating * f.ratingScore +
      this.weights.verification * f.verificationScore +
      this.weights.wage_compatibility * f.wageScore;

    const reasons: MatchReason[] = [
      {
        factor: 'skill_match', score: f.skillScore, max_score: 1,
        label: `${f.matchedSkills.length}/${f.requiredSkillIds.length} required skills`,
        passed: f.skillScore >= 0.5,
        detail: f.matchedSkills.length === f.requiredSkillIds.length ? 'All required skills matched' : `Has ${f.matchedSkills.length} of ${f.requiredSkillIds.length} skills`,
      },
      {
        factor: 'availability', score: 1, max_score: 1,
        label: 'Available at requested time', passed: true,
      },
      {
        factor: 'distance', score: f.distanceScore, max_score: 1,
        label: `${f.distance.toFixed(1)} km away`,
        passed: f.distanceScore > 0.5,
      },
      {
        factor: 'reliability', score: f.reliabilityScore, max_score: 1,
        label: `${Math.round(f.reliabilityScore * 100)}% reliability`,
        passed: f.reliabilityScore >= 0.7,
      },
      {
        factor: 'experience', score: f.experienceScore, max_score: 1,
        label: `${f.totalExp} years experience`,
        passed: f.experienceScore >= 0.3,
      },
      {
        factor: 'rating', score: f.ratingScore, max_score: 1,
        label: `${(f.ratingScore * 5).toFixed(1)} rating`,
        passed: f.ratingScore >= 0.7,
      },
      {
        factor: 'verification', score: f.verificationScore, max_score: 1,
        label: f.verificationScore === 1 ? 'Verified' : f.verificationScore > 0 ? 'Pending verification' : 'Not verified',
        passed: f.verificationScore >= 0.5,
      },
      {
        factor: 'wage_compatibility', score: f.wageScore, max_score: 1,
        label: f.wageScore >= 0.8 ? 'Budget compatible' : 'Budget tight',
        passed: f.wageScore >= 0.6,
      },
    ];

    return { score, reasons };
  }

  async getMatchResults(jobId: string): Promise<CandidateResult[]> {
    const candidates = await db('job_candidates').where({ job_id: jobId }).orderBy('match_score', 'desc');
    const results: CandidateResult[] = [];

    for (const c of candidates) {
      const result: CandidateResult = {
        candidate_id: c.worker_id || c.cooperative_id,
        candidate_type: c.worker_id ? 'worker' : 'cooperative',
        match_score: c.match_score,
        match_percentage: Math.round(c.match_score * 100),
        reasons: JSON.parse(c.match_reasons || '[]'),
      };

      if (c.worker_id) {
        const worker = await db('workers').where({ id: c.worker_id }).first();
        const skills = await db('worker_skills')
          .where({ worker_id: c.worker_id })
          .join('skills', 'worker_skills.skill_id', 'skills.id')
          .select('worker_skills.*', 'skills.name as skill_name');
        result.worker = { ...worker, skills };
      }
      if (c.cooperative_id) {
        const coop = await db('cooperatives').where({ id: c.cooperative_id }).first();
        const members = await db('cooperative_members')
          .where({ 'cooperative_members.cooperative_id': c.cooperative_id, 'cooperative_members.is_active': true })
          .join('workers', 'cooperative_members.worker_id', 'workers.id')
          .select('workers.*', 'cooperative_members.role as member_role');
        result.cooperative = coop;
        result.members = members;
      }
      results.push(result);
    }

    return results;
  }
}

export const matchingService = new MatchingService();
