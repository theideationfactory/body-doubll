import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Users, Calendar } from 'lucide-react';
import { NavigationStrip } from '../components/NavigationStrip';
import type { CompleteMoodEntry } from '../types/mood';

export function MoodLog() {
  const navigate = useNavigate();
  const records: CompleteMoodEntry[] = JSON.parse(localStorage.getItem('moodRecords') || '[]').reverse();

  const renderMoodSection = (role: 'client' | 'doubll', data: CompleteMoodEntry[typeof role]) => {
    if (!data) return null;

    return (
      <div className="bg-black/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          {role === 'client' ? (
            <User className="w-5 h-5 text-amber-400" />
          ) : (
            <Users className="w-5 h-5 text-yellow-400" />
          )}
          <h3 className={`font-medium ${role === 'client' ? 'text-amber-400' : 'text-yellow-400'}`}>
            {role === 'client' ? 'Client' : 'Doubll'}
          </h3>
        </div>
        <div className="space-y-3">
          {data.primaryMood && (
            <div>
              <p className="text-sm text-white/60">Primary Mood</p>
              <p className="text-lg font-medium text-white">{data.primaryMood}</p>
            </div>
          )}
          {data.specificMood && (
            <div>
              <p className="text-sm text-white/60">Specific Mood</p>
              <p className="text-lg font-medium text-white">{data.specificMood}</p>
            </div>
          )}
          {data.emotions && data.emotions.length > 0 && (
            <div>
              <p className="text-sm text-white/60">Emotions</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.emotions.map((emotion, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 text-sm ${
                      role === 'client'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    } rounded`}
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-yellow-900 p-8 pt-24">
      <NavigationStrip />
      
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/mood')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Mood Tracker</span>
        </button>

        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 mb-8">
          Mood Log History
        </h1>

        <div className="space-y-6">
          {records.map((record, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center gap-2 text-amber-300 mb-4">
                <Calendar size={20} />
                <span>{record.date}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderMoodSection('client', record.client)}
                {renderMoodSection('doubll', record.doubll)}
              </div>
            </div>
          ))}

          {records.length === 0 && (
            <div className="text-center py-12 text-white/60">
              No mood records yet. Start tracking moods to see them here!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}