import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { matchingService } from '../services/matchingService';
import { matchRequestService } from '../services/matchRequestService';
import { NavigationStrip } from '../components/NavigationStrip';
import { toast } from 'react-hot-toast';

type Match = {
  id: string;
  userId: string;
  username: string;
  userEmail: string;
  location: {
    city: string;
    state: string;
  };
  skills: string[];
  qualities: string[];
  matchScore: number;
};

export function ViewMatches() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);
  const [accountType, setAccountType] = useState<'client' | 'doubll' | null>(null);
  const [requestedUsers, setRequestedUsers] = useState<string[]>([]);

  useEffect(() => {
    const loadMatches = async () => {
      if (!user) return;

      try {
        // Get the user's existing profile
        const userProfile = await matchingService.getUserProfile(user.uid);
        if (!userProfile) {
          // If no profile exists, redirect to profile creation
          navigate(accountType === 'client' ? '/create-doubll-profile' : '/create-client-profile');
          return;
        }

        // Load existing sent requests to disable buttons
        const sentRequests = await matchRequestService.getSentRequests(user.uid);
        setRequestedUsers(sentRequests.map(req => req.recipientId));

        // Use the existing profile to find matches
        const foundMatches = await matchingService.findMatches(userProfile);
        // Sort by match score and take top 5
        const topMatches = foundMatches
          .sort((a, b) => b.matchScore - a.matchScore)
          .slice(0, 5);
        setMatches(topMatches);
      } catch (error) {
        console.error('Error loading matches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMatches();
  }, [user, navigate, accountType]);

  const handleSendRequest = async (match: Match) => {
    if (!user) return;

    try {
      const requestData = {
        senderId: user.uid,
        senderName: user.displayName || 'Anonymous',
        senderType: accountType || 'client',
        recipientId: match.userId,
        recipientName: match.username,
        location: match.location,
        skills: match.skills,
        qualities: match.qualities
      };
      console.log('Sending match request:', requestData);
      await matchRequestService.sendMatchRequest(requestData);

      setRequestedUsers(prev => [...prev, match.userId]);
      toast.success('Match request sent!');
    } catch (error) {
      console.error('Error sending match request:', error);
      toast.error('Failed to send match request');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 p-8 pt-24">
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
            <h1 className="text-4xl font-bold text-white">
              {accountType === 'client' ? 'Top Matching Doublls' : 'Top Matching Clients'}
            </h1>
            <p className="text-xl text-white/60">
              Here are your best matches based on location, skills, and availability
            </p>
          </div>

          {matches.length === 0 ? (
            <div className="text-center text-white/80 py-8">
              No matches found. Try adjusting your profile preferences.
            </div>
          ) : (
            <div className="space-y-4">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 space-y-4 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{match.username}</h3>
                      <p className="text-white/60">
                        {match.location.city}, {match.location.state}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 px-3 py-1 rounded-full">
                        <span className="text-white/90">
                          {Math.round(match.matchScore)}% Match
                        </span>
                      </div>
                      <button
                        onClick={() => handleSendRequest(match)}
                        disabled={requestedUsers.includes(match.userId)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          requestedUsers.includes(match.userId)
                            ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                        }`}
                      >
                        {requestedUsers.includes(match.userId) ? 'Request Sent' : 'Send Request'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white/80 font-medium mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {match.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-violet-500/20 text-violet-200 px-2 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white/80 font-medium mb-2">Qualities</h4>
                      <div className="flex flex-wrap gap-2">
                        {match.qualities.map((quality) => (
                          <span
                            key={quality}
                            className="bg-fuchsia-500/20 text-fuchsia-200 px-2 py-1 rounded-full text-sm"
                          >
                            {quality}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
