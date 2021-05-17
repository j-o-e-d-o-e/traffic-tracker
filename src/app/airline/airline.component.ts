import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Apollo} from 'apollo-angular';
import {DataService} from '../service/data.service';
import {Airline} from '../model/graphql/airline.model';
import {GET_FLIGHTS_OF_AIRLINE} from './query';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css', '../app.component.css']
})
export class AirlineComponent implements OnInit {
  airline: Airline;
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
        query: GET_FLIGHTS_OF_AIRLINE,
        variables: {icao, page}
      }).subscribe(({data, loading}) => {
        this.loading = loading;
        // @ts-ignore
        this.setData(data.airline);
      },
      (error: any) => {
        this.error = true;
        this.errorMessage = error.message;
      });
  }

  private setData(airline: Airline) {
    this.airline = airline;
    // console.log(this.airline);
    this.next = airline.flights.length === 20;
  }

  onPrev() {
    this.page--;
    if (this.page === 0) {
      this.prev = false;
    }
    this.sendQuery(this.airline.icao, this.page);
  }

  onNext() {
    this.page++;
    this.prev = true;
    this.sendQuery(this.airline.icao, this.page);
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
