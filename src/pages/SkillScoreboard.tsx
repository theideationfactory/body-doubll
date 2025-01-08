import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Waves, 
  Sparkles, 
  Gamepad2, 
  Clock, 
  ListTodo, 
  Calendar, 
  Heart, 
  ShieldCheck, 
  Megaphone,
  Shuffle,
  RefreshCw, 
  ArrowLeft,
  Brain,
  EyeOff,
  Moon,
  Save,
  Trophy,
  ChevronUp,
  ChevronDown,
  Plus
} from 'lucide-react';
import { ColorButton } from '../components/ColorButton';
import { Celebration } from '../components/Celebration';
import { CompetitiveScoreboard } from '../components/CompetitiveScoreboard';
import { NavigationStrip } from '../components/NavigationStrip';
import { AddSkillModal } from '../components/skills/AddSkillModal';
import { SupportSkillsScoreboard } from '../components/skills/SupportSkillsScoreboard';
import * as Icons from 'lucide-react';

interface Skills {
  [key: string]: number;
  fluidity: number;
  imagination: number;
  fun: number;
  timeManagement: number;
  priorityManagement: number;
  calendaring: number;
  compassion: number;
  responsibility: number;
  selfAdvocacy: number;
  transitions: number;
  obsessing: number;
  ignoringNeeds: number;
}

interface CustomSkill {
  name: string;
  icon: string;
  points: number;
}

export function SkillScoreboard() {
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebratedSkill, setCelebratedSkill] = useState('');
  const [skillsExpanded, setSkillsExpanded] = useState(true);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customSkills, setCustomSkills] = useState<CustomSkill[]>(() => {
    const saved = localStorage.getItem('customSkills');
    return saved ? JSON.parse(saved) : [];
  });
  const [skills, setSkills] = useState<Skills>(() => {
    const saved = localStorage.getItem('skills');
    return saved ? JSON.parse(saved) : {
      fluidity: 0,
      imagination: 0,
      fun: 0,
      timeManagement: 0,
      priorityManagement: 0,
      calendaring: 0,
      compassion: 0,
      responsibility: 0,
      selfAdvocacy: 0,
      transitions: 0,
      obsessing: 0,
      ignoringNeeds: 0
    };
  });

  const sessionScore = Object.entries(skills).reduce((sum, [key, points]) => {
    if (key !== 'obsessing' && key !== 'ignoringNeeds') {
      return sum + points;
    }
    return sum;
  }, 0);

  const shadowScore = skills.obsessing + skills.ignoringNeeds;

  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('customSkills', JSON.stringify(customSkills));
  }, [customSkills]);

  const handlePointsAdd = (skill: keyof Skills) => {
    if (skills[skill] < 5) {
      setSkills(prev => ({
        ...prev,
        [skill]: prev[skill] + 1
      }));

      if (skills[skill] + 1 === 5) {
        setCelebratedSkill(skill.replace(/([A-Z])/g, ' $1').trim());
        setShowCelebration(true);
      }
    }
  };

  const handleCustomSkillPointsAdd = (skillName: string) => {
    setCustomSkills(prev => prev.map(skill => 
      skill.name === skillName && skill.points < 5
        ? { ...skill, points: skill.points + 1 }
        : skill
    ));
  };

  const handleAddSkill = (newSkills: Array<{ name: string; icon: string }>) => {
    const skillsToAdd = newSkills.map(skill => ({
      ...skill,
      points: 0
    }));
    setCustomSkills(prev => [...prev, ...skillsToAdd]);
  };

  const handleSkillsReset = () => {
    setSkills({
      fluidity: 0,
      imagination: 0,
      fun: 0,
      timeManagement: 0,
      priorityManagement: 0,
      calendaring: 0,
      compassion: 0,
      responsibility: 0,
      selfAdvocacy: 0,
      transitions: 0,
      obsessing: 0,
      ignoringNeeds: 0
    });
    setCustomSkills([]);
  };

  const handleSubmitDailyScores = () => {
    const dailyRecords = JSON.parse(localStorage.getItem('dailyRecords') || '[]');
    const competitiveScores = JSON.parse(localStorage.getItem('competitiveScores') || '{"amarie": 0, "adam": 0}');
    
    const skillScores = {
      fluidity: skills.fluidity,
      imagination: skills.imagination,
      fun: skills.fun,
      timeManagement: skills.timeManagement,
      priorityManagement: skills.priorityManagement,
      calendaring: skills.calendaring,
      compassion: skills.compassion,
      responsibility: skills.responsibility,
      selfAdvocacy: skills.selfAdvocacy,
      transitions: skills.transitions,
      obsessing: skills.obsessing,
      ignoringNeeds: skills.ignoringNeeds
    };

    // Add custom skills if they exist
    customSkills.forEach(skill => {
      const key = skill.name.toLowerCase().replace(/\s+/g, '');
      skillScores[key] = skill.points;
    });

    const newRecord = {
      date: new Date().toLocaleString(),
      sessionScore,
      shadowScore,
      competitiveScores,
      skills: skillScores
    };

    localStorage.setItem('dailyRecords', JSON.stringify([...dailyRecords, newRecord]));
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 sm:p-8 pt-24">
      <NavigationStrip />
      <div className="relative max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-3xl -m-6" />
        
        <div className="relative">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>

          <div className="space-y-8">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight leading-none">
                  Client Skills
                </h2>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setShowAddSkillModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 text-emerald-400 hover:text-emerald-300 rounded-lg transition-colors ring-1 ring-emerald-500/50"
                  >
                    <Plus size={16} />
                    Add Skill
                  </button>

                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-lg ring-1 ring-white/10">
                    <Moon size={16} className="text-gray-400" />
                    <span className="text-xl font-bold bg-gradient-to-r from-gray-400 to-gray-300 text-transparent bg-clip-text">
                      {shadowScore}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 bg-black/50 rounded-lg ring-1 ring-white/20">
                    <div className="w-4 h-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                      <Trophy size={12} className="text-yellow-900" strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-transparent bg-clip-text">
                      {sessionScore}
                    </span>
                  </div>

                  <button
                    onClick={() => setSkillsExpanded(!skillsExpanded)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 rounded-lg transition-colors ring-1 ring-blue-500/50"
                  >
                    {skillsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    {skillsExpanded ? 'Collapse' : 'Expand'}
                  </button>

                  <button
                    onClick={handleSkillsReset}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-colors ring-1 ring-red-500/50"
                  >
                    <RefreshCw size={16} />
                    Reset Skills
                  </button>
                </div>
              </div>

              {skillsExpanded && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 animate-fadeIn">
                  <ColorButton
                    color="bg-gradient-to-br from-blue-500 to-blue-600"
                    hoverColor="hover:from-blue-400 hover:to-blue-500"
                    label="Fluidity"
                    points={skills.fluidity}
                    onPointsAdd={() => handlePointsAdd('fluidity')}
                    description="No anxiety or distraction, just focus"
                  >
                    <Waves size={32} />
                  </ColorButton>

                  <ColorButton
                    color="bg-gradient-to-br from-purple-500 to-purple-600"
                    hoverColor="hover:from-purple-400 hover:to-purple-500"
                    label="Imagination"
                    points={skills.imagination}
                    onPointsAdd={() => handlePointsAdd('imagination')}
                    description="Characters, drama, big ideas"
                  >
                    <Sparkles size={32} />
                  </ColorButton>

                  <ColorButton
                    color="bg-gradient-to-br from-pink-500 to-pink-600"
                    hoverColor="hover:from-pink-400 hover:to-pink-500"
                    label="Fun"
                    points={skills.fun}
                    onPointsAdd={() => handlePointsAdd('fun')}
                    description="Playful jokes, interesting musings"
                  >
                    <Gamepad2 size={32} />
                  </ColorButton>

                  <ColorButton
                    color="bg-gradient-to-br from-cyan-500 to-cyan-600"
                    hoverColor="hover:from-cyan-400 hover:to-cyan-500"
                    label="Time Management"
                    points={skills.timeManagement}
                    onPointsAdd={() => handlePointsAdd('timeManagement')}
                    description="Starting and following up with timers"
                  >
                    <Clock size={32} />
                  </ColorButton>

                  <ColorButton
                    color="bg-gradient-to-br from-emerald-500 to-emerald-600"
                    hoverColor="hover:from-emerald-400 hover:to-emerald-500"
                    label="Priority Management"
                    points={skills.priorityManagement}
                    onPointsAdd={() => handlePointsAdd('priorityManagement')}
                    description="Doing tasks that are highest priority first"
                  >
                    <ListTodo size={32} />
                  </ColorButton>

                  <ColorButton
                    color="bg-gradient-to-br from-indigo-500 to-indigo-600"
                    hoverColor="hover:from-indigo-400 hover:to-indigo-500"
                    label="Calendaring"
                    points={skills.calendaring}
                    onPointsAdd={() => handlePointsAdd('calendaring')}
                    description="Checking in with calendar consistently"
                  >
                    <Calendar size={32} />
                  </ColorButton>

                  <ColorButton
                    color="bg-gradient-to-br from-red-500 to-red-600"
                    hoverColor="hover:from-red-400 hover:to-red-500"
                    label="Compassion"
                    points={skills.compassion}
                    onPointsAdd={() => handlePointsAdd('compassion')}
                    description="Having grace for mistakes and failure"
                  >
                    <Heart size={32} />
                  </ColorButton>

                  <ColorButton
                    color="bg-gradient-to-br from-amber-500 to-amber-600"
                    hoverColor="hover:from-amber-400 hover:to-amber-500"
                    label="Responsibility"
                    points={skills.responsibility}
                    onPointsAdd={() => handlePointsAdd('responsibility')}
                  >
                    <ShieldCheck size={32} />
                  </ColorButton>

                  <ColorButton
                    color="bg-gradient-to-br from-violet-500 to-violet-600"
                    hoverColor="hover:from-violet-400 hover:to-violet-500"
                    label="Self-Advocacy"
                    points={skills.selfAdvocacy}
                    onPointsAdd={() => handlePointsAdd('selfAdvocacy')}
                    description="Asking for needs, bringing up bothers"
                  >
                    <Megaphone size={32} />
                  </ColorButton>

                  <ColorButton
                    color="bg-gradient-to-br from-teal-500 to-teal-600"
                    hoverColor="hover:from-teal-400 hover:to-teal-500"
                    label="Transitions"
                    points={skills.transitions}
                    onPointsAdd={() => handlePointsAdd('transitions')}
                    description="Properly saving, packing up and checking in"
                  >
                    <Shuffle size={32} />
                  </ColorButton>

                  <ColorButton
                    color="bg-gradient-to-br from-gray-600 to-gray-700"
                    hoverColor="hover:from-gray-500 hover:to-gray-600"
                    label="Obsessing"
                    points={skills.obsessing}
                    onPointsAdd={() => handlePointsAdd('obsessing')}
                    isShadowSkill={true}
                  >
                    <Brain size={32} />
                  </ColorButton>

                  <ColorButton
                    color="bg-gradient-to-br from-gray-600 to-gray-700"
                    hoverColor="hover:from-gray-500 hover:to-gray-600"
                    label="Ignoring Needs"
                    points={skills.ignoringNeeds}
                    onPointsAdd={() => handlePointsAdd('ignoringNeeds')}
                    isShadowSkill={true}
                  >
                    <EyeOff size={32} />
                  </ColorButton>

                  {customSkills.map((skill, index) => {
                    const Icon = (Icons as any)[skill.icon];
                    return (
                      <ColorButton
                        key={`${skill.name}-${index}`}
                        color="bg-gradient-to-br from-blue-500 to-indigo-500"
                        hoverColor="hover:from-blue-400 hover:to-indigo-400"
                        label={skill.name}
                        points={skill.points}
                        onPointsAdd={() => handleCustomSkillPointsAdd(skill.name)}
                      >
                        <Icon size={32} />
                      </ColorButton>
                    );
                  })}
                </div>
              )}
            </div>

            <SupportSkillsScoreboard />

            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6">
              <CompetitiveScoreboard title="Focus Competition" />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/overall-record')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Trophy size={20} />
                Score Overall Record
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSubmitDailyScores}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Save size={20} />
                  Submit Daily Scores
                </button>
                {isSubmitted && (
                  <span className="text-emerald-400 font-medium">
                    Submitted
                  </span>
                )}
              </div>
            </div>
          </div>

          {showCelebration && (
            <Celebration
              skillName={celebratedSkill}
              onClose={() => setShowCelebration(false)}
            />
          )}

          <AddSkillModal
            isOpen={showAddSkillModal}
            onClose={() => setShowAddSkillModal(false)}
            onAdd={handleAddSkill}
          />
        </div>
      </div>
    </div>
  );
}