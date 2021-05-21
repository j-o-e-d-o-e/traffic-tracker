import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Apollo} from 'apollo-angular';
import {DataService} from '../service/data.service';
import {GET_FLIGHTS_BY_PLANE} from './query';
import {Page} from '../model/graphql/page.model';

@Component({
  selector: 'app-plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.css', '../app.component.css']
})
export class PlaneComponent implements OnInit {
  icao: string;
  page: Page;
  loading: boolean;
  error = false;
  errorMessage: string;

  constructor(private client: Apollo, private service: DataService,
              private route: ActivatedRoute, private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.icao = this.route.snapshot.params.icao;
    this.sendQuery(this.icao, 0);
  }

  private sendQuery(icao: string, page: number) {
    this.client
      .query({
        query: GET_FLIGHTS_BY_PLANE,
        variables: {icao, page}
      }).subscribe(({data, loading}) => {
        this.loading = loading;
        // @ts-ignore
        this.setData(data.plane.flights);
      },
      (error: any) => {
        this.error = true;
        this.errorMessage = error.message;
      });
  }

  private setData(page: Page) {
    this.page = page;
    // console.log(this.page);
  }

  onPrev() {
    this.sendQuery(this.icao, this.page.pageNumber - 1);
  }

  onNext() {
    this.sendQuery(this.icao, this.page.pageNumber + 1);
  }

  onLast() {
    this.sendQuery(this.icao, this.page.totalPages - 1);
  }

  onBack() {
    this.location.back();
  }

  onDay(date: string) {
    this.router.navigate(['/day', date]).catch();
  }

  onAirline(icao: string) {
    this.router.navigate(['/airline', icao]).catch();
  }

  onAirport(icao: string) {
    this.router.navigate(['/airport', icao]).catch();
  }

  checkDate(date: string) {
    const flightDate = new Date(date).setHours(0, 0, 0, 0);
    return flightDate < new Date().setHours(0, 0, 0, 0);
  }
}
