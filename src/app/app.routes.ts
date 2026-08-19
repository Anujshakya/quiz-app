import { Routes } from '@angular/router';
import { QuizComponent } from './components/pages/quiz/quiz.component';
import { QuizDetailComponent } from './components/features/quiz/quiz-detail/quiz-detail.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'quiz',
  },
  {
    path: 'quiz',
    title: 'Quiz',
    component: QuizComponent,
  },
  {
    path: 'quiz/:id',
    title: 'Quiz Detail',
    component: QuizDetailComponent,
  },
];
