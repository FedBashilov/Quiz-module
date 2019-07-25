import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResultPage } from './result.page';

import { ResultsComponent } from './results/results.component';

import { CommonQuizModule } from 'src/app/modules/common-quiz/common-quiz.module';


const routes: Routes = [
  { path: '', component: ResultPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonQuizModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResultPage, ResultsComponent]
})
export class ResultPageModule {}
