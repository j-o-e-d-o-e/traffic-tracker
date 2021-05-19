import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Apollo} from 'apollo-angular';
import {DataService} from '../service/data.service';
import {GET_FLIGHTS_BY_DATE} from './query';
import {Page} from '../model/graphql/page.model';

@Component({
  selector: 'app-airline',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css', '../app.component.css']
})
export class FlightsComponent implements OnInit {
  date: string;
  page: Page;
  loading: boolean;
  error = false;
  errorMessage: string;

  constructor(private client: Apollo, private service: DataService,
              private route: ActivatedRoute, private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.date = this.route.snapshot.params.date;
    this.sendQuery(this.date, 0);
  }

  private sendQuery(date: string, page: number) {
    this.client
      .query({
        query: GET_FLIGHTS_BY_DATE,
        variables: {date, page}
      }).subscribe(({data, loading}) => {
        this.loading = loading;
        // @ts-ignore
        this.setData(data.flightsByAirline);
      },
      (error: any) => {
        this.error = true;
        this.errorMessage = error.message;
      });
  }

  private setData(page: Page) {
    this.page = page;
    console.log(this.page);
  }

  onPrev() {
    this.sendQuery(this.date, this.page.pageNumber - 1);
  }

  onNext() {
    this.sendQuery(this.date, this.page.pageNumber + 1);
  }

  onLast() {
    this.sendQuery(this.date, this.page.totalPages - 1);
  }

  onDay() {
    this.router.navigate(['/day', this.date]).catch();
  }

  onAirline(icao: string) {
    this.router.navigate(['/airline', icao]).catch();
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
