import { PLATFORM_FEE_PERCENT, COOPERATIVE_CONTRIBUTION_PERCENT } from '../../../packages/shared/src/constants';

describe('Fair Wage & Transparent Payment Splitting', () => {
  it('should correctly calculate individual wage split', () => {
    const budget = 2000;
    const platformFee = budget * (PLATFORM_FEE_PERCENT / 100);
    const workerWage = budget - platformFee;

    expect(platformFee).toBe(200); // 10%
    expect(workerWage).toBe(1800);  // 90%
    expect(workerWage + platformFee).toBe(budget);
  });

  it('should correctly calculate group cooperative wage split for 4 workers', () => {
    const budget = 5000;
    const workersCount = 4;

    const platformFee = budget * (PLATFORM_FEE_PERCENT / 100); // 500
    const cooperativeContrib = (budget - platformFee) * (COOPERATIVE_CONTRIBUTION_PERCENT / 100); // 450
    const workerTotal = budget - platformFee - cooperativeContrib; // 4050
    const perWorkerWage = Math.round(workerTotal / workersCount); // 1013 approx

    expect(platformFee).toBe(500);
    expect(cooperativeContrib).toBe(450);
    expect(workerTotal).toBe(4050);
    expect(perWorkerWage * workersCount + cooperativeContrib + platformFee).toBeCloseTo(budget, -1);
  });
});
