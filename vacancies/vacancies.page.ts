import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'
import {QuizService} from '../../services/quiz.service';
import {Quiz} from '../../models/quiz.model';

@Component({
  selector: 'app-vacancies-page',
  templateUrl: './vacancies.page.html',
  styleUrls: ['./vacancies.page.scss'],
})
export class VacanciesPage implements OnInit {

  public vacancies: Array<string> = ["Python (Junior)", "Python (Middle)", "Python (Senior)"];

  public quiz: Quiz = new Quiz();
  public already_been: boolean = false;


  constructor(private quizService: QuizService, private navCtrl: NavController ) {
    this.quiz = this.quizService.getQuizInfo();
  }

  ngOnInit() {
  }
}
