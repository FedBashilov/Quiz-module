import { Component, OnInit, AfterViewInit} from '@angular/core';
import { NavController } from '@ionic/angular'
import { QuizService } from 'src/app/services/quiz.service';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { Quiz } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit, AfterViewInit {

  public quiz: Quiz = new Quiz();
  public cur_points: number = null;
  public cur_question: number = null;

  public already_been: boolean = false;

  public isRed : boolean = false;
  public isBlue : boolean = false;
  public isGreen : boolean = false;


  constructor(private quizService: QuizService,  private navCtrl: NavController, private onBoardingService: OnboardingService ) {
  }

  ngOnInit() {
    this.quiz = this.quizService.getQuizInfo();
    this.cur_points = this.quizService.getCurPoints();
    this.cur_question = this.quizService.getCurQuestion();

    let rating: number = this.cur_points / (this.quiz.questionAmount * 5);
    if(rating < 1/3){
      this.isRed = true;
    }else if(rating < 2/3){
        this.isBlue = true;
      }else{
        this.isGreen = true;
    }
  }


  ngAfterViewInit(){
    //fulling progress line
    let segments: any = document.getElementsByClassName("barSegment");
    for(let i = 0 ; i < segments.length ; i++){
      segments[i].value = "1";
    }
  }

  onNext(){
    if(this.isGreen){
      this.navCtrl.navigateForward('/vacancies');
      this.already_been = true;
    }
    else{
      this.navCtrl.navigateRoot('/main-page');
    }
  }

}
