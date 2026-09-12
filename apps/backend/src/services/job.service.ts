import db from '../config/database';

export const VALID_JOB_TRANSITIONS: Record<string, string[]> = {
  'requested': ['cancelled', 'matching', 'booked'],
  'matching': ['cancelled', 'booked', 'requested'],
  'booked': ['cancelled', 'in_progress'],
  'in_progress': ['completed', 'cancelled', 'disputed'],
  'completed': [],
  'cancelled': [],
  'disputed': ['completed', 'cancelled']
};

export class JobService {
  async getJob(id: string) {
    const job = await db('job_requests').where({ id }).first();
    if (!job) throw new Error('Job not found');
    return job;
  }

  async updateJobStatus(id: string, newStatus: string, userId: string, role: string) {
    const job = await this.getJob(id);

    // Validate transition
    const allowedTransitions = VALID_JOB_TRANSITIONS[job.status] || [];
    if (!allowedTransitions.includes(newStatus)) {
      throw new Error(`Invalid state transition from ${job.status} to ${newStatus}`);
    }

    // Role-based auth check could go here
    if (role === 'customer' && job.customer_id !== userId) {
        throw new Error('Unauthorized');
    }

    await db('job_requests').where({ id }).update({ status: newStatus, updated_at: db.fn.now() });
    
    // Log audit
    await db('audit_logs').insert({
      id: require('uuid').v4(),
      user_id: userId,
      action: 'UPDATE_JOB_STATUS',
      entity_type: 'job_request',
      entity_id: id,
      details: JSON.stringify({ old_status: job.status, new_status: newStatus }),
      ip_address: 'system'
    });

    return { ...job, status: newStatus };
  }

  async cancelJob(id: string, userId: string, role: string) {
    return this.updateJobStatus(id, 'cancelled', userId, role);
  }
}

export const jobService = new JobService();
