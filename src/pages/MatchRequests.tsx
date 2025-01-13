import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NavigationStrip } from '../components/NavigationStrip';
import { matchRequestService, MatchRequest } from '../services/matchRequestService';
import toast, { Toaster } from 'react-hot-toast';

export function MatchRequests() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pendingRequests, setPendingRequests] = useState<MatchRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<MatchRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      if (!user) return;

      try {
        const [pending, sent] = await Promise.all([
          matchRequestService.getPendingRequests(user.uid),
          matchRequestService.getSentRequests(user.uid)
        ]);

        console.log('Loaded pending requests:', pending);
        console.log('Loaded sent requests:', sent);

        setPendingRequests(pending);
        setSentRequests(sent);
      } catch (error) {
        console.error('Error loading requests:', error);
        toast.error('Failed to load match requests');
      } finally {
        setIsLoading(false);
      }
    };

    loadRequests();
  }, [user]);

  const handleAccept = async (requestId: string) => {
    try {
      await matchRequestService.updateRequestStatus(requestId, 'accepted');
      // Update the request status in the UI instead of removing it
      setPendingRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: 'accepted' } : req
      ));
      toast.success('Match request accepted!');
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error('Failed to accept match request');
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await matchRequestService.updateRequestStatus(requestId, 'rejected');
      setPendingRequests(prev => prev.filter(req => req.id !== requestId));
      toast.success('Match request rejected');
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Failed to reject match request');
    }
  };

  const handleCancel = async (requestId: string) => {
    try {
      await matchRequestService.deleteRequest(requestId);
      setSentRequests(prev => prev.filter(req => req.id !== requestId));
      toast.success('Match request cancelled');
    } catch (error) {
      console.error('Error cancelling request:', error);
      toast.error('Failed to cancel match request');
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
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Match Requests</h1>
          </div>

          {/* Pending Requests */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Pending Requests</h2>
            {pendingRequests.length === 0 ? (
              <p className="text-white/60">No pending requests</p>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{request.senderName}</h3>
                        <p className="text-white/60">
                          {request.location.city}, {request.location.state}
                        </p>
                        {request.status === 'accepted' && (
                          <div className="mt-2 flex items-center gap-4">
                            <span className="text-green-400 text-sm flex items-center gap-1">
                              <CheckCircle size={16} />
                              Accepted
                            </span>
                            <button
                              onClick={() => navigate(`/chat/${request.id}`)}
                              className="px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-200 rounded-lg transition-colors"
                            >
                              Chat
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {request.status !== 'accepted' && (
                          <>
                            <button
                              onClick={() => request.id && handleAccept(request.id)}
                              className="p-2 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                            >
                              <CheckCircle size={20} />
                            </button>
                            <button
                              onClick={() => request.id && handleReject(request.id)}
                              className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                            >
                              <XCircle size={20} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white/80 font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {request.skills.map((skill) => (
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
                          {request.qualities.map((quality) => (
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

          {/* Sent Requests */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Sent Requests</h2>
            {sentRequests.length === 0 ? (
              <p className="text-white/60">No sent requests</p>
            ) : (
              <div className="space-y-4">
                {sentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{request.recipientName}</h3>
                        <p className="text-white/60">
                          {request.location.city}, {request.location.state}
                        </p>
                      </div>
                      <button
                        onClick={() => request.id && handleCancel(request.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Cancel Request
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white/80 font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {request.skills.map((skill) => (
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
                          {request.qualities.map((quality) => (
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
                    {request.status === 'accepted' && (
                      <button
                        onClick={() => navigate(`/chat/${request.id}`)}
                        className="px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-200 rounded-lg transition-colors"
                      >
                        Chat
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
