import React, { useState } from 'react';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Timer } from '../../types/timer';
import { parseTimeString, calculateDuration } from '../../utils/timeUtils';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (timers: Timer[]) => void;
}

export function AddEventModal({ isOpen, onClose, onAdd }: AddEventModalProps) {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const timers: Timer[] = [];

    if (startTime) {
      const startMs = parseTimeString(startTime);
      const currentMs = (now.getHours() * 3600000) + (now.getMinutes() * 60000);
      const startDuration = startMs - currentMs;

      if (startDuration > 0) {
        timers.push({
          id: uuidv4(),
          name: `${name} - Start`,
          duration: startDuration,
          minimized: false
        });
      }
    }

    if (endTime) {
      const endMs = parseTimeString(endTime);
      const duration = calculateDuration(startTime ? parseTimeString(startTime) : undefined, endMs);

      if (duration > 0) {
        timers.push({
          id: uuidv4(),
          name: `${name} - End`,
          duration,
          minimized: false
        });
      }
    }

    if (timers.length > 0) {
      onAdd(timers);
      setName('');
      setStartTime('');
      setEndTime('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Create Event Timer</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter event name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-lg"
            >
              Create Timer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}