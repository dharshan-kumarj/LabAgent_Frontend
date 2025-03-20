export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const AUTH_ENDPOINT = `${API_URL}/auth/signin`;
export const REGISTER_ENDPOINT = `${API_URL}/auth/signup`;
export const GOOGLE_AUTH_ENDPOINT = `${API_URL}/auth/google/signin`;