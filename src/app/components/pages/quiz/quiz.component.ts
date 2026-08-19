import { Component } from '@angular/core';
import { QuizList } from '../../features/quiz/quiz-list/quiz-list';

@Component({
  selector: 'app-quiz',
  imports: [QuizList],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {}
