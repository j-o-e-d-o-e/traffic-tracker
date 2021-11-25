import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../service/data.service';
import {environment} from '../../environments/environment';
import {Day} from '../model/day.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {
  model: NgbDate;
  minDate: NgbDate = new NgbDate(environment.startYear, environment.startMonth, environment.startDay);
  maxDate: NgbDate;
  startDepartures: Date = new Date(environment.departuresStartDate);
  years = [];
  loading: boolean;

  constructor(private service: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.fetch(environment.urlBase + '/days/current').subscribe((day: Day) => {
      const date = new Date(day.date);
      this.model = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
      this.maxDate = this.model;
      for (let i = environment.startYear; i <= date.getFullYear(); i++) {
        this.years.push(i);
      }
      this.loading = false;
    });
    this.loading = true;
  }

  onDay() {
    const date = this.model.year + '-'
      + ('0' + this.model.month).slice(-2) + '-'
      + ('0' + this.model.day).slice(-2);
    this.router.navigate(['/day', date]).catch();
  }

  onYear(year: number) {
    this.router.navigate(['/year', year]).catch();
  }
}
