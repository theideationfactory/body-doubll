import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { QuizQuestion } from '../components/quiz/QuizQuestion';
import { quizService } from '../services/quizService';
import { stateCapitals } from '../data/quizQuestions';
import type { QuizResponse } from '../types/quiz';

export function QuizPage() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = stateCapitals[currentQuestionIndex];

  const handleAnswer = async (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    const response: QuizResponse = {
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      isCorrect: answer === currentQuestion.correctAnswer,
      timestamp: new Date()
    };

    try {
      setIsSubmitting(true);
      await quizService.saveQuizResponse(response);

      if (currentQuestionIndex < stateCapitals.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    } catch (error) {
      console.error('Error saving response:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">US State Capitals Quiz</h1>
            <p className="text-white/60">
              Question {currentQuestionIndex + 1} of {stateCapitals.length}
            </p>
          </div>

          {isComplete ? (
            <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-6 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
              <p className="text-white/80">Your responses have been recorded.</p>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <QuizQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
                selectedAnswer={answers[currentQuestion.id]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}