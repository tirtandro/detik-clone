'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
}

export function Quiz({ questions, title = 'Latihan Soal' }: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const isAnswered = answers.length > current;
  const selectedIndex = answers[current];
  const isCorrect = selectedIndex === questions[current].correctIndex;
  const score = answers.reduce(
    (acc, ans, idx) => (ans === questions[idx].correctIndex ? acc + 1 : acc),
    0
  );

  const handleSelect = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="rounded-xl border-border bg-surface p-6">
        <div className="text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">
              {score}/{questions.length}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-foreground">Hasil Latihan</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Kamu menjawab {score} dari {questions.length} soal dengan benar
          </p>
          <button
            onClick={handleRestart}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            <RotateCcw className="h-4 w-4" />
            Ulangi
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="rounded-xl border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Soal {current + 1} dari {questions.length}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round((answers.filter((a) => a !== undefined).length / questions.length) * 100)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-1.5 rounded-full bg-emerald-500 transition-all"
          style={{
            width: `${(current / questions.length) * 100}%`,
          }}
        />
      </div>

      <h3 className="mb-4 text-base font-semibold text-foreground">{q.question}</h3>

      <div className="space-y-2">
        {q.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          let borderClass = 'border-slate-200 hover:border-emerald-300 dark:border-slate-600 dark:hover:border-emerald-500';
          if (isAnswered) {
            if (index === q.correctIndex) {
              borderClass = 'border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/30';
            } else if (isSelected && !isCorrect) {
              borderClass = 'border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-900/20';
            } else {
              borderClass = 'border-slate-200 opacity-50 dark:border-slate-700';
            }
          }

          return (
            <button
              key={index}
              onClick={() => !isAnswered && handleSelect(index)}
              disabled={isAnswered}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border p-4 text-left text-sm transition-colors',
                borderClass
              )}
            >
              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-medium',
                  isAnswered && index === q.correctIndex
                    ? 'bg-emerald-500 text-white'
                    : isSelected && !isCorrect
                      ? 'bg-red-500 text-white'
                      : 'bg-muted text-foreground'
                )}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-slate-700 dark:text-slate-200">{option}</span>
              {isAnswered && index === q.correctIndex && (
                <CheckCircle className="ml-auto h-4 w-4 text-emerald-500" />
              )}
              {isAnswered && isSelected && !isCorrect && (
                <XCircle className="ml-auto h-4 w-4 text-red-500" />
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-4 rounded-lg bg-muted p-4">
          <p className="text-sm text-foreground">
            <span className="font-semibold">
              {isCorrect ? '✅ Benar!' : '❌ Kurang tepat.'}
            </span>{' '}
            {q.explanation}
          </p>
        </div>
      )}

      {isAnswered && (
        <button
          onClick={handleNext}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          {current < questions.length - 1 ? (
            <>
              Soal Selanjutnya <ChevronRight className="h-4 w-4" />
            </>
          ) : (
            'Lihat Hasil'
          )}
        </button>
      )}
    </div>
  );
}

export const MOCK_QUIZZES: Record<string, QuizQuestion[]> = {
  'soal-1': [
    {
      id: 'q1',
      question: 'Hasil dari 2³ × 2² adalah...',
      options: ['2⁵', '2⁶', '4⁵', '2¹'],
      correctIndex: 0,
      explanation: '2³ × 2² = 2^(3+2) = 2⁵. Sifat perkalian bilangan berpangkat: a^m × a^n = a^(m+n).',
    },
    {
      id: 'q2',
      question: 'Bentuk sederhana dari √75 adalah...',
      options: ['3√5', '5√3', '15√5', '5√15'],
      correctIndex: 1,
      explanation: '√75 = √(25×3) = √25 × √3 = 5√3.',
    },
    {
      id: 'q3',
      question: 'Akar-akar persamaan x² - 5x + 6 = 0 adalah...',
      options: ['x = 2 atau x = 3', 'x = -2 atau x = -3', 'x = 1 atau x = 6', 'x = -1 atau x = -6'],
      correctIndex: 0,
      explanation: 'x² - 5x + 6 = 0 → (x-2)(x-3) = 0 → x = 2 atau x = 3.',
    },
    {
      id: 'q4',
      question: 'Fungsi kuadrat f(x) = x² - 4x + 3 memiliki titik puncak di...',
      options: ['(2, -1)', '(-2, 1)', '(4, 3)', '(2, 1)'],
      correctIndex: 0,
      explanation: 'x_p = -b/2a = 4/2 = 2, y_p = f(2) = 4 - 8 + 3 = -1. Titik puncak (2, -1).',
    },
    {
      id: 'q5',
      question: 'Nilai dari 2⁻³ adalah...',
      options: ['-8', '1/8', '-1/8', '8'],
      correctIndex: 1,
      explanation: '2⁻³ = 1/2³ = 1/8. Sifat bilangan berpangkat negatif: a^(-n) = 1/a^n.',
    },
  ],
};
