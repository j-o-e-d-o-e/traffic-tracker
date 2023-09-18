import {Component, OnInit, ViewChild} from '@angular/core';
import {Year} from "../model/year.model";
import {environment} from "../../environments/environment";
import {DataService} from "../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartType} from "chart.js";
import {faPlane} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {
  planeIcon = faPlane;
  year: Year;
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
        data: Array(12),
        label: 'Absolute',
        yAxisID: 'left',
        fill: true,
      },
      {
        data: Array(12),
        label: 'Average',
        yAxisID: 'left',
        fill: false,
      }],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
    const year = this.route.snapshot.params['year'];
    const path = year ? '/years/' + year : '/years/current';
    this.service.fetch(environment.urlBase + path).subscribe({
      next: (year: any) => {
        this.setData(year);
        this.loading = false;
      },
      error: (message) => {
        this.error = true;
        this.errorMessage = message.error;
      }
    });
  }

  private setData(year: Year) {
    this.year = year;
    // console.log(this.year);
    for (let i = 0; i < this.chartData.datasets[0].data.length; i++) {
      this.chartData.datasets[0].data[i] = this.year.months[i];
    }
    for (let i = 0; i < this.chartData.datasets[1].data.length; i++) {
      this.chartData.datasets[1].data[i] = this.year.avg_flights[i];
    }
    this.chart?.update();
  }

  onPrev() {
    this.service.fetch(this.year._links.prev_year.href).subscribe(
      (year: any) => {
        this.setData(year);
        this.router.navigate(['/year', this.year.year]).catch();
      });
  }

  onNext() {
    this.service.fetch(this.year._links.next_year.href).subscribe(
      (year: any) => {
        this.setData(year);
        this.router.navigate(['/year', this.year.year]).catch();
      });
  }

  onMonths() {
    this.router.navigate(['/month', this.year.year, this.year.first_month]).catch();
  }

  checkSubHeadline() {
    return new Date(this.year.start_date) <= this.startDateDepartures &&
      this.startDateDepartures <= new Date(this.year.end_date);
  }

  protected readonly faPlane = faPlane;
}

