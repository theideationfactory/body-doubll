export interface Emotion {
  id: string;
  name: string;
  icon?: string;
}

export interface SpecificMood {
  id: string;
  name: string;
  icon: string;
  emotions: Emotion[];
  gradient: string;
}

export interface PrimaryMood {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  specificMoods: SpecificMood[];
}

export interface MoodSelection {
  role?: 'client' | 'doubll';
  primaryMood?: PrimaryMood;
  specificMood?: SpecificMood;
  selectedEmotions: Emotion[];
}

export interface CompleteMoodEntry {
  client?: {
    primaryMood?: string;
    specificMood?: string;
    emotions: string[];
  };
  doubll?: {
    primaryMood?: string;
    specificMood?: string;
    emotions: string[];
  };
  date: string;
}