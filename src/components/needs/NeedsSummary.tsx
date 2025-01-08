import React from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Need } from '../../types/needs';

interface NeedsSummaryProps {
  needs: Need[];
  registeredNeeds: string[];
  registeredSubneeds: Array<{ needId: string; subneed: string }>;
  onClose: () => void;
}

export function NeedsSummary({ needs, registeredNeeds, registeredSubneeds, onClose }: NeedsSummaryProps) {
  const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const groupedSubneeds = registeredSubneeds.reduce((acc, { needId, subneed }) => {
    if (!acc[needId]) {
      acc[needId] = [];
    }
    acc[needId].push(subneed);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="absolute inset-0 overflow-y-auto"
    >
      <div className="bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-violet-500/30">
        <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <PartyPopper className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 text-center">
          {registeredNeeds.length > 0 
            ? "Here's what needs attention!"
            : "No immediate needs identified"}
        </h3>
        <p className="text-center text-white/60 mb-8">
          Check off items as you address them
        </p>

        {registeredNeeds.length > 0 && (
          <div className="mt-8 space-y-6">
            {registeredNeeds.map(needId => {
              const need = needs.find(n => n.id === needId);
              if (!need) return null;

              return (
                <div key={needId} className="bg-white/5 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <button
                      onClick={() => toggleCheck(needId)}
                      className={`p-2 rounded-lg transition-colors ${
                        checkedItems[needId]
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                    >
                      <CheckCircle2 
                        className={`w-6 h-6 ${
                          checkedItems[needId] ? 'fill-emerald-500/20' : ''
                        }`}
                      />
                    </button>
                    <span className="text-4xl">{need.emoji}</span>
                    <h3 className={`text-xl font-bold transition-colors ${
                      checkedItems[needId] ? 'text-emerald-400' : 'text-white'
                    }`}>
                      {need.name}
                    </h3>
                  </div>

                  {groupedSubneeds[needId] && groupedSubneeds[needId].length > 0 && (
                    <div className="space-y-2 ml-14">
                      <h4 className="text-sm font-medium text-white/60">Specific Actions:</h4>
                      <div className="space-y-2">
                        {groupedSubneeds[needId].map((subneed, index) => {
                          const subneedId = `${needId}-${index}`;
                          return (
                            <div
                              key={subneedId}
                              className="flex items-center gap-3"
                            >
                              <button
                                onClick={() => toggleCheck(subneedId)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  checkedItems[subneedId]
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                                }`}
                              >
                                <CheckCircle2 
                                  className={`w-5 h-5 ${
                                    checkedItems[subneedId] ? 'fill-emerald-500/20' : ''
                                  }`}
                                />
                              </button>
                              <span className={`text-sm transition-colors ${
                                checkedItems[subneedId] ? 'text-emerald-400' : 'text-white/80'
                              }`}>
                                {subneed}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl text-white shadow-lg hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105 mx-auto"
        >
          <ArrowRight size={20} />
          Close
        </button>
      </div>
    </motion.div>
  );
}