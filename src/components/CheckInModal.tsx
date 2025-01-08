import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedNeeds: string[]) => void;
  options?: string[];
}

export function CheckInModal({ isOpen, onClose, onSubmit, options }: CheckInModalProps) {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  const defaultOptions = [
    'I need to go to the bathroom',
    'I need to stretch',
    'I need to drink water',
    'I need to eat something'
  ];

  const checkInOptions = options || defaultOptions;

  const handleSubmit = () => {
    onSubmit(selectedNeeds);
    setSelectedNeeds([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Diagnose Your Needs</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <p className="text-sm text-gray-600">Select all that apply:</p>
          
          <div className="space-y-2">
            {checkInOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedNeeds.includes(option)}
                  onChange={(e) => {
                    setSelectedNeeds(prev =>
                      e.target.checked
                        ? [...prev, option]
                        : prev.filter(need => need !== option)
                    );
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}