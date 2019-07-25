import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { API } from 'src/app/constants/api.const';
import { Quiz }  from '../models/quiz.model';



@Injectable({
  providedIn: 'root'
})
export class QuizService {

//from database
  public cur_question: number = null;
  public cur_points: number = null;
  public quiz: Quiz = new Quiz();
  public listOfQuestionsId: Array<number>;
  public quizResualId: number;


  constructor(private httpClient: HttpClient, private cookie: CookieService) { }

  public getQuizDTO(quizDTO: Quiz){
    this.quiz = quizDTO;
    this.cur_question = 1;
    this.cur_points = 0;
  }

//database requests

  public getQuizQuestionsId(quizId: number): Observable<any> {
    return this.httpClient.get(API.httpProtocol + API.serverIp + '/api/quizzes/questions/' + quizId);
  }

  public getQuestionInfo(questionId: number): Observable<any> {
    return this.httpClient.get(API.httpProtocol + API.serverIp + '/api/quizzes/question-data/' + questionId);
  }

  public getQuizResualId(quizId: number): Observable<any> {
    return this.httpClient.post(API.httpProtocol + API.serverIp + '/api/quizzes/results', { userId: this.cookie.get('user_id'), quizId: quizId });
  }

  public sendAnswersGetPoints(quizResualtId: number, questionId: number, answersId: Array<number>): Observable<any> {
    return this.httpClient.put(API.httpProtocol + API.serverIp + '/api/results/' + quizResualtId, { questionId: questionId, answersId: answersId });
  }


//get from service

  public getQuizInfo(){
    return this.quiz;
  }
  public getCurQuestion(){
    return this.cur_question;
  }
  public getCurPoints(){
    return this.cur_points;
  }

//set inside service

  public setCurPoints(x:number){
    this.cur_points = x;
  }
  public setCurQuestion(x:number){
    this.cur_question = x;
  }

}
