import { Injectable } from '@angular/core';
import { HttpService } from './common/http.service';
import { QuizModel } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService extends HttpService<QuizModel, QuizModel> {
  constructor() {
    super();
  }

  override getResourceUrl(): string {
    return 'quizzes';
  }
}
