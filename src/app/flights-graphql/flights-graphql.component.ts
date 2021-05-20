import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Apollo} from 'apollo-angular';
import {DataService} from '../service/data.service';
import {Page} from '../model/graphql/page.model';
import {GET_FLIGHTS_BY_DATE} from './query';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-flights-graphql',
  templateUrl: './flights-graphql.component.html',
  styleUrls: ['./flights-graphql.component.css', '../app.component.css']
})
export class FlightsGraphqlComponent implements OnInit {
  date: string;
  page: Page;
  size = 20;
  loading: boolean;
  error = false;
  errorMessage: string;
  @ViewChild('form')
  form: NgForm;
  responseTime: number;

  constructor(private client: Apollo, private service: DataService,
              private route: ActivatedRoute, private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.date = this.route.snapshot.params.date;
    this.sendQuery(this.date, 0, this.size);
  }

  private sendQuery(date: string, page: number, size: number) {
    const start = Date.now();
    this.client
      .query({
        query: GET_FLIGHTS_BY_DATE,
        variables: {date, page, size}
      }).subscribe(({data, loading}) => {
        this.responseTime = Date.now() - start;
        this.loading = loading;
        // @ts-ignore
        this.setData(data.flightsByDate);
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
    this.sendQuery(this.date, this.page.pageNumber - 1, this.size);
  }

  onNext() {
    this.sendQuery(this.date, this.page.pageNumber + 1, this.size);
  }

  onLast() {
    this.sendQuery(this.date, this.page.totalPages - 1, this.size);
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

  onFetch() {
    this.size = this.form.value.pageSize;
    this.sendQuery(this.date, 0, this.size);
  }
}
