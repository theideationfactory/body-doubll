export interface SkillCategory {
  id: string;
  name: string;
  subskills: Subskill[];
}

export interface Subskill {
  id: string;
  name: string;
  icons: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'self-awareness',
    name: 'Self-Awareness and Reflection',
    subskills: [
      { id: 'introspection', name: 'Introspection', icons: ['Eye', 'Lightbulb', 'Glasses'] },
      { id: 'curiosity', name: 'Curiosity', icons: ['Search', 'BookOpen', 'Sparkles'] },
      { id: 'critical-thinking', name: 'Critical Thinking', icons: ['Brain', 'Puzzle', 'Search'] },
      { id: 'perspective', name: 'Perspective-Taking', icons: ['Eye', 'Globe', 'Compass'] },
      { id: 'forgiveness', name: 'Forgiveness', icons: ['Heart', 'HandHeart', 'Users'] }
    ]
  },
  {
    id: 'interpersonal',
    name: 'Interpersonal Skills',
    subskills: [
      { id: 'collaboration', name: 'Collaboration', icons: ['Users', 'Puzzle', 'HandHeart'] },
      { id: 'assertiveness', name: 'Assertiveness', icons: ['Speech', 'Shield', 'Zap'] },
      { id: 'inclusivity', name: 'Inclusivity', icons: ['Users', 'Heart', 'Globe'] },
      { id: 'advocacy', name: 'Advocacy for Others', icons: ['Speech', 'HandHeart', 'Globe'] },
      { id: 'empathic-listening', name: 'Empathic Listening', icons: ['Heart', 'Users', 'Speech'] }
    ]
  },
  {
    id: 'emotional-regulation',
    name: 'Emotional Regulation',
    subskills: [
      { id: 'patience', name: 'Patience', icons: ['Timer', 'Leaf', 'Scale'] },
      { id: 'conflict-avoidance', name: 'Conflict Avoidance', icons: ['Shield', 'Users', 'HandHeart'] },
      { id: 'self-soothing', name: 'Self-Soothing', icons: ['Leaf', 'Heart', 'Moon'] },
      { id: 'stress-management', name: 'Stress Management', icons: ['Leaf', 'Heart', 'Scale'] }
    ]
  },
  {
    id: 'goal-oriented',
    name: 'Goal-Oriented Skills',
    subskills: [
      { id: 'habit-formation', name: 'Habit Formation', icons: ['Calendar', 'ListTodo', 'Target'] },
      { id: 'long-term-planning', name: 'Long-Term Planning', icons: ['Compass', 'Mountain', 'Target'] },
      { id: 'perseverance', name: 'Perseverance', icons: ['Mountain', 'Flag', 'Footprints'] },
      { id: 'perfectionism', name: 'Overcoming Perfectionism', icons: ['Target', 'Sparkles', 'Lightbulb'] },
      { id: 'rest', name: 'Prioritizing Rest', icons: ['Moon', 'Timer', 'Leaf'] }
    ]
  },
  {
    id: 'decision-making',
    name: 'Decision-Making and Problem-Solving',
    subskills: [
      { id: 'decision-making', name: 'Decision-Making', icons: ['Scale', 'Brain', 'Target'] },
      { id: 'risk-taking', name: 'Healthy Risk-Taking', icons: ['Target', 'Mountain', 'Sparkles'] },
      { id: 'social-cues', name: 'Navigating Social Cues', icons: ['Users', 'Compass', 'Eye'] }
    ]
  },
  {
    id: 'creativity',
    name: 'Creativity and Play',
    subskills: [
      { id: 'playfulness', name: 'Playfulness', icons: ['Sparkles', 'Smile', 'Star'] },
      { id: 'gratitude', name: 'Gratitude Practice', icons: ['Heart', 'HandHeart', 'Star'] },
      { id: 'celebration', name: 'Celebrating Success', icons: ['Trophy', 'Star', 'Medal'] }
    ]
  },
  {
    id: 'boundaries',
    name: 'Boundaries and Trust',
    subskills: [
      { id: 'boundary-setting', name: 'Boundary Setting', icons: ['Shield', 'Lock', 'Target'] },
      { id: 'support-seeking', name: 'Seeking Support', icons: ['HandHeart', 'Users', 'Heart'] },
      { id: 'trust-building', name: 'Trust Building', icons: ['Users', 'HandHeart', 'Shield'] }
    ]
  }
];