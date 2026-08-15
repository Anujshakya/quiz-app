import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  quizzes: any[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.sub.add(
      this.quizService.getAll().subscribe((res) => {
        console.log(res);

        this.quizzes = res.data;
        console.log(this.quizzes);
      }),
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
