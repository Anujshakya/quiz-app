import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuestionModel } from '../../../../../models/question.model';
import { QuizResultQuestion } from '../quiz-result-question/quiz-result-question';

@Component({
  selector: 'app-quiz-results',
  imports: [RouterLink, QuizResultQuestion],
  templateUrl: './quiz-results.html',
  styleUrl: './quiz-results.css',
})
export class QuizResults {
  questions = input.required<QuestionModel[]>();
  selectedAnswerIds = input.required<Record<string, string>>();
  score = input.required<number>();
  restart = output<void>();
}
