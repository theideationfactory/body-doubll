import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Smile as SmileIcon, CheckCircle, Stethoscope, Zap, RefreshCw, ChevronUp, ChevronDown, LayoutGrid, MoveHorizontal } from 'lucide-react';
import { CheckInModal } from './CheckInModal';
import { QuickCheckModal } from './QuickCheckModal';
import { NeedCardStack } from './needs/NeedCardStack';
import { SwipeView } from './needs/SwipeView';
import { Need } from '../types/needs';
import { defaultNeeds } from '../data/needs';

export function NeedsDashboard() {
  const navigate = useNavigate();
  const [needs, setNeeds] = useState<Need[]>(() => {
    const saved = localStorage.getItem('needs');
    return saved ? JSON.parse(saved) : defaultNeeds;
  });
  const [checkInNeedId, setCheckInNeedId] = useState<string | null>(null);
  const [quickCheckNeedId, setQuickCheckNeedId] = useState<string | null>(null);
  const [expandedNeedId, setExpandedNeedId] = useState<string | null>(null);
  const [showCardView, setShowCardView] = useState(false);
  const [showSwipeView, setShowSwipeView] = useState(false);

  useEffect(() => {
    localStorage.setItem('needs', JSON.stringify(needs));
  }, [needs]);

  const handleCheckIn = (id: string, selectedNeeds: string[]) => {
    setNeeds(prev => prev.map(need => 
      need.id === id ? {
        ...need,
        lastCheckIn: new Date().toISOString(),
        selectedNeeds
      } : need
    ));
    setCheckInNeedId(null);
  };

  const handleQuickCheck = (id: string, status: string) => {
    setNeeds(prev => prev.map(need =>
      need.id === id ? {
        ...need,
        quickStatus: {
          value: status,
          timestamp: new Date().toISOString()
        }
      } : need
    ));
    setQuickCheckNeedId(null);
  };

  return (
    <div className="max-w-lg mx-auto lg:max-w-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 tracking-tight leading-none">
          Need Nodule
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSwipeView(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300 rounded-lg transition-colors ring-1 ring-emerald-500/50"
          >
            <MoveHorizontal size={16} />
            Swipe Views
          </button>
          <button
            onClick={() => setShowCardView(!showCardView)}
            className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 hover:text-violet-300 rounded-lg transition-colors ring-1 ring-violet-500/50"
          >
            <LayoutGrid size={16} />
            {showCardView ? 'List View' : 'Card View'}
          </button>
        </div>
      </div>

      {/* Need Cards */}
      <div className="space-y-6">
        {needs.map(need => (
          <div key={need.id} className="space-y-4">
            <div
              className={`relative group bg-white/10 backdrop-blur-xl rounded-xl transition-all duration-300 ${
                expandedNeedId === need.id ? 'ring-2 ring-pink-500' : 'hover:bg-white/20'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{need.emoji}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{need.name}</h3>
                      {need.quickStatus && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-sm ${
                            parseInt(need.quickStatus.value) === 100 
                              ? 'text-green-400' 
                              : 'text-amber-400'
                          }`}>
                            {need.quickStatus.value}% Met
                          </span>
                          <span className="text-xs text-white/40">
                            {new Date(need.quickStatus.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuickCheckNeedId(need.id)}
                      className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                    >
                      <Zap size={20} />
                    </button>
                    <button
                      onClick={() => setCheckInNeedId(need.id)}
                      className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                    >
                      <Stethoscope size={20} />
                    </button>
                    <button
                      onClick={() => setExpandedNeedId(
                        expandedNeedId === need.id ? null : need.id
                      )}
                      className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                    >
                      {expandedNeedId === need.id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {expandedNeedId === need.id && (
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white/60">Check-in Options:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {need.checkInOptions.map((option, index) => (
                          <div
                            key={index}
                            className="p-3 bg-white/5 rounded-lg text-white/80"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>

                    {need.selectedNeeds && need.selectedNeeds.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-white/60">Last Check-in:</h4>
                        <div className="flex flex-wrap gap-2">
                          {need.selectedNeeds.map((selected, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm"
                            >
                              {selected}
                            </span>
                          ))}
                        </div>
                        <span className="block text-xs text-white/40">
                          {new Date(need.lastCheckIn!).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Card Stack View */}
      {showCardView && (
        <NeedCardStack
          needs={needs}
          onClose={() => setShowCardView(false)}
          onQuickCheck={(id) => {
            setShowCardView(false);
            setQuickCheckNeedId(id);
          }}
          onDiagnose={(id) => {
            setShowCardView(false);
            setCheckInNeedId(id);
          }}
        />
      )}

      {/* Swipe View */}
      {showSwipeView && (
        <SwipeView
          needs={needs}
          onClose={() => setShowSwipeView(false)}
        />
      )}

      {/* Modals */}
      <CheckInModal
        isOpen={checkInNeedId !== null}
        onClose={() => setCheckInNeedId(null)}
        onSubmit={(selectedNeeds) => {
          if (checkInNeedId) {
            handleCheckIn(checkInNeedId, selectedNeeds);
          }
        }}
        options={needs.find(need => need.id === checkInNeedId)?.checkInOptions}
      />

      <QuickCheckModal
        isOpen={quickCheckNeedId !== null}
        onClose={() => setQuickCheckNeedId(null)}
        onSubmit={(status) => {
          if (quickCheckNeedId) {
            handleQuickCheck(quickCheckNeedId, status);
          }
        }}
      />
    </div>
  );
}