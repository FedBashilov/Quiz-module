import { Question } from 'src/app/models/question.model';
import { Answer } from 'src/app/models/answer.model';

export class QuestionAnswers{
  public question: Question = new Question();
  public answer: Array<Answer> = new Array<Answer>();
}
