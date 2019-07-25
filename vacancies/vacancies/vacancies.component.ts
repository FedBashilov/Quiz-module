import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss'],
})
export class VacanciesComponent implements OnInit {
  slideOpts = {
    spaceBetween: -20,
    speed: 1000,
  };

  @Input() public vacancies : Array<string>;

  constructor() { }

  ngOnInit() {}


}
