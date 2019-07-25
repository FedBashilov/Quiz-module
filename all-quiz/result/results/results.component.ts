import { Component, Input, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {

  public quiz: Quiz = new Quiz();
  public cur_points: number = null;

  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
    this.quiz = this.quizService.getQuizInfo();
    this.cur_points = this.quizService.getCurPoints();

    // result ring = 0%
    let progressValue: any = document.getElementsByClassName('progress_valueR')[0];
    progressValue.style.strokeDasharray = 2 * Math.PI * 110;
    progressValue.style.strokeDashoffset = 2 * Math.PI * 110;
    // filling result ring (with timeout)
    setTimeout( () => {
      let progressValue: any = document.getElementsByClassName('progress_valueR')[0];
      let circumference = 2 * Math.PI * 110;
      let progress = this.cur_points / (this.quiz.questionAmount * 5);
        progressValue.style.strokeDashoffset = circumference * (1 - progress);
    }, 300);
  }

}
