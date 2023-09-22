import {Component, OnInit, ViewChild} from '@angular/core';
import {Month} from "../model/month.model";
import {DataService} from "../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartType} from "chart.js";
import {faPlane} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {
  planeIcon = faPlane;
  month: Month;
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
        data: [],
        label: 'Absolute',
        yAxisID: 'left',
        fill: true,
      },
      {
        data: [],
        label: 'Average',
        yAxisID: 'left',
        fill: false,
      }],
    labels: []
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
    const params = this.route.snapshot.params;
    const path = params['year'] && params['month'] ? '/months/' + params['year'] + '/' + params['month'] : '/months/current';
    this.service.fetch(environment.urlBase + path).subscribe({
      next: (month: any) => {
        this.setData(month);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
        this.errorMessage = error.error;
      }
    });
  }

  private setData(month: Month) {
    this.month = month;
    // console.log(this.month);
    const monthLength = this.month.days.length;
    this.chartData.labels = Array(monthLength);
    const tmp = new Date(month.start_date);
    for (let i = 0; i < monthLength; i++) {
      this.chartData.labels[i] = tmp.toDateString().slice(0, 3) + tmp.toDateString().slice(7, 10);
      tmp.setDate(tmp.getDate() + 1);
    }
    this.chartData.datasets[0].data = Array(monthLength);
    for (let i = 0; i < this.chartData.datasets[0].data.length; i++) {
      this.chartData.datasets[0].data[i] = this.month.days[i];
    }
    this.chartData.datasets[1].data = Array(monthLength);
    for (let i = 0; i < this.chartData.datasets[1].data.length; i++) {
      this.chartData.datasets[1].data[i] = this.month.avg_flights[i];
    }
    this.chart?.update();
  }

  onPrev() {
    this.service.fetch(this.month._links.prev_month.href).subscribe(
      (month: any) => {
        this.setData(month);
        this.router.navigate(['/month', this.month.year, this.month.month]).catch();
      });
  }

  onNext() {
    this.service.fetch(this.month._links.next_month.href).subscribe(
      (month: any) => {
        this.setData(month);
        this.router.navigate(['/month', this.month.year, this.month.month]).catch();
      });
  }

  onWeeks() {
    this.router.navigate(['/week', this.month.first_week]).catch();
  }

  onYear() {
    this.router.navigate(['/year', this.month.year]).catch();
  }

  checkSubHeadline() {
    return new Date(this.month.start_date) <= this.startDateDepartures &&
      this.startDateDepartures <= new Date(this.month.end_date);
  }
}

