import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { chatService } from '../services/chatService';
import { NavigationStrip } from '../components/NavigationStrip';
import { MessageCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useUserType } from '../hooks/useUserType';
import { MatchRequest } from '../services/matchRequestService';

interface ChatThread {
  matchId: string;
  otherUserName: string;
  otherUserType: string;
  lastMessage?: {
    content: string;
    createdAt: Date;
  };
}

export const DirectMessages = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userType } = useUserType();
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChatThreads = async () => {
      if (!user) return;
      
      try {
        // Get matches for both sent and received requests
        const matchedUsers = await chatService.getMatchedUsers(user.uid);
        
        // Transform matches into chat threads
        const threads = (matchedUsers as MatchRequest[])
          .filter((match): match is MatchRequest & { id: string } => match.id !== undefined)
          .map(match => ({
            matchId: match.id,
            otherUserName: match.senderId === user.uid ? match.recipientName : match.senderName,
            otherUserType: match.senderId === user.uid ? 'client' : match.senderType
          }));

        setChatThreads(threads);
      } catch (error) {
        console.error('Error loading chat threads:', error);
        toast.error('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    loadChatThreads();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900">
      <NavigationStrip />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Direct Messages</h1>
        
        {loading ? (
          <div className="text-white">Loading messages...</div>
        ) : chatThreads.length === 0 ? (
          <div className="text-white/60">
            {userType === 'doubll' 
              ? "No messages yet. Match with a client to start chatting!"
              : "No messages yet. Match with a doubll to start chatting!"}
          </div>
        ) : (
          <div className="space-y-4">
            {chatThreads.map((thread) => (
              <div
                key={thread.matchId}
                onClick={() => navigate(`/chat/${thread.matchId}`)}
                className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-violet-400" size={24} />
                  <div>
                    <h3 className="text-white font-semibold">{thread.otherUserName}</h3>
                    {thread.lastMessage && (
                      <p className="text-white/60 text-sm">
                        {thread.lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
