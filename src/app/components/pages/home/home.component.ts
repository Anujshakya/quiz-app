import { Component } from '@angular/core';
import { QuizList } from '../../features/quiz-list/quiz-list';

@Component({
  selector: 'app-home',
  imports: [QuizList],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
