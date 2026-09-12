import { RELIABILITY_WEIGHTS } from '../../../packages/shared/src/constants';

describe('Worker & Cooperative Reliability Engine', () => {
  it('should compute high score for worker with excellent platform record', () => {
    const stats = {
      completed_jobs: 24,
      cancelled_jobs: 0,
      no_shows: 0,
      total_attendances: 24,
      on_time_attendances: 24,
      average_rating: 4.9, // out of 5
      accepted_jobs: 25,
      ignored_jobs: 1,
    };

    const completionRate = stats.completed_jobs / (stats.completed_jobs + stats.cancelled_jobs + stats.no_shows); // 1.0
    const attendanceRate = stats.on_time_attendances / stats.total_attendances; // 1.0
    const ratingRate = stats.average_rating / 5; // 0.98
    const cancelPenalty = Math.max(0, 1 - (stats.cancelled_jobs * 0.1)); // 1.0
    const responseRate = stats.accepted_jobs / (stats.accepted_jobs + stats.ignored_jobs); // 0.961

    const reliabilityScore = (
      RELIABILITY_WEIGHTS.completion_rate * completionRate +
      RELIABILITY_WEIGHTS.attendance_rate * attendanceRate +
      RELIABILITY_WEIGHTS.average_rating * ratingRate +
      RELIABILITY_WEIGHTS.cancellation_penalty * cancelPenalty +
      RELIABILITY_WEIGHTS.response_rate * responseRate
    ) * 100;

    expect(reliabilityScore).toBeGreaterThan(95);
    expect(reliabilityScore).toBeLessThanOrEqual(100);
  });

  it('should penalize cancellations and no-shows proportionally', () => {
    const poorStats = {
      completed_jobs: 5,
      cancelled_jobs: 3,
      no_shows: 1,
      total_attendances: 6,
      on_time_attendances: 4,
      average_rating: 3.2,
      accepted_jobs: 6,
      ignored_jobs: 8,
    };

    const completionRate = poorStats.completed_jobs / (poorStats.completed_jobs + poorStats.cancelled_jobs + poorStats.no_shows);
    const attendanceRate = poorStats.on_time_attendances / poorStats.total_attendances;
    const ratingRate = poorStats.average_rating / 5;
    const cancelPenalty = Math.max(0, 1 - (poorStats.cancelled_jobs * 0.1));
    const responseRate = poorStats.accepted_jobs / (poorStats.accepted_jobs + poorStats.ignored_jobs);

    const reliabilityScore = (
      RELIABILITY_WEIGHTS.completion_rate * completionRate +
      RELIABILITY_WEIGHTS.attendance_rate * attendanceRate +
      RELIABILITY_WEIGHTS.average_rating * ratingRate +
      RELIABILITY_WEIGHTS.cancellation_penalty * cancelPenalty +
      RELIABILITY_WEIGHTS.response_rate * responseRate
    ) * 100;

    expect(reliabilityScore).toBeLessThan(70);
  });
});
