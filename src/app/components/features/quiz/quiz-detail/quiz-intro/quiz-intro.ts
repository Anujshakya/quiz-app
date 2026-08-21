import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizModel } from '../../../../../models/quiz.model';
import { getDifficultyClass } from '../../../../../shared/quiz-difficulty';

@Component({
  selector: 'app-quiz-intro',
  imports: [RouterLink],
  templateUrl: './quiz-intro.html',
  styleUrl: './quiz-intro.css',
})
export class QuizIntro {
  quiz = input.required<QuizModel>();
  start = output<void>();

  getDifficultyClass = getDifficultyClass;
}
