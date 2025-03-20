import axios from 'axios';
import { AUTH_ENDPOINT, REGISTER_ENDPOINT, GOOGLE_AUTH_ENDPOINT } from './env';
import { LoginCredentials, LoginResponse, RegisterCredentials } from '@/types/auth';

const TOKEN_KEY = 'auth_token';


export const login = async (credentials: LoginCredentials): Promise<string> => {
  try {
    const response = await axios.post<LoginResponse>(AUTH_ENDPOINT, credentials);
    const { access_token } = response.data;
    
    // Save token to localStorage
    localStorage.setItem(TOKEN_KEY, access_token);
    
    return access_token;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (credentials: RegisterCredentials): Promise<void> => {
  try {
    await axios.post(REGISTER_ENDPOINT, credentials);
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const initiateGoogleAuth = () => {
  // Redirect to backend Google auth endpoint
  window.location.href = GOOGLE_AUTH_ENDPOINT;
};

export const handleGoogleRedirect = () => {
  // Extract JWT from Authorization header
  // This will be handled in the GoogleLogin component
  const token = sessionStorage.getItem('google_auth_token');
  
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    sessionStorage.removeItem('google_auth_token');
    return true;
  }
  
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
