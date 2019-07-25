import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/models/quiz.model';
import { QuestionAnswers } from 'src/app/models/question-answers.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {

  public Arr = Array;
  public abcd = Array('a','b','c','d','e','f','g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');


  @Output() onChanged = new EventEmitter<boolean>();


//from database
  @Input() public question_answers: QuestionAnswers;
//from services
  @Input() public cur_question: number;
////////


  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
  }

  change(isAble:boolean) {
      this.onChanged.emit(isAble);
  }

  onChoose(event){
    let elem = event.currentTarget;

    //make choose visual effects
    if(elem.firstChild.firstChild.classList.contains("orange")){
      elem.classList.remove("chosen");
      elem.firstChild.firstChild.classList.remove("orange");
      elem.lastChild.style.fontWeight = "normal";
    } else {
      elem.classList.add("chosen");
      elem.firstChild.firstChild.classList.add("orange");
      elem.lastChild.style.fontWeight = "bold";
    }

    //next button able or not
    if( (document.getElementsByClassName("chosen")).length > 0 ){
      this.change(true);
    } else {
      this.change(false);
    }
  }


}
