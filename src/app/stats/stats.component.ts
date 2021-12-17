import {Component, OnInit} from '@angular/core';
import {DataService} from '../service/data.service';
import {Stats} from '../model/stats.model';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css', '../app.component.css']
})
export class StatsComponent implements OnInit {
  stats: Stats;
  startDate: Date = new Date(environment.startYear, environment.startMonth - 1, environment.startDay);
  active: boolean;

  constructor(private service: DataService, private router: Router) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.service.fetch(environment.urlBase + '/stats').subscribe((stats: Stats) => {
      this.setData(stats);
      this.active = true;
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
