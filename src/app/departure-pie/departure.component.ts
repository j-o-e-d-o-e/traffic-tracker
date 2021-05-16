import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, SingleDataSet} from 'ng2-charts';
import {KeyValue} from '../model/key-value.model';
import {Departure} from '../model/departure.model';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-airports',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.css', '../app.component.css']
})
export class DepartureComponent implements OnInit, OnChanges {
  @Input()
  departures: Departure;
  @Input()
  airports: KeyValue[];
  @Input()
  subHeadline: boolean;
  startDateDepartures: Date = new Date(environment.departuresStartDate);
  pieChartOptions: ChartOptions = {responsive: true};
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;

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
    this.pieChartData = [
      this.departures.continental_abs,
      this.departures.international_abs,
      this.departures.national_abs,
      this.departures.unknown_abs
    ];
    this.pieChartLabels = [
      'Intercontinental (' + this.departures.continental + '%)',
      'Europe (' + this.departures.international + '%)',
      'National (' + this.departures.national + '%)',
      'Unknown (' + this.departures.unknown + '%)'
    ];
  }
}
