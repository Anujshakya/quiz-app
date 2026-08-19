export interface QuestionModel {
  id: string;
  text: string;
  type: string;
  explanation: string;
  order: number;
  answers: AnswerModel[];
}

export interface AnswerModel {
  id: string;
  text: string;
  isCorrect: boolean;
}
