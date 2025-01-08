export interface SkillScores {
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
  [key: string]: number; // For custom skills
}

export interface CompetitiveScores {
  amarie: number;
  adam: number;
}

export interface DailyRecord {
  date: string;
  sessionScore: number;
  shadowScore: number;
  competitiveScores: CompetitiveScores;
  skills: SkillScores;
}

export interface SkillDefinition {
  name: string;
  icon: React.ElementType;
  color: string;
  isShadow?: boolean;
}