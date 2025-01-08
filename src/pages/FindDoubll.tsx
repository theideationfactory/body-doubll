import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Sparkles, Heart, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { matchingService } from '../services/matchingService';
import { NavigationStrip } from '../components/NavigationStrip';

export function FindDoubll() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [availability, setAvailability] = useState({
    monday: { morning: false, afternoon: false, evening: false },
    tuesday: { morning: false, afternoon: false, evening: false },
    wednesday: { morning: false, afternoon: false, evening: false },
    thursday: { morning: false, afternoon: false, evening: false },
    friday: { morning: false, afternoon: false, evening: false },
    saturday: { morning: false, afternoon: false, evening: false },
    sunday: { morning: false, afternoon: false, evening: false }
  });

  const skills = [
    'Time Management',
    'Task Initiation',
    'Organization',
    'Focus Support',
    'Emotional Support',
    'Accountability',
    'Motivation',
    'Structure',
    'Routine Building'
  ];

  const qualities = [
    'Patient',
    'Understanding',
    'Consistent',
    'Reliable',
    'Encouraging',
    'Non-judgmental',
    'Flexible',
    'Professional',
    'Experienced'
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const timeSlots = ['morning', 'afternoon', 'evening'];

  const handleSearch = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const criteria = {
        userId: user.uid,
        type: 'client' as const,
        location: {
          city,
          state
        },
        skills: selectedSkills,
        qualities: selectedQualities,
        availability,
        timestamp: new Date()
      };

      await matchingService.saveMatchingCriteria(criteria);
      const matches = await matchingService.findMatches(criteria);
      
      // TODO: Handle displaying matches to the user
      console.log('Found matches:', matches);
      
    } catch (error) {
      console.error('Error searching for matches:', error);
      // TODO: Handle error state
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 p-8 pt-24">
      <NavigationStrip />
      
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/doubll')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Doubll</span>
        </button>

        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Find Your Double</h1>
            <p className="text-xl text-white/60">Connect with someone who can help you stay focused</p>
          </div>

          <div className="space-y-8 bg-white/10 backdrop-blur-xl rounded-2xl p-8">
            {/* Location Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-violet-400" />
                <h2 className="text-xl font-semibold text-white">Location</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    placeholder="Enter state"
                  />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-violet-400" />
                <h2 className="text-xl font-semibold text-white">Skills You Need</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => {
                      setSelectedSkills(prev =>
                        prev.includes(skill)
                          ? prev.filter(s => s !== skill)
                          : [...prev, skill]
                      );
                    }}
                    className={`p-3 rounded-xl text-left transition-all duration-300 ${
                      selectedSkills.includes(skill)
                        ? 'bg-violet-500/30 ring-2 ring-violet-500'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-white">{skill}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Qualities Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-violet-400" />
                <h2 className="text-xl font-semibold text-white">Preferred Qualities</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {qualities.map(quality => (
                  <button
                    key={quality}
                    onClick={() => {
                      setSelectedQualities(prev =>
                        prev.includes(quality)
                          ? prev.filter(q => q !== quality)
                          : [...prev, quality]
                      );
                    }}
                    className={`p-3 rounded-xl text-left transition-all duration-300 ${
                      selectedQualities.includes(quality)
                        ? 'bg-violet-500/30 ring-2 ring-violet-500'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-white">{quality}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-violet-400" />
                <h2 className="text-xl font-semibold text-white">Your Availability</h2>
              </div>
              
              <div className="space-y-4">
                {days.map(day => (
                  <div key={day} className="space-y-2">
                    <h3 className="text-lg font-medium text-white capitalize">{day}</h3>
                    <div className="flex gap-3">
                      {timeSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => {
                            setAvailability(prev => ({
                              ...prev,
                              [day]: {
                                ...prev[day],
                                [slot]: !prev[day][slot]
                              }
                            }));
                          }}
                          className={`flex-1 p-3 rounded-xl text-center transition-all duration-300 ${
                            availability[day][slot]
                              ? 'bg-violet-500/30 ring-2 ring-violet-500'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-white capitalize">{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={handleSearch}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Search size={20} />
                Find Matching Doubles
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}