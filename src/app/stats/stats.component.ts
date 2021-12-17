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

  onDay(s: string) {
    let day: string;
    let month: string;
    if (s[2].toString().length === 1) {
      day = '0' + s[2];
    } else {
      day = s[2];
    }
    if (s[1].toString().length === 1) {
      month = '0' + s[1];
    } else {
      month = s[1];
    }
    const date: string = s[0] + '-' + month + '-' + day;
    // console.log(date);
    this.router.navigate(['/day', date]).catch();
  }

  onIcao(icao: string) {
    this.router.navigate(['/plane', icao, 0]).catch();
  }
}
