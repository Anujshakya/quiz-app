import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizService } from '../../../services/quiz.service';
import { QuizCard } from './quiz-card/quiz-card';
import { QuizModel } from '../../../models/quiz.model';

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
    this.sub.add(
      this.quizService.getAll().subscribe((res) => {

        // TODO: bypass the Success and Error response in subscription
        if (res.success) {
          console.log(res);

          this.quizzes = res.data;
          console.log(this.quizzes);
        } else {
          console.log('Error occurred!')
        }
      }),
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
