import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular'
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/models/quiz.model';
import { OnboardingService } from 'src/app/services/onboarding.service';

import { QuestionAnswers } from 'src/app/models/question-answers.model';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

//moving data
  public quiz: Quiz = new Quiz();
  public question_answers: QuestionAnswers = new QuestionAnswers();
  public cur_question: number = null;
  public cur_points: number = null;
  /////

  public listOfQuestionsId: Array<number>;
  public quizResualId: number;

  constructor(private quizService: QuizService, private navCtrl: NavController, private onBoardingService: OnboardingService ) {
  }

  ngOnInit() {
    this.onBoardingService.sendFilterData().subscribe(listOfQuizzes => {
      this.quizService.getQuizDTO(listOfQuizzes[0]);
      this.quiz = this.quizService.getQuizInfo();


      this.quizService.getQuizQuestionsId( this.quiz.quizId ).subscribe(listOfQuestionsId => {
        this.listOfQuestionsId = listOfQuestionsId;
        this.cur_question = this.quizService.getCurQuestion();
        this.cur_points = this.quizService.getCurPoints();

        this.quizService.getQuestionInfo( this.listOfQuestionsId[this.cur_question-1] ).subscribe( question_answers => {
          this.question_answers = question_answers;
          this.fillExtraQuestionText( this.question_answers.question.image );
        });
      });

      this.quizService.getQuizResualId(this.quiz.quizId).subscribe(quizResualId => {
        this.quizResualId = quizResualId;
      });
    });



    //points ring = 0%
    let progressValue: any = document.getElementsByClassName('progress_valueQ')[0];
    progressValue.style.strokeDasharray = 2 * Math.PI * 27;
    progressValue.style.strokeDashoffset = 2 * Math.PI * 27;
  }

  onChanged(isAble:boolean){
    let elem: any = document.getElementsByClassName("res_button")[0];

    if (isAble) {
      elem.classList.add("orange");
      elem.disabled = "false";
    } else {
      elem.classList.remove("orange");
      elem.disabled = "true";
    }
  }

  onNext(){
    //take answers id
    let allAnswers: any = document.getElementsByClassName("answer");
    let chosenAnswersId: Array<number> = new Array();
    for( let i = 0; i < allAnswers.length; i++){
      if(allAnswers[i].classList.contains("chosen")){
        chosenAnswersId.push(this.question_answers.answer[i].answerId);
      }
    }
    this.toNextQuestion(chosenAnswersId);
  }

  onSkip(){
    this.toNextQuestion([]);
  }

  toNextQuestion(chosenAnswersId: Array<number>){
    //disabling button
    let elem: any = document.getElementsByClassName("res_button")[0];
    elem.classList.remove("orange");
    elem.disabled = "true";

    //send Answers and Get Points
    this.quizService.sendAnswersGetPoints(this.quizResualId, this.listOfQuestionsId[this.cur_question-1], chosenAnswersId).subscribe( cur_points => {
      this.cur_points = cur_points;
      this.quizService.setCurPoints(this.cur_points);
      //filling circle
      let progressValue: any = document.getElementsByClassName('progress_valueQ')[0];
      let circumference = 2 * Math.PI * 27;
      let progress = this.cur_points / (this.quiz.questionAmount * 5);
      progressValue.style.strokeDashoffset = circumference * (1 - progress);

      //question last or not
      if(this.cur_question == this.quiz.questionAmount){
        this.navCtrl.navigateRoot('/result');
      } else {
        this.cur_question++;
        this.quizService.setCurQuestion(this.cur_question);

        this.quizService.getQuestionInfo(this.listOfQuestionsId[this.cur_question-1]).subscribe( question_answers => {
          this.question_answers = question_answers;
          this.fillExtraQuestionText( this.question_answers.question.image );
        });

        //get focus on question
        (<HTMLElement>document.getElementsByClassName("question")[0]).focus();
      }
    });
  }

  fillExtraQuestionText( htmlText: string ){
    let question: HTMLElement = <HTMLElement>document.getElementsByClassName("question")[0];
    let extraText: HTMLElement = <HTMLElement>document.getElementsByClassName("extra_q_text")[0];

    if(htmlText !== null){
      question.classList.remove("margin_bottom");
      extraText.style.display = "block";
      extraText.innerHTML = htmlText;
    } else {
      question.classList.add("margin_bottom");
      extraText.style.display = "none";
    }

  }



}
