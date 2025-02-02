import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Sparkles, Heart, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { matchingService } from '../services/matchingService';
import { NavigationStrip } from '../components/NavigationStrip';
import toast, { Toaster } from 'react-hot-toast';

// Add type definitions
const days = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
] as const;

const timeSlots = ['morning', 'afternoon', 'evening'] as const;

type Day = typeof days[number];
type TimeSlot = typeof timeSlots[number];

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
] as const;

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
] as const;

type Skill = typeof skills[number];
type Quality = typeof qualities[number];

type MatchingCriteria = {
  userId: string;
  type: 'doubll';
  location: {
    city: string;
    state: string;
  };
  skills: Skill[];
  qualities: Quality[];
  availability: Record<Day, Record<TimeSlot, boolean>>;
  timestamp: Date;
};

type Match = {
  id: string;
  username: string;
  userEmail: string;
  location: {
    city: string;
    state: string;
  };
  skills: Skill[];
  qualities: Quality[];
  matchScore: number;
};

export function CreateClientProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [selectedQualities, setSelectedQualities] = useState<Quality[]>([]);
  const [availability, setAvailability] = useState<Record<Day, Record<TimeSlot, boolean>>>({
    monday: { morning: false, afternoon: false, evening: false },
    tuesday: { morning: false, afternoon: false, evening: false },
    wednesday: { morning: false, afternoon: false, evening: false },
    thursday: { morning: false, afternoon: false, evening: false },
    friday: { morning: false, afternoon: false, evening: false },
    saturday: { morning: false, afternoon: false, evening: false },
    sunday: { morning: false, afternoon: false, evening: false }
  });

  const handleSearch = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const criteria: MatchingCriteria = {
        userId: user.uid,
        type: 'doubll',
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
      toast.success('Profile updated successfully!');
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update profile. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 p-8 pt-24">
      <Toaster position="top-center" />
      <NavigationStrip />
      
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Create Your Profile</h1>
            <p className="text-xl text-white/60">Connect with someone who needs your support</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                    placeholder="Enter your state"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      if (selectedSkills.includes(skill)) {
                        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
                      } else {
                        setSelectedSkills([...selectedSkills, skill]);
                      }
                    }}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-violet-500 border-violet-400 text-white'
                        : 'border-white/20 text-white/60 hover:border-white/40'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Qualities</h2>
              <div className="flex flex-wrap gap-2">
                {qualities.map((quality) => (
                  <button
                    key={quality}
                    onClick={() => {
                      if (selectedQualities.includes(quality)) {
                        setSelectedQualities(selectedQualities.filter((q) => q !== quality));
                      } else {
                        setSelectedQualities([...selectedQualities, quality]);
                      }
                    }}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      selectedQualities.includes(quality)
                        ? 'bg-fuchsia-500 border-fuchsia-400 text-white'
                        : 'border-white/20 text-white/60 hover:border-white/40'
                    }`}
                  >
                    {quality}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Availability</h2>
              <div className="space-y-6">
                {days.map((day) => (
                  <div key={day} className="space-y-2">
                    <h3 className="text-lg font-medium text-white capitalize">{day}</h3>
                    <div className="flex gap-4">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => {
                            setAvailability({
                              ...availability,
                              [day]: {
                                ...availability[day],
                                [slot]: !availability[day][slot]
                              }
                            });
                          }}
                          className={`px-4 py-2 rounded-lg border transition-colors capitalize ${
                            availability[day][slot]
                              ? 'bg-pink-500 border-pink-400 text-white'
                              : 'border-white/20 text-white/60 hover:border-white/40'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={handleSearch}
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed mt-8 flex items-center gap-2"
              >
                {isSubmitting ? (
                  'Updating...'
                ) : (
                  <>
                    Add to Profile
                  </>
                )}
              </button>

              <button 
                onClick={() => navigate('/view-matches')}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mt-2"
              >
                <span>View Matching Clients →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}