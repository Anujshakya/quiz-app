import { QuestionModel } from './question.model';

export interface QuizModel {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  topic: string;
  topicSlug: string;
  difficulty: string;
  tags: string[];
  questionCount: number;
  plays: number;
  slug: string | null;
  questions: QuestionModel[];
}
