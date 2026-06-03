export const getApiUrl = (): string => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
      return 'http://localhost:8000';
    }
  }
  return process.env.NEXT_PUBLIC_API_URL || 'https://fastapi-backend-8oyu.onrender.com';
};
