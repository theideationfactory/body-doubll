import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ClipboardList } from 'lucide-react';
import { NavigationStrip } from '../components/NavigationStrip';
import { MoodStepRenderer } from '../components/mood/MoodStepRenderer';
import { moodService } from '../services/moodService';
import type { MoodSelection, PrimaryMood, SpecificMood, Emotion, CompleteMoodEntry } from '../types/mood';

type Step = 'role' | 'primary' | 'specific' | 'emotions' | 'summary';

export function MoodTracker() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('role');
  const [selection, setSelection] = useState<MoodSelection>({
    selectedEmotions: []
  });
  const [showBackButton, setShowBackButton] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<CompleteMoodEntry | null>(() => {
    const saved = localStorage.getItem('currentMoodRecord');
    return saved ? JSON.parse(saved) : null;
  });

  const determineInitialRole = () => {
    if (!currentRecord) return undefined;
    if (!currentRecord.client) return 'client';
    if (!currentRecord.doubll) return 'doubll';
    return undefined;
  };

  useEffect(() => {
    const initialRole = determineInitialRole();
    if (initialRole) {
      handleRoleSelect(initialRole);
    }
  }, []);

  const handleRoleSelect = (role: 'client' | 'doubll') => {
    setSelection(prev => ({ ...prev, role }));
    setCurrentStep('primary');
    setShowBackButton(true);
  };

  const handlePrimaryMoodSelect = (mood: PrimaryMood) => {
    setSelection(prev => ({ ...prev, primaryMood: mood }));
    setCurrentStep('specific');
  };

  const handleSpecificMoodSelect = (mood: SpecificMood) => {
    setSelection(prev => ({ ...prev, specificMood: mood }));
    setCurrentStep('emotions');
  };

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelection(prev => ({
      ...prev,
      selectedEmotions: prev.selectedEmotions.some(e => e.id === emotion.id)
        ? prev.selectedEmotions.filter(e => e.id !== emotion.id)
        : [...prev.selectedEmotions, emotion]
    }));
  };

  const handleSaveMood = async () => {
    if (!selection.role || !selection.primaryMood || !selection.specificMood) return;

    const newEntry = {
      primaryMood: selection.primaryMood.name,
      specificMood: selection.specificMood.name,
      emotions: selection.selectedEmotions.map(e => e.name)
    };

    let updatedRecord: CompleteMoodEntry = currentRecord || {
      date: new Date().toLocaleString()
    };

    updatedRecord = {
      ...updatedRecord,
      [selection.role]: newEntry
    };

    if (updatedRecord.client && updatedRecord.doubll) {
      try {
        await moodService.saveMoodEntry(updatedRecord);
        localStorage.removeItem('currentMoodRecord');
        navigate('/needs');
      } catch (error) {
        console.error('Error saving mood entry:', error);
      }
    } else {
      localStorage.setItem('currentMoodRecord', JSON.stringify(updatedRecord));
      setCurrentRecord(updatedRecord);
      setSelection({
        role: selection.role === 'client' ? 'doubll' : 'client',
        selectedEmotions: []
      });
      setCurrentStep('primary');
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'specific':
        setCurrentStep('primary');
        setSelection(prev => ({ ...prev, primaryMood: undefined }));
        break;
      case 'emotions':
        setCurrentStep('specific');
        setSelection(prev => ({ ...prev, specificMood: undefined }));
        break;
      case 'summary':
        setCurrentStep('emotions');
        setSelection(prev => ({ ...prev, selectedEmotions: [] }));
        break;
      case 'primary':
        setCurrentStep('role');
        setSelection(prev => ({ ...prev, role: undefined }));
        setShowBackButton(false);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-yellow-900 p-8 pt-24">
      <NavigationStrip />
      
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        {currentRecord && (
          <div className="mb-8 p-4 bg-white/10 rounded-xl">
            <p className="text-white/80">
              {currentRecord.client ? 'Client' : 'Doubll'} mood recorded. Now recording {currentRecord.client ? 'Doubll' : 'Client'} mood.
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          <MoodStepRenderer
            currentStep={currentStep}
            selection={selection}
            onRoleSelect={handleRoleSelect}
            onPrimaryMoodSelect={handlePrimaryMoodSelect}
            onSpecificMoodSelect={handleSpecificMoodSelect}
            onEmotionSelect={handleEmotionSelect}
            onSaveMood={handleSaveMood}
          />
        </AnimatePresence>

        {showBackButton && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8 flex justify-between">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 bg-black/30 backdrop-blur-sm hover:bg-black/40 text-white rounded-xl transition-colors border border-white/10"
            >
              <ChevronLeft size={20} />
              Back
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => navigate('/mood/log')}
              className="flex items-center gap-2 px-6 py-3 bg-black/30 backdrop-blur-sm hover:bg-black/40 text-white rounded-xl transition-colors border border-white/10"
            >
              <ClipboardList size={20} />
              View Mood Log
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}