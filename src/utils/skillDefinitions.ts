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
  Brain,
  EyeOff
} from 'lucide-react';
import { SkillDefinition } from '../types/records';

export const skillDefinitions: SkillDefinition[] = [
  { name: 'Fluidity', icon: Waves, color: 'text-blue-400' },
  { name: 'Imagination', icon: Sparkles, color: 'text-purple-400' },
  { name: 'Fun', icon: Gamepad2, color: 'text-pink-400' },
  { name: 'Time Management', icon: Clock, color: 'text-cyan-400' },
  { name: 'Priority Management', icon: ListTodo, color: 'text-emerald-400' },
  { name: 'Calendaring', icon: Calendar, color: 'text-indigo-400' },
  { name: 'Compassion', icon: Heart, color: 'text-red-400' },
  { name: 'Responsibility', icon: ShieldCheck, color: 'text-amber-400' },
  { name: 'Self-Advocacy', icon: Megaphone, color: 'text-violet-400' },
  { name: 'Transitions', icon: Shuffle, color: 'text-teal-400' },
  { name: 'Obsessing', icon: Brain, color: 'text-gray-400', isShadow: true },
  { name: 'Ignoring Needs', icon: EyeOff, color: 'text-gray-400', isShadow: true }
];