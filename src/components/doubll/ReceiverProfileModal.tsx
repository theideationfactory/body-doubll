import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface ReceiverProfile {
  name: string;
  location: string;
  age: string;
  pronouns: string;
  services: string[];
  matchTypes: string[];
  availability: string;
}

interface ReceiverProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (profile: ReceiverProfile) => void;
}

export function ReceiverProfileModal({ isOpen, onClose, onSubmit }: ReceiverProfileModalProps) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<ReceiverProfile>({
    name: '',
    location: '',
    age: '',
    pronouns: '',
    services: [],
    matchTypes: [],
    availability: ''
  });

  const serviceOptions = [
    'Meal Prepping',
    'Household Chores',
    'Errands',
    'Nature Activities',
    'Creative Projects'
  ];

  const matchTypeOptions = [
    'Paid Services',
    'Friendly Match',
    'Both'
  ];

  const steps = [
    {
      title: "What's your name?",
      subtitle: "Let's start with your name",
      field: 'name',
      type: 'text',
      placeholder: 'Enter your name'
    },
    {
      title: 'Where are you located?',
      subtitle: 'City and state, please',
      field: 'location',
      type: 'text',
      placeholder: 'e.g., Austin, TX'
    },
    {
      title: 'How old are you?',
      subtitle: 'Must be 18 or older',
      field: 'age',
      type: 'number',
      placeholder: 'Enter your age'
    },
    {
      title: 'What are your pronouns?',
      subtitle: 'Optional, but helpful',
      field: 'pronouns',
      type: 'text',
      placeholder: 'e.g., they/them'
    },
    {
      title: 'What services interest you?',
      subtitle: 'Select all that apply',
      field: 'services',
      type: 'multiselect',
      options: serviceOptions
    },
    {
      title: 'What type of match are you looking for?',
      subtitle: 'Select your preference',
      field: 'matchTypes',
      type: 'multiselect',
      options: matchTypeOptions
    },
    {
      title: 'When are you typically available?',
      subtitle: 'Let us know your schedule',
      field: 'availability',
      type: 'textarea',
      placeholder: 'e.g., Weekday mornings, weekend afternoons'
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onSubmit(profile);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const updateProfile = (field: keyof ReceiverProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    const currentStep = steps[step];
    const value = profile[currentStep.field as keyof ReceiverProfile];
    
    if (currentStep.type === 'multiselect') {
      return Array.isArray(value) && value.length > 0;
    }
    
    return value !== '';
  };

  if (!isOpen) return null;

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative w-full max-w-2xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white"
        >
          <span className="text-sm">ESC</span>
        </button>

        <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Question */}
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white">{currentStep.title}</h2>
                  <p className="text-white/60">{currentStep.subtitle}</p>
                </div>

                {/* Input */}
                <div className="space-y-4">
                  {currentStep.type === 'multiselect' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentStep.options.map(option => (
                        <button
                          key={option}
                          onClick={() => {
                            const field = currentStep.field as keyof ReceiverProfile;
                            const currentValue = profile[field] as string[];
                            const newValue = currentValue.includes(option)
                              ? currentValue.filter(v => v !== option)
                              : [...currentValue, option];
                            updateProfile(field, newValue);
                          }}
                          className={`p-4 rounded-xl text-left transition-all duration-300 ${
                            (profile[currentStep.field as keyof ReceiverProfile] as string[]).includes(option)
                              ? 'bg-violet-500/30 ring-2 ring-violet-500'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-white">{option}</span>
                        </button>
                      ))}
                    </div>
                  ) : currentStep.type === 'textarea' ? (
                    <textarea
                      value={profile[currentStep.field as keyof ReceiverProfile] as string}
                      onChange={e => updateProfile(currentStep.field as keyof ReceiverProfile, e.target.value)}
                      placeholder={currentStep.placeholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 h-32"
                    />
                  ) : (
                    <input
                      type={currentStep.type}
                      value={profile[currentStep.field as keyof ReceiverProfile] as string}
                      onChange={e => updateProfile(currentStep.field as keyof ReceiverProfile, e.target.value)}
                      placeholder={currentStep.placeholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              {step > 0 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
              ) : (
                <div></div>
              )}

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {step === steps.length - 1 ? 'Complete' : 'Continue'}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}