import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../service/data.service';
import {environment} from '../../environments/environment';

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
  enabledDates: NgbDateStruct[] = [];

  constructor(private service: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.fetch(environment.urlBase + '/days').subscribe((dates: string[]) => {
      // console.log(dates);
      for (const d of dates) {
        const tmp = new Date(d);
        this.enabledDates.push(new NgbDate(tmp.getFullYear(), tmp.getMonth() + 1, tmp.getDate()));
      }
      const date = new Date(dates[dates.length - 1]);
      this.model = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
      this.maxDate = this.model;
      for (let i = environment.startYear; i <= date.getFullYear(); i++) {
        this.years.push(i);
      }
      this.loading = false;
    });
    this.loading = true;
  }

  isEnabled = (date: NgbDateStruct, current: { month: number, year: number }) => {
    return !this.enabledDates.find(displayed => NgbDate.from(displayed).equals(date));
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
