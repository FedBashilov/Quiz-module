import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { QuizPage } from './quiz.page';


import { QuestionComponent } from './question/question.component';

import { CommonQuizModule } from 'src/app/modules/common-quiz/common-quiz.module';


const routes: Routes = [
  {
    path: '',
    component: QuizPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CommonQuizModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuizPage, QuestionComponent]
})
export class QuizPageModule {}
