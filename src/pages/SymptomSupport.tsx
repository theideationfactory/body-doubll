import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, RefreshCw } from 'lucide-react';
import { NavigationStrip } from '../components/NavigationStrip';
import { SymptomButton } from '../components/symptoms/SymptomButton';
import { AddSymptomModal } from '../components/symptoms/AddSymptomModal';

interface Symptom {
  name: string;
  icon: string;
}

const DEFAULT_SYMPTOMS: Symptom[] = [
  { name: 'Thirst', icon: 'Droplet' },
  { name: 'Anxiety', icon: 'Brain' }
];

export function SymptomSupport() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [symptoms, setSymptoms] = useState<Symptom[]>(() => {
    // Clear existing symptoms data to ensure defaults are shown
    localStorage.removeItem('symptoms');
    return DEFAULT_SYMPTOMS;
  });

  useEffect(() => {
    localStorage.setItem('symptoms', JSON.stringify(symptoms));
  }, [symptoms]);

  const handleAddSymptom = (symptom: Symptom) => {
    setSymptoms(prev => [...prev, symptom]);
  };

  const handleReset = () => {
    setSymptoms(DEFAULT_SYMPTOMS);
    localStorage.setItem('symptoms', JSON.stringify(DEFAULT_SYMPTOMS));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 p-4 sm:p-8 pt-24">
      <NavigationStrip />
      
      <div className="max-w-6xl mx-auto">
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
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-colors ring-1 ring-red-500/50"
            >
              <RefreshCw size={16} />
              Reset Symptoms
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">
                Symptom Support
              </h1>
              <p className="mt-2 text-xl text-white/80">
                Track and manage your symptoms
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="group relative px-6 py-4 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-400 hover:to-violet-400 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-white">Add New Symptom</span>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {symptoms.map((symptom, index) => (
              <SymptomButton
                key={`${symptom.name}-${index}`}
                name={symptom.name}
                icon={symptom.icon}
                onClick={() => {
                  console.log('Clicked:', symptom.name);
                }}
              />
            ))}
          </div>
        </div>

        <AddSymptomModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddSymptom}
        />
      </div>
    </div>
  );
}