export const AUTH_ERRORS = {
  EMAIL_NOT_CONFIRMED: 'Email not confirmed',
  INVALID_CREDENTIALS: 'Invalid login credentials',
  NETWORK_ERROR: 'Network error. Please check your connection',
  GENERIC_ERROR: 'An error occurred. Please try again'
} as const;

export function getAuthErrorMessage(error: any): string {
  if (!error) return AUTH_ERRORS.GENERIC_ERROR;

  const message = error.message?.toLowerCase() || '';

  if (message.includes('email not confirmed')) {
    return 'Please check your email for a confirmation link before signing in';
  }

  if (message.includes('invalid login credentials')) {
    return 'Invalid email or password';
  }

  if (message.includes('network')) {
    return AUTH_ERRORS.NETWORK_ERROR;
  }

  return error.message || AUTH_ERRORS.GENERIC_ERROR;
}