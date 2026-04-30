export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function assertBaseUrl() {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL 환경변수가 필요합니다.");
  }
}
