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

  constructor(private client: Apollo, private service: DataService,
              private route: ActivatedRoute, private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.date = this.route.snapshot.params.date;
    this.sendQuery(0);
  }

  private sendQuery(page: number) {
    const date = this.date;
    const size = this.size;
    const start = Date.now();
    this.client
      .query({
        query: GET_FLIGHTS_BY_DATE,
        variables: {date, page, size}
      }).subscribe(({data, loading}) => {
        const responseTime = Date.now() - start;
        console.log('Response time: ' + responseTime + 'ms');
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
    this.sendQuery(this.page.pageNumber - 1);
  }

  onNext() {
    this.sendQuery(this.page.pageNumber + 1);
  }

  onLast() {
    this.sendQuery(this.page.totalPages - 1);
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
    this.sendQuery(0);
  }
}
