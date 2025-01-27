import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, RefreshCw } from 'lucide-react';

interface Scores {
  amarie: number;
  adam: number;
}

interface CompetitiveScoreboardProps {
  title: string;
}

export function CompetitiveScoreboard({ title }: CompetitiveScoreboardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [scores, setScores] = useState<Scores>(() => {
    const saved = localStorage.getItem('competitiveScores');
    return saved ? JSON.parse(saved) : { amarie: 0, adam: 0 };
  });

  useEffect(() => {
    localStorage.setItem('competitiveScores', JSON.stringify(scores));
  }, [scores]);

  const handleScore = (player: keyof Scores) => {
    setScores(prev => ({
      ...prev,
      [player]: prev[player] + 1
    }));
  };

  const handleReset = () => {
    setScores({ amarie: 0, adam: 0 });
  };

  const getScoreColor = (player: keyof Scores) => {
    if (scores.amarie === scores.adam) return 'text-blue-400';
    if (player === 'amarie') {
      return scores.amarie > scores.adam ? 'text-green-400' : 'text-red-400';
    }
    return scores.adam > scores.amarie ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 tracking-tight leading-none">
          Focus Scorecard
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 hover:text-violet-300 rounded-lg transition-colors ring-1 ring-violet-500/50"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <div className={`transition-all duration-500 ease-in-out ${
        isExpanded 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform -translate-y-10 pointer-events-none absolute'
      }`}>
        {/* Score Display */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            {/* Amarie's Score */}
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative px-6 py-4 bg-black/50 ring-1 ring-white/20 rounded-lg leading-none flex items-center justify-between sm:justify-start w-full">
                <div className="space-y-1">
                  <p className="text-slate-300 text-sm">Doubll</p>
                  <div className="flex items-center">
                    <span className={`text-3xl font-bold ${getScoreColor('amarie')}`}>
                      {scores.amarie}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Adam's Score */}
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative px-6 py-4 bg-black/50 ring-1 ring-white/20 rounded-lg leading-none flex items-center justify-between sm:justify-start w-full">
                <div className="space-y-1">
                  <p className="text-slate-300 text-sm">Adam</p>
                  <div className="flex items-center">
                    <span className={`text-3xl font-bold ${getScoreColor('adam')}`}>
                      {scores.adam}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-colors ring-1 ring-red-500/50"
          >
            <RefreshCw size={16} />
            Reset
          </button>
        </div>

        {/* Score Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Amarie's Button */}
          <button
            onClick={() => handleScore('amarie')}
            className="group relative bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 p-6 sm:p-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-violet-500/25"
          >
            <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-2xl sm:text-4xl font-bold text-white">Doubll</span>
          </button>

          {/* Adam's Button */}
          <button
            onClick={() => handleScore('adam')}
            className="group relative bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 p-6 sm:p-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
          >
            <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-2xl sm:text-4xl font-bold text-white">Adam</span>
          </button>
        </div>
      </div>
    </div>
  );
}