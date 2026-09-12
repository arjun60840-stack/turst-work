import { VALID_JOB_TRANSITIONS } from '../../../packages/shared/src/constants';
import { isValidTransition } from '../src/utils/helpers';

describe('Job Lifecycle State Machine', () => {
  it('should allow valid sequential progression', () => {
    expect(isValidTransition('requested', 'matching', VALID_JOB_TRANSITIONS)).toBe(true);
    expect(isValidTransition('matching', 'booked', VALID_JOB_TRANSITIONS)).toBe(true);
    expect(isValidTransition('booked', 'assigned', VALID_JOB_TRANSITIONS)).toBe(true);
    expect(isValidTransition('assigned', 'arriving', VALID_JOB_TRANSITIONS)).toBe(true);
    expect(isValidTransition('arriving', 'attendance_verified', VALID_JOB_TRANSITIONS)).toBe(true);
    expect(isValidTransition('attendance_verified', 'in_progress', VALID_JOB_TRANSITIONS)).toBe(true);
    expect(isValidTransition('in_progress', 'completed', VALID_JOB_TRANSITIONS)).toBe(true);
    expect(isValidTransition('completed', 'payment_pending', VALID_JOB_TRANSITIONS)).toBe(true);
    expect(isValidTransition('payment_pending', 'paid', VALID_JOB_TRANSITIONS)).toBe(true);
    expect(isValidTransition('paid', 'feedback_pending', VALID_JOB_TRANSITIONS)).toBe(true);
    expect(isValidTransition('feedback_pending', 'closed', VALID_JOB_TRANSITIONS)).toBe(true);
  });

  it('should reject invalid direct transitions', () => {
    // Cannot jump from requested directly to in_progress or paid
    expect(isValidTransition('requested', 'in_progress', VALID_JOB_TRANSITIONS)).toBe(false);
    expect(isValidTransition('requested', 'paid', VALID_JOB_TRANSITIONS)).toBe(false);
    expect(isValidTransition('booked', 'completed', VALID_JOB_TRANSITIONS)).toBe(false);
    expect(isValidTransition('closed', 'in_progress', VALID_JOB_TRANSITIONS)).toBe(false);
  });
});
