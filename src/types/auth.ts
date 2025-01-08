export interface AuthError {
  message: string;
  code?: string;
  status?: number;
}

export interface AuthState {
  message?: string;
  error?: string;
}

export type AccountType = 'client' | 'admin' | 'doubll';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  username: string;
  accountType: AccountType;
}