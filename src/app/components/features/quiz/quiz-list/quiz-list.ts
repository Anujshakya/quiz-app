import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiError } from '../../../../models/common/api-response.model';
import { QuizModel } from '../../../../models/quiz.model';
import { QuizService } from '../../../../services/quiz.service';
import { QuizCard } from '../quiz-card/quiz-card';

@Component({
  selector: 'app-quiz-list',
  imports: [QuizCard],
  templateUrl: './quiz-list.html',
  styleUrl: './quiz-list.css',
})
export class QuizList implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();

  quizzes = signal<QuizModel[]>([]);
  loading = signal(true);
  loadError = signal<string | null>(null);

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading.set(true);
    this.loadError.set(null);

    this.sub.add(
      this.quizService.getAll().subscribe({
        next: (res) => {
          this.quizzes.set(res.data);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);

          if (err instanceof ApiError) {
            this.loadError.set(err.response.error.message);
            return;
          }

          this.loadError.set('Failed to load quizzes.');
        },
      }),
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
