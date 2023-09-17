import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {Apollo} from "apollo-angular";
import {Airport} from "../model/graphql/airport.model";
import {Page} from "../model/graphql/page.model";
import {FLIGHTS_FROM_AIRPORT} from "./query";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Flight} from "../model/graphql/flight.model";
import {PhotoComponent} from "../photo/photo.component";
import {environment} from "../../environments/environment";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {
  airport: Airport;
  page: Page;
  size = 20;
  @ViewChild('form')
  form: NgForm;
  loading = true;
  error = false;
  errorMessage: string;
  photoInfo = false;

  constructor(private client: Apollo, private route: ActivatedRoute, private router: Router,
              private modalService: NgbModal, private location: Location) {
  }

  ngOnInit() {
    this.sendQuery(this.route.snapshot.params['icao'], this.route.snapshot.params['page']);
  }

  private sendQuery(icao: string, page: number) {
    this.client.watchQuery<any>({
      query: FLIGHTS_FROM_AIRPORT,
      variables: {icao: icao, page: +page, size: this.size}
    }).valueChanges.subscribe({
      next: ({data, loading}) => {
        this.loading = loading;
        this.airport = data.departure;
        this.setData(data.departure.flights);
        this.router.navigate(['/airport', this.airport.icao, this.page.pageNumber]).catch();
      },
      error: (error: any) => {
        this.error = true;
        this.errorMessage = error.message;
      }
    });
  }

  private setData(page: Page) {
    this.page = page;
    // console.log(this.page);
    this.photoInfo = this.page.content.some(f => f.photo);
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
    this.sendQuery(this.airport.icao, 0);
  }
}
