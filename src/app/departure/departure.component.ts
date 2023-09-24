import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {environment} from "../../environments/environment";
import {ChartData, ChartOptions, ChartType} from "chart.js";
import {KeyValue} from "../model/key-value.model";
import {Departure} from "../model/departure.model";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.css']
})
export class DepartureComponent implements OnInit, OnChanges {
  @Input()
  departures: Departure;
  @Input()
  airports: KeyValue[];
  @Input()
  subHeadline: boolean;
  @ViewChild(BaseChartDirective)
  chart?: BaseChartDirective;
  chartType: ChartType = 'pie';
  chartData: ChartData<'pie', number[], string> = {
    datasets: [
      {
        data: Array(4),
      },
    ],
    labels: Array(4),
  };
  chartOptions: ChartOptions = {responsive: true, maintainAspectRatio: false};
  startDateDepartures: Date = new Date(environment.departuresStartDate);

  constructor() {
  }

  ngOnInit() {
    this.setDepartures();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setDepartures();
  }

  setDepartures() {
    // console.log(this.departures);
    this.chartData.labels = [
      `Intercontinental (${this.departures.continental}%)`,
      `Europe (${this.departures.international}%)`,
      `National (${this.departures.national}%)`,
      `Unknown (${this.departures.unknown}%)`
    ];
    this.chartData.datasets[0].data = [
      this.departures.continental_abs,
      this.departures.international_abs,
      this.departures.national_abs,
      this.departures.unknown_abs
    ];
    this.chart?.update();
  }
}
