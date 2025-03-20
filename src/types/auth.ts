export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}
