import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function UserProfileButton() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <button
      onClick={() => navigate('/profile')}
      className="flex items-center gap-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300"
    >
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
        <User size={16} className="text-gray-700" />
      </div>
      <span>
        {user?.displayName || 'Profile'}
      </span>
    </button>
  );
}