import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VacanciesPage } from './vacancies.page';

import { VacanciesComponent } from './vacancies/vacancies.component';

const routes: Routes = [
  { path: '', component: VacanciesPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VacanciesPage, VacanciesComponent]
})
export class VacanciesPageModule {}
