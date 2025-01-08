import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import { getAuth, confirmPasswordReset } from 'firebase/auth';
import { AuthForm } from './AuthForm';
import { validatePassword } from '../../utils/authValidation';

export function PasswordResetForm() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password requirements
    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      const auth = getAuth();
      const code = new URLSearchParams(window.location.search).get('oobCode');
      
      if (!code) {
        throw new Error('Invalid reset code');
      }

      await confirmPasswordReset(auth, code, newPassword);

      // Redirect to login with success message
      navigate('/login', { 
        state: { 
          message: 'Password updated successfully. Please log in with your new password.' 
        }
      });

    } catch (err) {
      console.error('Password update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm onSubmit={handleSubmit}>
      {/* Rest of the component remains the same */}
    </AuthForm>
  );
}