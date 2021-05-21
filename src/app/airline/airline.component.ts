import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Apollo} from 'apollo-angular';
import {FLIGHTS_BY_AIRLINE, FLIGHTS_BY_AIRLINE_INITIAL} from './query';
import {Page} from '../model/graphql/page.model';
import {Airline} from '../model/graphql/airline.model';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css', '../app.component.css']
})
export class AirlineComponent implements OnInit {
  airline: Airline;
  page: Page;
  loading: boolean;
  error = false;
  errorMessage: string;

  constructor(private client: Apollo, private route: ActivatedRoute,
              private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.sendFirstQuery(this.route.snapshot.params.icao, 0);
  }

  private sendFirstQuery(icao: string, page: number) {
    this.client
      .query({
        query: FLIGHTS_BY_AIRLINE_INITIAL,
        variables: {icao, page}
      }).subscribe(({data, loading}) => {
        this.loading = loading;
        // @ts-ignore
        this.airline = data.airline;
        // @ts-ignore
        this.setData(data.airline.flights);
      },
      (error: any) => {
        this.error = true;
        this.errorMessage = error.message;
      });
  }

  private sendQuery(icao: string, page: number) {
    this.client
      .query({
        query: FLIGHTS_BY_AIRLINE,
        variables: {icao, page}
      }).subscribe(({data, loading}) => {
        this.loading = loading;
        // @ts-ignore
        this.setData(data.airline.flights);
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
    this.sendQuery(this.airline.icao, this.page.pageNumber - 1);
  }

  onNext() {
    this.sendQuery(this.airline.icao, this.page.pageNumber + 1);
  }

  onLast() {
    this.sendQuery(this.airline.icao, this.page.totalPages - 1);
  }

  onBack() {
    this.location.back();
  }

  onDay(date: string) {
    this.router.navigate(['/day', date]).catch();
  }

  onAirport(icao: string) {
    this.router.navigate(['/airport', icao]).catch();
  }

  onPlane(icao: string) {
    this.router.navigate(['/plane', icao]).catch();
  }

  checkDate(date: string) {
    const flightDate = new Date(date).setHours(0, 0, 0, 0);
    return flightDate < new Date().setHours(0, 0, 0, 0);
  }
}
