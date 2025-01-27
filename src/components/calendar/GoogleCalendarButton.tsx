import React, { useState, useEffect } from 'react';
import { CalendarClock } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { Timer } from '../../types/timer';
import { v4 as uuidv4 } from 'uuid';

interface GoogleCalendarButtonProps {
  onAddTimers: (timers: Timer[]) => void;
}

export function GoogleCalendarButton({ onAddTimers }: GoogleCalendarButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const login = useGoogleLogin({
    flow: 'implicit',
    ux_mode: 'redirect',
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    onSuccess: async (response) => {
      setIsLoading(true);
      
      try {
        // Get current time
        const now = new Date();
        
        // Get today at midnight
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);

        // Format dates for the API
        const timeMin = now.toISOString();
        const timeMax = midnight.toISOString();

        const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&orderBy=startTime&singleEvents=true`;
        
        const result = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        
        if (!result.ok) {
          throw new Error(`Calendar API error: ${result.status} ${result.statusText}`);
        }

        const data = await result.json();
        
        if (!data.items?.length) {
          return;
        }

        // Convert events to timers
        const timers: Timer[] = data.items
          .filter((event: any) => !!(event.start?.dateTime && event.end?.dateTime))
          .map((event: any) => {
            const startTime = new Date(event.start.dateTime);
            const endTime = new Date(event.end.dateTime);
            const now = new Date();
            
            // If event has already started but hasn't ended
            if (startTime <= now && endTime > now) {
              // Calculate remaining duration
              const remainingDuration = endTime.getTime() - now.getTime();
              
              return [{
                id: uuidv4(),
                name: `${event.summary}`,
                duration: remainingDuration,
                minimized: false,
                category: 'calendar-event',
                color: event.colorId ? `calendar-color-${event.colorId}` : undefined
              }];
            }
            
            // If event hasn't started yet
            if (startTime > now) {
              const timeUntilStart = startTime.getTime() - now.getTime();
              
              return [{
                id: uuidv4(),
                name: `${event.summary}starts in`,
                duration: timeUntilStart,
                minimized: false,
                category: 'calendar-countdown'
              }];
            }
            
            // Skip events that have already ended
            return [];
          })
          .flat();

        if (timers.length > 0) {
          onAddTimers(timers);
        }
      } catch (error) {
        console.error('Error syncing calendar:', error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error('OAuth Error:', error);
    }
  });

  // Handle the redirect back from Google OAuth
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get('access_token');
    
    if (accessToken) {
      login();
    }
  }, []);

  return (
    <button
      onClick={() => login()}
      disabled={isLoading}
      className={`flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <CalendarClock size={20} />
      {isLoading ? 'Syncing...' : 'Sync Calendar'}
    </button>
  );
}