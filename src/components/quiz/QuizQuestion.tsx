import React from 'react';
import type { QuizQuestion as QuizQuestionType } from '../../types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (answer: string) => void;
  selectedAnswer?: string;
}

export function QuizQuestion({ question, onAnswer, selectedAnswer }: QuizQuestionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">{question.question}</h3>
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className={`w-full p-4 rounded-lg transition-all duration-300 ${
              selectedAnswer === option
                ? 'bg-violet-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}