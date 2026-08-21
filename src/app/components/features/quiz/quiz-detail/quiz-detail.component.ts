import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuizService } from '../../../../services/quiz.service';
import { Subscription } from 'rxjs';
import { QuizModel } from '../../../../models/quiz.model';
import { ApiError } from '../../../../models/common/api-response.model';
import { QuizIntro } from './quiz-intro/quiz-intro';
import { QuizQuestion } from './quiz-question/quiz-question';
import { QuizResults } from './quiz-results/quiz-results';

@Component({
  selector: 'app-quiz-detail',
  imports: [RouterLink, QuizIntro, QuizQuestion, QuizResults],
  templateUrl: './quiz-detail.component.html',
  styleUrl: './quiz-detail.component.css',
})
export class QuizDetailComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();

  quiz = signal<QuizModel | null>(null);
  loading = signal(true);
  loadError = signal<string | null>(null);

  started = signal(false);
  submitted = signal(false);
  currentIndex = signal(0);
  selectedAnswerIds = signal<Record<string, string>>({});

  questions = computed(() => this.quiz()?.questions ?? []);
  currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  answeredCount = computed(() => {
    const selected = this.selectedAnswerIds();
    return this.questions().filter((question) => selected[question.id]).length;
  });
  score = computed(() => {
    const selected = this.selectedAnswerIds();
    return this.questions().filter((question) => {
      const selectedId = selected[question.id];
      return question.answers.some((answer) => answer.id === selectedId && answer.isCorrect);
    }).length;
  });

  constructor(
    private _route: ActivatedRoute,
    private _quizService: QuizService,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    const quiz_id = this._route.snapshot.paramMap.get('id');

    if (typeof quiz_id !== 'string') {
      this.loading.set(false);
      this.loadError.set('Quiz not found.');
      return;
    }

    this.loading.set(true);
    this.loadError.set(null);

    this.sub.add(
      this._quizService.getByUuid(quiz_id).subscribe({
        next: (res) => {
          const quiz = res.data;
          this.quiz.set({
            ...quiz,
            questions: [...(quiz.questions ?? [])].sort((a, b) => a.order - b.order),
          });
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);

          if (err instanceof ApiError) {
            this.loadError.set(err.response.error.message);
            return;
          }

          this.loadError.set('Failed to load quiz.');
        },
      }),
    );
  }

  startQuiz(): void {
    this.started.set(true);
    this.submitted.set(false);
    this.currentIndex.set(0);
    this.selectedAnswerIds.set({});
  }

  onSelectAnswer(answerId: string): void {
    const question = this.currentQuestion();
    if (!question || this.submitted()) {
      return;
    }

    this.selectedAnswerIds.update((selected) => ({
      ...selected,
      [question.id]: answerId,
    }));
  }

  nextQuestion(): void {
    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.update((index) => index + 1);
    }
  }

  previousQuestion(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((index) => index - 1);
    }
  }

  submitQuiz(): void {
    this.submitted.set(true);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
