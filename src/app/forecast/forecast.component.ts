import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {ForecastDay} from "../model/forecast.model";
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  forecasts: ForecastDay[];
  loading = true;
  error = false;
  errorMessage: string;

  constructor(private service: DataService) {
  }

  ngOnInit() {
    this.service.fetch(environment.urlBase + '/forecasts').subscribe({
      next: (forecasts: any) => {
        this.setData(forecasts);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
        this.errorMessage = error.error;
      }
    });
  }

  setData(forecasts: ForecastDay[]) {
    this.forecasts = forecasts;
    // console.log(this.forecast);
  }
}

