export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizResponse {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timestamp: Date;
}