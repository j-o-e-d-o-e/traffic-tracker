import {Component, OnInit} from '@angular/core';
import {DataService} from '../service/data.service';
import {environment} from '../../environments/environment';
import {ForecastDay} from '../model/forecast.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css', '../app.component.css']
})
export class ForecastComponent implements OnInit {
  url: string = environment.urlBase + '/forecasts';
  forecasts: ForecastDay[];
  active: boolean;

  constructor(private service: DataService) {
  }

  ngOnInit() {
    this.service.fetch(this.url).subscribe((forecasts: ForecastDay[]) => {
      this.setData(forecasts);
      this.active = true;
    });
  }

  setData(forecasts: ForecastDay[]) {
    this.forecasts = forecasts;
    // console.log(this.forecast);
  }
}
