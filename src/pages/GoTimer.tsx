import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar, Shield, CalendarClock } from 'lucide-react';
import { TimerList } from '../components/timer/TimerList';
import { AddTimerModal } from '../components/timer/AddTimerModal';
import { AddEventModal } from '../components/timer/AddEventModal';
import { GoogleCalendarButton } from '../components/calendar/GoogleCalendarButton';
import { useTimers } from '../context/TimerContext';
import { NavigationStrip } from '../components/NavigationStrip';

export function GoTimer() {
  const navigate = useNavigate();
  const { timers, addTimer, addTimers, removeTimer, toggleMinimize } = useTimers();
  const [showAddTimer, setShowAddTimer] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900 p-4 sm:p-8 pt-24">
      <NavigationStrip />
      <div style={{ display: 'none' }}>google-site-verification: google1a3ed8722adc952b.html</div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-cyan-300/20 to-teal-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-teal-300/20 to-emerald-300/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <button
              onClick={() => navigate('/privacy')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <Shield size={20} />
              <span>Privacy</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setShowAddTimer(true)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus size={20} />
            <span className="font-medium">Add Timer</span>
          </button>
          
          <button
            onClick={() => setShowAddEvent(true)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Calendar size={20} />
            <span className="font-medium">Create Event Timer</span>
          </button>
          
          <button
            onClick={() => {}} // Google Calendar sync functionality
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <CalendarClock size={20} />
            <span className="font-medium">Sync Calendar</span>
          </button>
        </div>

        {/* Timer List */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl -m-6" />
          <div className="relative p-4 sm:p-6">
            <TimerList 
              timers={timers}
              onDelete={removeTimer}
              onToggleMinimize={toggleMinimize}
            />
          </div>
        </div>

        <AddTimerModal
          isOpen={showAddTimer}
          onClose={() => setShowAddTimer(false)}
          onAdd={addTimer}
        />

        <AddEventModal
          isOpen={showAddEvent}
          onClose={() => setShowAddEvent(false)}
          onAdd={addTimers}
        />
      </div>
    </div>
  );
}