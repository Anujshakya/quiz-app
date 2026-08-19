import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../../services/quiz.service';
import { Subscription } from 'rxjs';
import { QuizModel } from '../../../../models/quiz.model';
import { ApiError } from '../../../../models/common/api-response.model';

@Component({
  selector: 'app-quiz-detail',
  imports: [],
  templateUrl: './quiz-detail.component.html',
  styleUrl: './quiz-detail.component.css',
})
export class QuizDetailComponent implements OnInit {
  private sub: Subscription = new Subscription();

  quiz: QuizModel = {} as QuizModel;

  constructor(
    private _route: ActivatedRoute,
    private _quizService: QuizService,
  ) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    const quiz_id = this._route.snapshot.paramMap.get('id');

    if (typeof quiz_id !== 'string') {
      console.log('Error loading Quiz');
      return;
    }

    this.sub.add(
      this._quizService.getByUuid(quiz_id).subscribe({
        next: (res) => {
          this.quiz = res.data;
          console.log('Res: ', res);
          console.log('Quiz: ', this.quiz);
        },
        error: (err) => {
          if (err instanceof ApiError) {
            console.error(err.response.error.message);
            return;
          }

          console.error('Request failed', err);
        }
      })
    )

  }

}
