import React, { useState, useEffect } from 'react';
import { Bell, CheckSquare2, ClipboardCheck, Moon, Trophy, ChevronUp, ChevronDown, RefreshCw, Plus } from 'lucide-react';
import { ColorButton } from '../ColorButton';
import { AddSupportSkillModal } from './AddSupportSkillModal';
import * as Icons from 'lucide-react';

interface SupportSkill {
  name: string;
  icon: string;
  points: number;
}

interface SupportSkills {
  reminding: number;
  doubleChecking: number;
  checkingIn: number;
}

export function SupportSkillsScoreboard() {
  const [skills, setSkills] = useState<SupportSkills>(() => {
    const saved = localStorage.getItem('supportSkills');
    return saved ? JSON.parse(saved) : {
      reminding: 0,
      doubleChecking: 0,
      checkingIn: 0
    };
  });

  const [customSkills, setCustomSkills] = useState<SupportSkill[]>(() => {
    const saved = localStorage.getItem('customSupportSkills');
    return saved ? JSON.parse(saved) : [];
  });

  const [skillsExpanded, setSkillsExpanded] = useState(true);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('supportSkills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('customSupportSkills', JSON.stringify(customSkills));
  }, [customSkills]);

  const handlePointsAdd = (skill: keyof SupportSkills) => {
    if (skills[skill] < 5) {
      setSkills(prev => ({
        ...prev,
        [skill]: prev[skill] + 1
      }));
    }
  };

  const handleCustomSkillPointsAdd = (skillName: string) => {
    setCustomSkills(prev => prev.map(skill => 
      skill.name === skillName && skill.points < 5
        ? { ...skill, points: skill.points + 1 }
        : skill
    ));
  };

  const handleSkillsReset = () => {
    setSkills({
      reminding: 0,
      doubleChecking: 0,
      checkingIn: 0
    });
    setCustomSkills([]);
  };

  const handleAddSkill = (newSkill: { name: string; icon: string }) => {
    setCustomSkills(prev => [...prev, { ...newSkill, points: 0 }]);
  };

  const sessionScore = Object.values(skills).reduce((sum, points) => sum + points, 0) +
    customSkills.reduce((sum, skill) => sum + skill.points, 0);

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 tracking-tight leading-none">
          Support Skills
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setShowAddSkillModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 text-emerald-400 hover:text-emerald-300 rounded-lg transition-colors ring-1 ring-emerald-500/50"
          >
            <Plus size={16} />
            Add Skill
          </button>

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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeIn">
          <ColorButton
            color="bg-gradient-to-br from-amber-500 to-amber-600"
            hoverColor="hover:from-amber-400 hover:to-amber-500"
            label="Reminding"
            points={skills.reminding}
            onPointsAdd={() => handlePointsAdd('reminding')}
            description="Setting and following up with reminders"
          >
            <Bell size={32} />
          </ColorButton>

          <ColorButton
            color="bg-gradient-to-br from-yellow-500 to-yellow-600"
            hoverColor="hover:from-yellow-400 hover:to-yellow-500"
            label="Double Checking"
            points={skills.doubleChecking}
            onPointsAdd={() => handlePointsAdd('doubleChecking')}
            description="Verifying tasks and details thoroughly"
          >
            <CheckSquare2 size={32} />
          </ColorButton>

          <ColorButton
            color="bg-gradient-to-br from-orange-500 to-orange-600"
            hoverColor="hover:from-orange-400 hover:to-orange-500"
            label="Checking In"
            points={skills.checkingIn}
            onPointsAdd={() => handlePointsAdd('checkingIn')}
            description="Regular status updates and communication"
          >
            <ClipboardCheck size={32} />
          </ColorButton>

          {customSkills.map((skill, index) => {
            const Icon = (Icons as any)[skill.icon];
            return (
              <ColorButton
                key={`${skill.name}-${index}`}
                color="bg-gradient-to-br from-amber-500 to-yellow-500"
                hoverColor="hover:from-amber-400 hover:to-yellow-400"
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

      <AddSupportSkillModal
        isOpen={showAddSkillModal}
        onClose={() => setShowAddSkillModal(false)}
        onAdd={handleAddSkill}
      />
    </div>
  );
}