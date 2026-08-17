import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiError } from '../../../models/common/api-response.model';
import { QuizModel } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { QuizCard } from './quiz-card/quiz-card';

@Component({
  selector: 'app-quiz-list',
  imports: [QuizCard],
  templateUrl: './quiz-list.html',
  styleUrl: './quiz-list.css',
})
export class QuizList implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();

  quizzes: QuizModel[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.sub.add(
      this.quizService.getAll().subscribe({
        next: (res) => {
          this.quizzes = res.data;
        },
        error: (err) => {
          if (err instanceof ApiError) {
            console.error(err.response.error.message);
            return;
          }

          console.error('Request failed', err);
        },
      }),
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
