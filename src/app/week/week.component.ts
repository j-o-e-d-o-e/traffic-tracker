import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartType} from "chart.js";
import {environment} from "../../environments/environment";
import {DataService} from "../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Week} from "../model/week.model";

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {
  week: Week;
  @ViewChild(BaseChartDirective)
  chart?: BaseChartDirective;
  chartType: ChartType = 'line';
  chartData: {
    datasets: ({
      data: number[];
      label: string;
      yAxisID: string;
      fill: boolean;
    })[];
    labels: string[]
  } = {
    datasets: [
      {
        data: Array(24),
        label: 'Absolute',
        yAxisID: 'left',
        fill: true,
      },
      {
        data: Array(24),
        label: 'Average',
        yAxisID: 'left',
        fill: false,
      }],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      left: {
        position: 'left',
        title: {
          display: true,
          text: 'Flights'
        },
        min: 0
      }
    },
  };
  loading = true;
  error = false;
  errorMessage: string;
  startDateDepartures: Date = new Date(environment.departuresStartDate);

  constructor(private service: DataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const date = this.route.snapshot.params['date'];
    const path = date ? '/weeks/' + date : '/weeks/current';
    this.service.fetch(environment.urlBase + path).subscribe({
      next: (week: any) => {
        this.setData(week);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
        this.errorMessage = error.error;
      }
    });
  }

  setData(week: Week) {
    this.week = week;
    // console.log(this.week);
    for (let i = 0; i < this.chartData.datasets[0].data.length; i++) {
      this.chartData.datasets[0].data[i] = this.week.weekdays[i];
    }
    for (let i = 0; i < this.chartData.datasets[1].data.length; i++) {
      this.chartData.datasets[1].data[i] = this.week.avg_flights[i];
    }
    this.chart?.update();
  }

  onPrev() {
    this.service.fetch(this.week._links.prev_week.href).subscribe(
      (week: any) => {
        this.setData(week);
        this.router.navigate(['/week', this.week.start_date]).catch();
      });
  }

  onNext() {
    this.service.fetch(this.week._links.next_week.href).subscribe(
      (week: any) => {
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
