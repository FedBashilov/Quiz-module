import { Component, Input, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/models/quiz.model';


@Component({
  selector: 'app-quiz-bar',
  templateUrl: './quiz-bar.component.html',
  styleUrls: ['./quiz-bar.component.scss'],
})
export class QuizBarComponent implements OnInit, OnChanges, AfterViewInit{

// from database
  @Input() public cur_question: number;
  @Input() public quiz: Quiz;
/////////
  Arr = Array;


  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.cur_question !== null){
      this.fillingLine();
    }
  }

  ngAfterViewInit(){
    if(this.cur_question !== null){
      this.fillingLine();
    }
  }

  fillingLine(){
    let segments: any = document.getElementsByClassName("barSegment");

    let full = Math.floor(this.cur_question / 10);
    let notFull = (this.cur_question % 10) / 10;
    let i = 0;
    //filling full segments
    for( ; i < full ; i++){
      segments[i].value = "1";
    }
    //filling not full segment
    if(this.cur_question !== this.quiz.questionAmount){
      segments[i].value = notFull;
      let track: HTMLElement = <HTMLElement>document.getElementsByClassName("track")[0];
      track.style.left = (this.cur_question / this.quiz.questionAmount) * 100 + "%";
    }
  }

}
