import React from 'react';
import { Clock } from 'lucide-react';

export function ClockInButton() {
  const handleClockIn = () => {
    console.log('Clocked in');
  };

  return (
    <button
      onClick={handleClockIn}
      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300"
    >
      <Clock className="w-4 h-4" />
      <span>Clock In</span>
    </button>
  );
}