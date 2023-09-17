import {Component, OnInit} from '@angular/core';
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../environments/environment";
import {DataService} from "../service/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  model: NgbDate;
  minDate: NgbDate = new NgbDate(environment.startYear, environment.startMonth, environment.startDay);
  maxDate: NgbDate;
  enabledDates: NgbDate[] = [];
  years: number[] = [];
  loading = true;
  error = false;
  errorMessage: string;

  constructor(private service: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.fetch(environment.urlBase + '/days').subscribe({
      next: (dates: any) => {
        for (const d of dates) {
          const tmp = new Date(d);
          this.enabledDates.push(new NgbDate(tmp.getFullYear(), tmp.getMonth() + 1, tmp.getDate()));
        }
        const latest = new Date(dates[dates.length - 1]);
        this.model = new NgbDate(latest.getFullYear(), latest.getMonth() + 1, latest.getDate());
        this.maxDate = this.model;
        for (let i = environment.startYear; i <= latest.getFullYear(); i++) {
          this.years.push(i);
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = true;
        this.errorMessage = error.message;
      }
    });
  }

  isEnabled = (current: NgbDate) => {
    return !this.enabledDates.find(d => d.equals(NgbDate.from(current)));
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
