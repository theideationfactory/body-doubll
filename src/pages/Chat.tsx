import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { chatService, Message } from '../services/chatService';
import { matchRequestService } from '../services/matchRequestService'; // Import matchRequestService
import { NavigationStrip } from '../components/NavigationStrip';
import { toast } from 'react-hot-toast';

export function Chat() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [matchDetails, setMatchDetails] = useState<any>(null); // Add matchDetails state
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || !matchId) return;

    // Get match details first
    const fetchMatchDetails = async () => {
      try {
        const matchDoc = await matchRequestService.getRequestById(matchId);
        console.log('Match details:', matchDoc);
        setMatchDetails(matchDoc);
      } catch (error) {
        console.error('Error fetching match details:', error);
        toast.error('Failed to load chat');
      }
    };

    fetchMatchDetails();

    // Subscribe to messages
    const unsubscribe = chatService.getMessages(matchId, (updatedMessages) => {
      console.log('Received messages:', updatedMessages);
      setMessages(updatedMessages);
      // Scroll to bottom when new messages arrive
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => unsubscribe();
  }, [user, matchId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !matchId || !newMessage.trim() || !matchDetails) return;

    try {
      // Determine recipient ID based on whether the current user is sender or recipient
      const recipientId = matchDetails.senderId === user.uid 
        ? matchDetails.recipientId 
        : matchDetails.senderId;

      console.log('Sending message with data:', {
        senderId: user.uid,
        senderName: user.displayName || 'Anonymous',
        recipientId,
        content: newMessage.trim(),
        matchId
      });

      await chatService.sendMessage({
        senderId: user.uid,
        senderName: user.displayName || 'Anonymous',
        recipientId,
        content: newMessage.trim(),
        matchId
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900">
      <NavigationStrip />
      
      <div className="max-w-4xl mx-auto p-4 pt-24">
        <button
          onClick={() => navigate('/match-requests')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Matches</span>
        </button>

        {/* Chat container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 h-[600px] flex flex-col">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.senderId === user?.uid
                      ? 'bg-blue-500/20 text-blue-100'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  <div className="text-sm opacity-75 mb-1">{message.senderName}</div>
                  <div>{message.content}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || !matchDetails}
              className="bg-violet-500/20 hover:bg-violet-500/30 text-violet-200 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
