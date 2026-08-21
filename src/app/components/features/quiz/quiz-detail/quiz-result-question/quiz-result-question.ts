import { Component, computed, input } from '@angular/core';
import { QuestionModel } from '../../../../../models/question.model';

@Component({
  selector: 'app-quiz-result-question',
  imports: [],
  templateUrl: './quiz-result-question.html',
  styleUrl: './quiz-result-question.css',
})
export class QuizResultQuestion {
  question = input.required<QuestionModel>();
  selectedAnswerId = input<string | undefined>(undefined);

  isCorrect = computed(() => {
    const selectedId = this.selectedAnswerId();
    return this.question().answers.some((answer) => answer.id === selectedId && answer.isCorrect);
  });
}
