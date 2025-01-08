import React, { useEffect, useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { Timer } from '../../types/timer';
import { v4 as uuidv4 } from 'uuid';
import { calculateDuration } from '../../utils/timeUtils';

interface GoogleCalendarButtonProps {
  onAddTimers: (timers: Timer[]) => void;
}

export function GoogleCalendarButton({ onAddTimers }: GoogleCalendarButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        // We'll implement this function once you provide the credentials
        await syncCalendarEvents(response.access_token);
      } catch (error) {
        console.error('Failed to sync calendar:', error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => console.error('Login Failed:', error)
  });

  const syncCalendarEvents = async (accessToken: string) => {
    // This function will be implemented once you provide the Google Calendar credentials
    // It will:
    // 1. Fetch today's events from Google Calendar
    // 2. Create timers for each event's start and end times
    // 3. Add them to the timer list
  };

  return (
    <button
      onClick={() => login()}
      disabled={isLoading}
      className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
        isLoading ? 'opacity-75 cursor-not-allowed' : ''
      }`}
    >
      <CalendarClock size={20} />
      {isLoading ? 'Syncing...' : 'Sync Calendar'}
    </button>
  );
}