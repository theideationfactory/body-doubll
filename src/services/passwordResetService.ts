import { getAuth, sendPasswordResetEmail, confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';

export const passwordResetService = {
  async sendResetEmail(email: string) {
    const auth = getAuth();
    const redirectTo = `${window.location.origin}/reset-password`;
    return await sendPasswordResetEmail(auth, email, {
      url: redirectTo
    });
  },

  async updatePassword(code: string, newPassword: string) {
    const auth = getAuth();
    return await confirmPasswordReset(auth, code, newPassword);
  },

  async verifyResetToken(code: string) {
    const auth = getAuth();
    return await verifyPasswordResetCode(auth, code);
  }
};