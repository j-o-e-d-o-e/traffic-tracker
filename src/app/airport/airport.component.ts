import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Apollo} from 'apollo-angular';
import {FLIGHTS_FROM_AIRPORT, FLIGHTS_FROM_AIRPORT_INITIAL} from './query';
import {Airport} from '../model/graphql/airport.model';
import {Page} from '../model/graphql/page.model';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css', '../app.component.css']
})
export class AirportComponent implements OnInit {
  airport: Airport;
  page: Page;
  loading: boolean;
  error = false;
  errorMessage: string;

  constructor(private client: Apollo, private route: ActivatedRoute,
              private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.sendFirstQuery(this.route.snapshot.params.icao, this.route.snapshot.params.page);
  }

  private sendFirstQuery(icao: string, page: number) {
    this.client
      .query({
        query: FLIGHTS_FROM_AIRPORT_INITIAL,
        variables: {icao, page}
      }).subscribe(({data, loading}) => {
        this.loading = loading;
        // @ts-ignore
        this.airport = data.departure;
        // @ts-ignore
        this.setData(data.departure.flights);
        this.router.navigate(['/airport', this.airport.icao, this.page.pageNumber]).catch();
      },
      (error: any) => {
        this.error = true;
        this.errorMessage = error.message;
      });
  }

  private sendQuery(icao: string, page: number) {
    const start = Date.now();
    this.client
      .query({
        query: FLIGHTS_FROM_AIRPORT,
        variables: {icao, page}
      }).subscribe(({data, loading}) => {
        console.log('Response: ' + (Date.now() - start) + ' ms');
        this.loading = loading;
        // @ts-ignore
        this.setData(data.departure.flights);
        this.router.navigate(['/airport', this.airport.icao, this.page.pageNumber]).catch();
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
    this.sendQuery(this.airport.icao, this.page.pageNumber - 1);
  }

  onNext() {
    this.sendQuery(this.airport.icao, this.page.pageNumber + 1);
  }

  onLast() {
    this.sendQuery(this.airport.icao, this.page.totalPages - 1);
  }

  onBack() {
    this.location.back();
  }

  onDay(date: string) {
    this.router.navigate(['/day', date]).catch();
  }

  onAirline(icao: string) {
    this.router.navigate(['/airline', icao, 0]).catch();
  }

  onPlane(icao: string) {
    this.router.navigate(['/plane', icao, 0]).catch();
  }
}
