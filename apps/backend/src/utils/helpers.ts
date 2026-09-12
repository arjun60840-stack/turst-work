import { v4 as uuidv4 } from 'uuid';

export function generateId(): string {
  return uuidv4();
}

export function getPaginationOptions(page?: number, limit?: number) {
  const parsedPage = page ? Math.max(1, page) : 1;
  const parsedLimit = limit ? Math.min(Math.max(1, limit), 100) : 10;
  
  return {
    page: parsedPage,
    limit: parsedLimit,
    offset: (parsedPage - 1) * parsedLimit
  };
}

export function buildPaginatedResponse<T>(data: T[], total: number, page: number, limit: number) {
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export function paginate(page: number = 1, perPage: number = 20) {
  const p = Math.max(1, page);
  const pp = Math.min(Math.max(1, perPage), 100);
  return { limit: pp, offset: (p - 1) * pp, page: p, perPage: pp };
}

export function paginationMeta(total: number, page: number, perPage: number) {
  return {
    page,
    per_page: perPage,
    total,
    total_pages: Math.ceil(total / perPage),
  };
}

export function successResponse(data?: any, message?: string) {
  return { success: true, data, message };
}

export function errorResponse(error: string, _statusCode: number = 400) {
  return { success: false, error };
}

export function generateOTP(length: number = 6): string {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
}

export function isValidTransition(
  currentStatus: string,
  newStatus: string,
  transitions: Record<string, string[]>
): boolean {
  const allowed = transitions[currentStatus];
  if (!allowed) return false;
  return allowed.includes(newStatus);
}
