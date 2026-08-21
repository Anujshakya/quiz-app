import { Component, computed, input, output } from '@angular/core';
import { QuestionModel } from '../../../../../models/question.model';
import { getDifficultyClass } from '../../../../../shared/quiz-difficulty';

@Component({
  selector: 'app-quiz-question',
  imports: [],
  templateUrl: './quiz-question.html',
  styleUrl: './quiz-question.css',
})
export class QuizQuestion {
  question = input.required<QuestionModel>();
  currentIndex = input.required<number>();
  totalQuestions = input.required<number>();
  answeredCount = input.required<number>();
  selectedAnswerId = input<string | undefined>(undefined);

  selectAnswer = output<string>();
  previous = output<void>();
  next = output<void>();
  submit = output<void>();

  getDifficultyClass = getDifficultyClass;

  progressPercent = computed(() => {
    const total = this.totalQuestions();
    if (!total) {
      return 0;
    }

    return ((this.currentIndex() + 1) / total) * 100;
  });

  isFirst = computed(() => this.currentIndex() === 0);
  isLast = computed(() => this.currentIndex() >= this.totalQuestions() - 1);
  canSubmit = computed(() => this.answeredCount() >= this.totalQuestions());
}
