import React, { useEffect } from 'react';
import { Trophy } from 'lucide-react';

interface CelebrationProps {
  skillName: string;
  onClose: () => void;
}

export function Celebration({ skillName, onClose }: CelebrationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 shadow-2xl transform animate-celebration">
        <div className="text-center">
          <Trophy className="mx-auto mb-4 text-yellow-500" size={64} strokeWidth={1.5} />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Congratulations!</h2>
          <p className="text-xl text-gray-600">
            You have evolved in
            <span className="font-semibold text-indigo-600 block mt-1">{skillName}</span>
          </p>
        </div>
      </div>
    </div>
  );
}