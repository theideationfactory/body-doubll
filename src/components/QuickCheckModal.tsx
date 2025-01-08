import React from 'react';
import { X } from 'lucide-react';

interface QuickCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (status: string) => void;
}

export function QuickCheckModal({ isOpen, onClose, onSubmit }: QuickCheckModalProps) {
  const options = [
    { label: 'Not Met', value: '0', class: 'bg-red-600 hover:bg-red-700' },
    { label: 'Partially Met', value: '50', class: 'bg-amber-500 hover:bg-amber-600' },
    { label: "I think I'm fine", value: '75', class: 'bg-blue-500 hover:bg-blue-600' },
    { label: "I'm all good here", value: '100', class: 'bg-green-600 hover:bg-green-700' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Quick Check-in</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSubmit(option.value);
                onClose();
              }}
              className={`w-full px-4 py-3 text-sm font-medium text-white rounded-lg transition-colors duration-200 ${option.class}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}