/**
 * Calculates the great-circle distance between two points on the Earth's surface using the Haversine formula.
 * @param lat1 Latitude of first point in degrees
 * @param lon1 Longitude of first point in degrees
 * @param lat2 Latitude of second point in degrees
 * @param lon2 Longitude of second point in degrees
 * @returns Distance in kilometers
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const haversineDistance = calculateDistanceKm;

export function isWithinRadius(
  lat1: number, lon1: number,
  lat2: number, lon2: number,
  radiusKm: number
): boolean {
  return calculateDistanceKm(lat1, lon1, lat2, lon2) <= radiusKm;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
