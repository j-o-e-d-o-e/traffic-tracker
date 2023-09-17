import {Component, OnInit} from '@angular/core';
import {Stats} from "../model/stats.model";
import {environment} from "../../environments/environment";
import {DataService} from "../service/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  stats: Stats;
  loading = true;
  error = false;
  errorMessage: string;
  startDate: Date = new Date(environment.startYear, environment.startMonth - 1, environment.startDay);

  constructor(private service: DataService, private router: Router) {
  }

  ngOnInit() {
    this.service.fetch(environment.urlBase + '/stats').subscribe({
      next: (stats: any) => {
        this.setData(stats);
        this.loading = false;
      },
      error: (error) => {
        this.error = true;
        this.errorMessage = error.message;
      }
    });
  }

  private setData(stats: Stats) {
    this.stats = stats;
    // console.log(this.stats);
  }

  onDay(date: string) {
    this.router.navigate(['/day', date]).catch();
  }

  onPlane(icao: string) {
    this.router.navigate(['/plane', icao, 0]).catch();
  }
}
