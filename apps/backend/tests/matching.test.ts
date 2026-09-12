import { haversineDistance, isWithinRadius } from '../src/utils/geo';
import { DEFAULT_MATCH_WEIGHTS } from '../../../packages/shared/src/constants';

describe('AI Matching Engine & Location Utilities', () => {
  describe('Haversine Distance', () => {
    it('should calculate accurate distance between two GPS coordinates', () => {
      // Mumbai CST to Bandra Station (~11.5 km)
      const dist = haversineDistance(18.9400, 72.8353, 19.0544, 72.8402);
      expect(dist).toBeGreaterThan(10);
      expect(dist).toBeLessThan(15);
    });

    it('should return 0 distance for identical coordinates', () => {
      const dist = haversineDistance(19.0760, 72.8777, 19.0760, 72.8777);
      expect(dist).toBeCloseTo(0, 4);
    });

    it('should correctly evaluate radius bounds', () => {
      // Points ~3.5 km apart
      const lat1 = 19.0500, lon1 = 72.8300;
      const lat2 = 19.0700, lon2 = 72.8500;
      expect(isWithinRadius(lat1, lon1, lat2, lon2, 10)).toBe(true);
      expect(isWithinRadius(lat1, lon1, lat2, lon2, 1)).toBe(false);
    });
  });

  describe('Weighted Score Calculation', () => {
    it('should normalize weights to sum to 1.0 (100%)', () => {
      const totalWeight = Object.values(DEFAULT_MATCH_WEIGHTS).reduce((sum, w) => sum + w, 0);
      expect(totalWeight).toBeCloseTo(1.0, 5);
    });

    it('should compute explainable match score with valid features', () => {
      const weights = DEFAULT_MATCH_WEIGHTS;
      const features = {
        skill_match: 1.0,        // 100% skill match (30%)
        availability: 1.0,       // Available (15%)
        distance: 0.9,           // Very close (15% * 0.9 = 13.5%)
        reliability: 0.95,       // High reliability (15% * 0.95 = 14.25%)
        experience: 0.8,         // 8 yrs exp (10% * 0.8 = 8%)
        rating: 0.96,            // 4.8 / 5.0 (5% * 0.96 = 4.8%)
        verification: 1.0,       // Verified (5%)
        wage_compatibility: 1.0, // Compatible (5%)
      };

      const calculatedScore =
        weights.skill_match * features.skill_match +
        weights.availability * features.availability +
        weights.distance * features.distance +
        weights.reliability * features.reliability +
        weights.experience * features.experience +
        weights.rating * features.rating +
        weights.verification * features.verification +
        weights.wage_compatibility * features.wage_compatibility;

      const percentage = Math.round(calculatedScore * 100);
      expect(percentage).toBeGreaterThanOrEqual(90);
      expect(percentage).toBeLessThanOrEqual(100);
    });
  });
});
