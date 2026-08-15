import { Injectable } from '@angular/core';
import { HttpService } from './common/http.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends HttpService<any, any> {
  constructor() {
    super();
  }

  override getResourceUrl(): string {
    return "quizzes";
  }
}
