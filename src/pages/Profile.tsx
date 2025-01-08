import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NavigationStrip } from '../components/NavigationStrip';

export function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 sm:p-8 pt-24">
      <NavigationStrip />
      
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <User size={40} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                {user?.displayName || 'User Profile'}
              </h1>
              <p className="text-white/60">Manage your account settings</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Email</label>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Mail className="w-5 h-5 text-white/40" />
                <span className="text-white">{user?.email}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Member Since</label>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Calendar className="w-5 h-5 text-white/40" />
                <span className="text-white">
                  {user?.metadata.creationTime 
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}