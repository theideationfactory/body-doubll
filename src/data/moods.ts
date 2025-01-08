import { PrimaryMood } from '../types/mood';
import { 
  Sun, 
  CloudSun, 
  Cloud,
  Heart,
  Star,
  Smile,
  Meh,
  Frown,
  Angry,
  Sparkles,
  Zap,
  Coffee,
  AlertTriangle,
  XCircle,
  Loader,
  HeartOff,
  UserMinus,
  type LucideIcon
} from 'lucide-react';

export const primaryMoods: PrimaryMood[] = [
  {
    id: 'positive',
    name: 'Positive',
    icon: Sun,
    gradient: 'from-amber-400 to-yellow-500',
    specificMoods: [
      {
        id: 'empowered',
        name: 'Empowered',
        icon: Zap,
        gradient: 'from-emerald-400 to-green-500',
        emotions: [
          { id: 'confident', name: 'Confident' },
          { id: 'strong', name: 'Strong' },
          { id: 'capable', name: 'Capable' },
          { id: 'determined', name: 'Determined' },
          { id: 'resilient', name: 'Resilient' }
        ]
      },
      {
        id: 'grateful',
        name: 'Grateful',
        icon: Heart,
        gradient: 'from-pink-400 to-rose-500',
        emotions: [
          { id: 'thankful', name: 'Thankful' },
          { id: 'blessed', name: 'Blessed' },
          { id: 'appreciative', name: 'Appreciative' },
          { id: 'content', name: 'Content' },
          { id: 'fulfilled', name: 'Fulfilled' }
        ]
      },
      {
        id: 'excited',
        name: 'Excited',
        icon: Sparkles,
        gradient: 'from-violet-400 to-purple-500',
        emotions: [
          { id: 'enthusiastic', name: 'Enthusiastic' },
          { id: 'energized', name: 'Energized' },
          { id: 'inspired', name: 'Inspired' },
          { id: 'motivated', name: 'Motivated' },
          { id: 'passionate', name: 'Passionate' }
        ]
      },
      {
        id: 'peaceful',
        name: 'Peaceful',
        icon: Coffee,
        gradient: 'from-blue-400 to-cyan-500',
        emotions: [
          { id: 'calm', name: 'Calm' },
          { id: 'relaxed', name: 'Relaxed' },
          { id: 'serene', name: 'Serene' },
          { id: 'tranquil', name: 'Tranquil' },
          { id: 'mindful', name: 'Mindful' }
        ]
      }
    ]
  },
  {
    id: 'neutral',
    name: 'Neutral',
    icon: Cloud,
    gradient: 'from-gray-400 to-slate-500',
    specificMoods: [
      {
        id: 'calm',
        name: 'Calm',
        icon: Meh,
        gradient: 'from-teal-400 to-emerald-500',
        emotions: [
          { id: 'steady', name: 'Steady' },
          { id: 'balanced', name: 'Balanced' },
          { id: 'composed', name: 'Composed' },
          { id: 'centered', name: 'Centered' },
          { id: 'stable', name: 'Stable' }
        ]
      },
      {
        id: 'reserved',
        name: 'Reserved',
        icon: Smile,
        gradient: 'from-indigo-400 to-blue-500',
        emotions: [
          { id: 'quiet', name: 'Quiet' },
          { id: 'observant', name: 'Observant' },
          { id: 'thoughtful', name: 'Thoughtful' },
          { id: 'introspective', name: 'Introspective' },
          { id: 'contemplative', name: 'Contemplative' }
        ]
      }
    ]
  },
  {
    id: 'negative',
    name: 'Negative',
    icon: Cloud,
    gradient: 'from-slate-600 to-gray-700',
    specificMoods: [
      {
        id: 'fearful',
        name: 'Fearful/Anxious',
        icon: AlertTriangle,
        gradient: 'from-amber-600 to-orange-700',
        emotions: [
          { id: 'worried', name: 'Worried' },
          { id: 'nervous', name: 'Nervous' },
          { id: 'scared', name: 'Scared' },
          { id: 'panicked', name: 'Panicked' },
          { id: 'overwhelmed', name: 'Overwhelmed' }
        ]
      },
      {
        id: 'disgusted',
        name: 'Disgusted',
        icon: XCircle,
        gradient: 'from-green-600 to-emerald-700',
        emotions: [
          { id: 'repelled', name: 'Repelled' },
          { id: 'revolted', name: 'Revolted' },
          { id: 'averse', name: 'Averse' },
          { id: 'offended', name: 'Offended' },
          { id: 'appalled', name: 'Appalled' }
        ]
      },
      {
        id: 'overwhelmed',
        name: 'Overwhelmed',
        icon: Loader,
        gradient: 'from-purple-600 to-violet-700',
        emotions: [
          { id: 'stressed', name: 'Stressed' },
          { id: 'pressured', name: 'Pressured' },
          { id: 'burdened', name: 'Burdened' },
          { id: 'exhausted', name: 'Exhausted' },
          { id: 'drained', name: 'Drained' }
        ]
      },
      {
        id: 'jealous',
        name: 'Jealous',
        icon: HeartOff,
        gradient: 'from-pink-600 to-rose-700',
        emotions: [
          { id: 'envious', name: 'Envious' },
          { id: 'resentful', name: 'Resentful' },
          { id: 'bitter', name: 'Bitter' },
          { id: 'covetous', name: 'Covetous' },
          { id: 'insecure', name: 'Insecure' }
        ]
      },
      {
        id: 'lonely',
        name: 'Lonely',
        icon: UserMinus,
        gradient: 'from-blue-600 to-indigo-700',
        emotions: [
          { id: 'isolated', name: 'Isolated' },
          { id: 'abandoned', name: 'Abandoned' },
          { id: 'disconnected', name: 'Disconnected' },
          { id: 'excluded', name: 'Excluded' },
          { id: 'unwanted', name: 'Unwanted' }
        ]
      }
    ]
  }
];