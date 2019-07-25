import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


import { QuizPage } from './quiz/quiz.page';
import { CommonQuizModule } from 'src/app/modules/common-quiz/common-quiz.module';



@NgModule({
  declarations: [QuizPage],
  imports: [
    IonicModule,
    CommonModule,
    CommonQuizModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuizPage  //ааааааааааааааааа!!!!!!!
      }
    ])
  ],
  exports: []
})
export class AllQuizModule { }
