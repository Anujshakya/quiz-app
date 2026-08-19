import { Component, Input } from '@angular/core';
import { QuizModel } from '../../../../models/quiz.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-card',
  imports: [],
  templateUrl: './quiz-card.html',
  styleUrl: './quiz-card.css',
})
export class QuizCard {
  @Input() quiz: QuizModel = {} as QuizModel;

  constructor(
    private _router: Router,
  ) {
  }

  // TODO: improve difficulty using Enum
  getDifficultyClass(difficulty: string): string {
    switch (difficulty) {
      case 'EASY':
        return 'bg-green-100 text-green-800';

      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';

      case 'HARD':
        return 'bg-red-100 text-red-800';

      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  startQuiz(quiz_id: string): void {
    console.log('Starting quiz:', quiz_id);

    // Navigate to quiz page here
    this._router.navigate(['/quiz', quiz_id]);
  }
}
