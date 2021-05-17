import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Apollo} from 'apollo-angular';
import {DataService} from '../service/data.service';
import {GET_FLIGHTS_OF_AIRPORT} from './query';
import {Airport} from '../model/graphql/airport.model';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css', '../app.component.css']
})
export class AirportComponent implements OnInit {
  airport: Airport;
  page = 0;
  prev = false;
  next: boolean;
  loading: boolean;
  error = false;
  errorMessage: string;

  constructor(private client: Apollo, private service: DataService,
              private route: ActivatedRoute, private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.sendQuery(this.route.snapshot.params.icao, this.page);
  }

  private sendQuery(icao: string, page: number) {
    this.client
      .query({
        query: GET_FLIGHTS_OF_AIRPORT,
        variables: {icao, page}
      }).subscribe(({data, loading}) => {
        this.loading = loading;
        // @ts-ignore
        this.setData(data.departure);
      },
      (error: any) => {
        this.error = true;
        this.errorMessage = error.message;
      });
  }

  private setData(airport: Airport) {
    this.airport = airport;
    // console.log(this.airport);
    this.next = airport.flights.length === 20;
  }

  onPrev() {
    this.page--;
    if (this.page === 0) {
      this.prev = false;
    }
    this.sendQuery(this.airport.icao, this.page);
  }

  onNext() {
    this.page++;
    this.prev = true;
    this.sendQuery(this.airport.icao, this.page);
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

  onPlane(icao: string) {
    this.router.navigate(['/plane', icao]).catch();
  }
}
