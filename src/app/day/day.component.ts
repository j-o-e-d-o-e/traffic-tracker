import {Component, OnInit} from '@angular/core';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts';
import {DataService} from '../service/data.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Day} from '../model/day.model';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css', '../app.component.css']
})
export class DayComponent implements OnInit {
  chartType: ChartType = 'line';
  chartLabels: Label[] = [];
  chartData: ChartDataSets[];
  chartOptions: ChartOptions = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-left',
          position: 'left',
          type: 'linear',
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
        }
      ]
    }
  };
  day: Day;
  loading: boolean;
  error = false;
  errorMessage: string;
  startup: boolean;
  windDisplay: boolean;

  constructor(private service: DataService, private route: ActivatedRoute, private router: Router) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.loading = true;
    const date = this.route.snapshot.params.date;
    if (!date) {
      this.startup = true;
      this.service.fetch(environment.urlBase + '/days/current').subscribe(
        (day: Day) => {
          this.setData(day);
          this.loading = false;
          this.startup = false;
        },
        (message) => {
          this.error = true;
          this.errorMessage = message.error;
        });
    } else {
      this.service.fetch(environment.urlBase + '/days/' + date).subscribe(
        (day: Day) => {
          this.setData(day);
          this.loading = false;
        },
        (message) => {
          this.error = true;
          this.errorMessage = message.error;
        });
    }
    this.chartLabels = [];
    for (let i = 0; i < 24; i++) {
      this.chartLabels.push(i.toString() + ':00');
    }
  }

  setData(day: Day) {
    this.day = day;
    // console.log(this.day);
    this.chartData = [];
    this.chartData.push({data: this.day.hours_flight, label: 'Absolute', yAxisID: 'y-axis-left'});
    this.chartData.push({
      data: this.day.avg_flights,
      label: 'Average (5:45-23:00h)',
      yAxisID: 'y-axis-left',
      fill: false
    });
    if (this.day.hours_wind.some(i => i > 0)) {
      this.chartOptions.scales.yAxes.push(
        {
          id: 'y-axis-right',
          position: 'right',
          type: 'linear',
          ticks: {
            beginAtZero: true,
            // max: 400,
          },
          scaleLabel: {
            display: true,
            labelString: 'Wind degrees'
          }
        }
      );
      this.chartData.push({data: this.day.hours_wind, label: 'Wind direction', yAxisID: 'y-axis-right', fill: false});
      this.windDisplay = true;
    }
    this.windDisplay = false;
  }

  onPrev() {
    this.service.fetch(this.day._links.prev_day.href).subscribe(
      (day: Day) => {
        this.setData(day);
        this.router.navigate(['/day', this.day.date]).catch();
      });
  }

  onRefresh() {
    this.service.fetch(this.day._links.self.href).subscribe(
      (day: Day) => {
        this.setData(day);
      });
  }

  onNext() {
    this.service.fetch(this.day._links.next_day.href).subscribe(
      (day: Day) => {
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
