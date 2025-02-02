
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Heart, Timer, Users, SmilePlus, Backpack, Stethoscope, LogOut, Search, UserSearch, Sparkles, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserProfileButton } from '../components/UserProfileButton';
import { ClockInButton } from '../components/ClockInButton';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  path: string;
}

export function Home() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [accountType, setAccountType] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setAccountType(userDoc.data().accountType);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const baseMenuItems: MenuItem[] = [
    {
      id: 'new-needs',
      name: 'New Needs',
      description: 'Latest functionality',
      icon: Sparkles,
      gradient: 'from-rose-500 to-pink-500',
      path: '/new-needs'
    },
    {
      id: 'bag-checklist',
      name: 'Bag Checklist',
      description: 'Never forget your essentials',
      icon: Backpack,
      gradient: 'from-emerald-500 to-teal-500',
      path: '/bag-checklist'
    },
    {
      id: 'mood',
      name: 'Mood Tracker',
      description: 'Impact and Compatibility',
      icon: SmilePlus,
      gradient: 'from-amber-500 to-yellow-500',
      path: '/mood'
    },
    {
      id: 'needs',
      name: 'Need Nodule',
      description: 'Monitor and manage your personal needs',
      icon: Heart,
      gradient: 'from-pink-500 to-rose-500',
      path: '/needs'
    },
    {
      id: 'timer',
      name: 'Go-Timer',
      description: 'Easily transition between events',
      icon: Timer,
      gradient: 'from-cyan-500 to-teal-500',
      path: '/timer'
    },
    {
      id: 'skills',
      name: 'Scorecard',
      description: 'Track and level up your professional skills',
      icon: Trophy,
      gradient: 'from-blue-500 to-indigo-500',
      path: '/skills'
    },
    {
      id: 'doubll',
      name: 'Doubll',
      description: 'Find a body double near you or online',
      icon: Users,
      gradient: 'from-violet-500 to-fuchsia-500',
      path: '/doubll'
    },
    {
      id: 'symptoms',
      name: 'Symptom Support',
      description: 'Ways to cope with chronic challenges',
      icon: Stethoscope,
      gradient: 'from-purple-500 to-violet-500',
      path: '/symptoms'
    }
  ];

  const profileMenuItem: MenuItem | null = accountType === 'client' 
    ? {
        id: 'matching',
        name: 'Create Doubll Profile',
        description: 'Set up your profile to find matches',
        icon: UserSearch,
        gradient: 'from-violet-500 to-fuchsia-500',
        path: '/create-doubll-profile'
      }
    : accountType === 'doubll'
    ? {
        id: 'matching',
        name: 'Create Client Profile',
        description: 'Set up your profile to find matches',
        icon: UserSearch,
        gradient: 'from-violet-500 to-fuchsia-500',
        path: '/create-client-profile'
      }
    : null;

  const menuItems: MenuItem[] = profileMenuItem 
    ? [...baseMenuItems, profileMenuItem]
    : baseMenuItems;

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4">
      {/* Header */}
      <div className="relative z-10 flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <UserProfileButton />
          <ClockInButton />
          {accountType === 'client' ? (
            <>
              <button
                onClick={() => navigate('/create-doubll-profile')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300"
              >
                <Search className="w-4 h-4" />
                <span>Create Client Profile</span>
              </button>
              <button
                onClick={() => navigate('/view-matches')}
                className="flex items-center gap-2 px-4 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg transition-all duration-300"
              >
                <UserSearch className="w-4 h-4" />
                <span>Find a Doubll</span>
              </button>
              <button
                onClick={() => navigate('/match-requests')}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-all duration-300"
              >
                <Users className="w-4 h-4" />
                <span>View Matches</span>
              </button>
              <button
                onClick={() => navigate('/direct-messages')}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct Messages</span>
              </button>
            </>
          ) : accountType === 'doubll' && (
            <>
              <button
                onClick={() => navigate('/create-client-profile')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300"
              >
                <Search className="w-4 h-4" />
                <span>Create Doubll Profile</span>
              </button>
              <button
                onClick={() => navigate('/view-matches')}
                className="flex items-center gap-2 px-4 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg transition-all duration-300"
              >
                <UserSearch className="w-4 h-4" />
                <span>Find a Client</span>
              </button>
              {accountType === 'doubll' ? (
                <>
                  <button
                    onClick={() => navigate('/match-requests')}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 text-violet-200 rounded-lg hover:bg-violet-500/30 transition-colors"
                  >
                    <Users size={20} />
                    View Matches
                  </button>
                  <button
                    onClick={() => navigate('/direct-messages')}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 text-violet-200 rounded-lg hover:bg-violet-500/30 transition-colors"
                  >
                    <MessageCircle size={20} />
                    Direct Messages
                  </button>
                </>
              ) : accountType === 'client' ? (
                <>
                  <button
                    onClick={() => navigate('/match-requests')}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 text-violet-200 rounded-lg hover:bg-violet-500/30 transition-colors"
                  >
                    <Users size={20} />
                    View Matches
                  </button>
                  <button
                    onClick={() => navigate('/direct-messages')}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 text-violet-200 rounded-lg hover:bg-violet-500/30 transition-colors"
                  >
                    <MessageCircle size={20} />
                    Direct Messages
                  </button>
                </>
              ) : null}
            </>
          )}
        </div>
        
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-300"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto space-y-16 relative">
        <div className="text-center space-y-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt" />
            
            <div className="relative space-y-4">
              <h1 className="text-4xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2 tracking-tight leading-none">
                ND Tools
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-gray-600 italic">
                Push your own buttons for a change
              </p>
            </div>
          </div>
          
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item: MenuItem) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="group relative bg-white p-8 rounded-2xl shadow-lg transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity duration-500`} />
              <div className="absolute inset-0 border border-gray-100 rounded-2xl group-hover:border-gray-200 transition-colors duration-500" />
              
              <div className="relative flex items-center gap-8">
                <div className={`p-5 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:shadow-${item.gradient.split('-')[1]}-500/25 transition-all duration-500`}>
                  {React.createElement(item.icon, { className: "w-10 h-10 text-white", strokeWidth: 1.5 })}
                </div>
                <div className="flex-grow text-left">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-500">
                    {item.name}
                  </h2>
                  <p className="text-lg text-gray-500 group-hover:text-gray-600 transition-colors duration-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}