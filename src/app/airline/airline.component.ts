import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Apollo} from 'apollo-angular';
import {FLIGHTS_BY_AIRLINE} from './query';
import {Page} from '../model/graphql/page.model';
import {Airline} from '../model/graphql/airline.model';
import {Flight} from "../model/graphql/flight.model";
import {PhotoComponent} from "../photo/photo.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../environments/environment";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css', '../app.component.css']
})
export class AirlineComponent implements OnInit {
  airline: Airline;
  page: Page;
  size = 20;
  @ViewChild('form')
  form: NgForm;
  loading = true;
  error = false;
  errorMessage: string;
  departureInfo = false;
  photoInfo = false;

  constructor(private client: Apollo, private route: ActivatedRoute, private router: Router,
              private modalService: NgbModal, private location: Location) {
  }

  ngOnInit() {
    this.sendQuery(this.route.snapshot.params['icao'], this.route.snapshot.params['page']);
  }

  private sendQuery(icao: string, page: number) {
    this.client.watchQuery<any>({
      query: FLIGHTS_BY_AIRLINE,
      variables: {icao, page: +page, size: this.size}
    }).valueChanges.subscribe({
      next: ({data, loading}) => {
        this.loading = loading;
        this.airline = data.airline;
        this.setData(data.airline.flights);
        this.router.navigate(['/airline', this.airline.icao, this.page.pageNumber]).catch();
      },
      error: (error: any) => {
        this.loading = false;
        this.error = true;
        this.errorMessage = error.message;
      }
    });
  }

  private setData(page: Page) {
    this.page = page;
    // console.log(this.page);
    this.departureInfo = false;
    this.photoInfo = this.page.content.some(f => f.photo);
    for (const flight of this.page.content) {
      if (flight.departure !== undefined) {
        this.departureInfo = true;
        break;
      }
    }
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
    this.router.navigate(['/airport', icao, 0]).catch();
  }

  onPlane(icao: string) {
    this.router.navigate(['/plane', icao, 0]).catch();
  }

  onPhoto(flight: Flight) {
    const modalRef = this.modalService.open(PhotoComponent);
    modalRef.componentInstance.flight = {
      callsign: flight.callsign,
      date: flight.date,
      time: flight.time,
      photo_url: flight.photo
    };
  }

  onFetch() {
    let size = this.form.value.pageSize;
    if (size > environment.maxPageSize) size = environment.maxPageSize;
    else if (size < 5) size = 5;
    this.size = size;
    this.sendQuery(this.airline.icao, 0);
  }
}
