import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();

  constructor(private _quizService: QuizService) {}

  ngOnInit() {
    this.sub.add(
      this._quizService.getAll().subscribe((res) => {
        console.log('Quizzes: ', res);
      })
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
