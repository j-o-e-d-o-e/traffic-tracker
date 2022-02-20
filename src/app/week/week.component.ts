import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts';
import {DataService} from '../service/data.service';
import {Week} from '../model/week.model';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css', '../app.component.css']
})
export class WeekComponent implements OnInit {
  chartType: ChartType = 'line';
  chartLabels: Label[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  chartData: ChartDataSets[];
  chartOptions: ChartOptions = {
    scales: {
      yAxes: [{
        position: 'left',
        ticks: {
          beginAtZero: true,
          callback: (value: number) => {
            if (value % 1 === 0) {
              return value;
            }
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'Flights'
        }
      }]
    }
  };
  week: Week;
  startDateDepartures: Date = new Date(environment.departuresStartDate);
  loading: boolean;
  error = false;
  errorMessage: string;

  constructor(private service: DataService, private route: ActivatedRoute, private router: Router) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.loading = true;
    const date = this.route.snapshot.params.date;
    const path = date ? '/weeks' + date : '/weeks/current';
    this.service.fetch(environment.urlBase + path).subscribe(
      (week: Week) => {
        this.setData(week);
        this.loading = false;
      },
      (message) => {
        this.error = true;
        this.errorMessage = message.error;
      });
  }

  setData(week: Week) {
    this.week = week;
    // console.log(this.week);
    this.chartData = [];
    this.chartData.push({data: this.week.weekdays, label: 'Absolute'});
    this.chartData.push({data: this.week.avg_flights, label: 'Average', type: 'line', fill: false});
  }

  onPrev() {
    this.service.fetch(this.week._links.prev_week.href).subscribe(
      (week: Week) => {
        this.setData(week);
        this.router.navigate(['/week', this.week.start_date]).catch();
      });
  }

  onRefresh() {
    this.service.fetch(this.week._links.self.href).subscribe(
      (week: Week) => {
        this.setData(week);
      });
  }

  onNext() {
    this.service.fetch(this.week._links.next_week.href).subscribe(
      (week: Week) => {
        this.setData(week);
        this.router.navigate(['/week', this.week.start_date]).catch();
      });
  }

  onMonth() {
    this.router.navigate(['/month', this.week.year, this.week.month]).catch();
  }

  onDays() {
    this.router.navigate(['/day', this.week.first_day]).catch();
  }

  checkSubHeadline() {
    return new Date(this.week.start_date) <= this.startDateDepartures &&
      this.startDateDepartures <= new Date(this.week.end_date);
  }
}
