import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoveHorizontal, LayoutGrid, RefreshCw } from 'lucide-react';
import { NavigationStrip } from '../components/NavigationStrip';
import { BagSwipeView } from '../components/bag/BagSwipeView';
import { defaultBags } from '../types/bag';

export function BagChecklist() {
  const navigate = useNavigate();
  const [showSwipeView, setShowSwipeView] = useState(false);
  const [bags, setBags] = useState(() => {
    const saved = localStorage.getItem('bags');
    return saved ? JSON.parse(saved) : defaultBags;
  });

  const handleReset = () => {
    setBags(defaultBags);
    localStorage.setItem('bags', JSON.stringify(defaultBags));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-4 sm:p-8 pt-24">
      <NavigationStrip />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSwipeView(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300 rounded-lg transition-colors ring-1 ring-emerald-500/50"
            >
              <MoveHorizontal size={16} />
              Swipe View
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-colors ring-1 ring-red-500/50"
            >
              <RefreshCw size={16} />
              Reset Lists
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 tracking-tight leading-none">
            Bag Checklist
          </h2>

          {/* Bag Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bags.map(bag => (
              <div
                key={bag.id}
                className="group relative bg-white/10 backdrop-blur-xl p-6 rounded-2xl transition-all duration-300 hover:bg-white/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${bag.gradient} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/20 transition-colors duration-500" />
                
                <div className="relative space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{bag.icon}</span>
                    <h3 className="text-xl font-bold text-white">{bag.name}</h3>
                  </div>

                  <div className="space-y-2">
                    {bag.sections ? (
                      bag.sections.map(section => (
                        <div key={section.id} className="space-y-1">
                          <h4 className="text-sm font-medium text-white/60">{section.name}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {section.items.map(item => (
                              <div
                                key={item.id}
                                className={`px-3 py-2 rounded-lg text-sm ${
                                  item.checked
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : item.needsAttention
                                      ? 'bg-red-500/20 text-red-300'
                                      : 'bg-white/10 text-white/60'
                                }`}
                              >
                                {item.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : bag.items ? (
                      <div className="grid grid-cols-2 gap-2">
                        {bag.items.map(item => (
                          <div
                            key={item.id}
                            className={`px-3 py-2 rounded-lg text-sm ${
                              item.checked
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : item.needsAttention
                                  ? 'bg-red-500/20 text-red-300'
                                  : 'bg-white/10 text-white/60'
                            }`}
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Swipe View */}
        {showSwipeView && (
          <BagSwipeView
            bags={bags}
            onClose={() => setShowSwipeView(false)}
          />
        )}
      </div>
    </div>
  );
}