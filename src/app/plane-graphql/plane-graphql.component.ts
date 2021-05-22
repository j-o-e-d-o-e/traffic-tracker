import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Apollo} from 'apollo-angular';
import {DataService} from '../service/data.service';
import {GET_FLIGHTS_BY_PLANE} from './query';
import {Page} from '../model/graphql/page.model';
import {environment} from '../../environments/environment';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-plane-graphql',
  templateUrl: './plane-graphql.component.html',
  styleUrls: ['./plane-graphql.component.css', '../app.component.css']
})
export class PlaneGraphqlComponent implements OnInit {
  icao: string;
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
    this.icao = this.route.snapshot.params.icao;
    this.sendQuery(0);
  }

  private sendQuery(page: number) {
    const icao = this.icao;
    const size = this.size;
    const start = Date.now();
    this.client
      .query({
        query: GET_FLIGHTS_BY_PLANE,
        variables: {icao, page, size}
      }).subscribe(({data, loading}) => {
        const responseTime = Date.now() - start;
        console.log('Response time: ' + responseTime + 'ms');
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
    this.sendQuery(this.page.pageNumber - 1);
  }

  onNext() {
    this.sendQuery(this.page.pageNumber + 1);
  }

  onLast() {
    this.sendQuery(this.page.totalPages - 1);
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
