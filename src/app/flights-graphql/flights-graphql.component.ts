import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Apollo} from 'apollo-angular';
import {DataService} from '../service/data.service';
import {Page} from '../model/graphql/page.model';
import {FLIGHTS_BY_DATE} from './query';
import {NgForm} from '@angular/forms';
import {environment} from '../../environments/environment';


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
  departureInfo: boolean;
  error = false;
  errorMessage: string;
  @ViewChild('form')
  form: NgForm;

  constructor(private client: Apollo, private service: DataService,
              private route: ActivatedRoute, private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.departureInfo = false;
    this.date = this.route.snapshot.params.date;
    this.sendQuery(0);
  }

  private sendQuery(page: number) {
    const date = this.date;
    const size = this.size;
    const start = Date.now();
    this.client
      .query({
        query: FLIGHTS_BY_DATE,
        variables: {date, page, size}
      }).subscribe(({data, loading}) => {
        const responseTime = Date.now() - start;
        console.log('Response time: ' + responseTime + 'ms');
        this.loading = loading;
        // @ts-ignore
        this.setData(data.day.flights);
      },
      (error: any) => {
        this.error = true;
        this.errorMessage = error.message;
      });
  }

  private setData(page: Page) {
    this.page = page;
    // console.log(this.page);
    for (const flight of this.page.content) {
      if (flight.departure !== undefined) {
        this.departureInfo = true;
        break;
      }
    }
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

  onFetch() {
    let size = this.form.value.pageSize;
    if (size < 5) {
      size = 5;
    }
    if (size > environment.maxPageSize) {
      size = environment.maxPageSize;
    }
    this.size = size;
    this.sendQuery(0);
  }
}
