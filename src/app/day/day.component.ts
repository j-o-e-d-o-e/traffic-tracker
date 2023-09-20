import {Component, OnInit, ViewChild} from '@angular/core';
import {Day} from "../model/day.model";
import {DataService} from "../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ChartConfiguration, ChartType} from "chart.js";
import {environment} from "../../environments/environment";
import {faPlane} from '@fortawesome/free-solid-svg-icons';
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  day: Day;
  planeIcon = faPlane;
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
      },
      {
        data: Array(24),
        label: 'Wind direction',
        yAxisID: 'right',
        fill: false,
      },
    ],
    labels: Array(24),
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
      },
      right: {
        position: 'right',
        title: {
          display: true,
          text: 'Wind degrees'
        },
        min: 0,
        max: 360,
        grid: {
          drawOnChartArea: false,
        }
      }
    },
  };
  loading = true;
  error = false;
  errorMessage: string;
  windDisplay = true;

  constructor(private service: DataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const date = this.route.snapshot.params['date'];
    const path = date ? '/days/' + date : '/days/current';
    this.service.fetch(environment.urlBase + path).subscribe({
      next: (day: any) => {
        this.setData(day);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
        this.errorMessage = error.message;
      }
    });
    for (let i = 0; i < this.chartData.labels.length; i++) {
      this.chartData.labels[i] = i.toString() + ':00';
    }
  }

  setData(day: Day) {
    this.day = day;
    // console.log(this.day);
    for (let i = 0; i < this.chartData.datasets[0].data.length; i++) {
      this.chartData.datasets[0].data[i] = this.day.hours_flight[i];
    }
    for (let i = 0; i < this.chartData.datasets[1].data.length; i++) {
      this.chartData.datasets[1].data[i] = this.day.avg_flights[i];
    }
    if (this.day.hours_wind.some(w => w > 0)) {
      for (let i = 0; i < this.chartData.datasets[2].data.length; i++) {
        this.chartData.datasets[2].data[i] = this.day.hours_wind[i];
      }
    } else {
      this.windDisplay = false;
      this.chart?.hideDataset(2, true);
    }
    this.chart?.update();
  }

  onPrev() {
    this.service.fetch(this.day._links.prev_day.href).subscribe(
      (day: any) => {
        this.setData(day);
        this.router.navigate(['/day', this.day.date]).catch();
      });
  }

  onNext() {
    this.service.fetch(this.day._links.next_day.href).subscribe(
      (day: any) => {
        this.setData(day);
        this.router.navigate(['/day', this.day.date]).catch();
      });
  }

  onFlights() {
    this.router.navigate(['/flights', this.day.date, 0]).catch();
  }

  onWeek() {
    this.router.navigate(['/week', this.day.date]).catch();
  }
}

