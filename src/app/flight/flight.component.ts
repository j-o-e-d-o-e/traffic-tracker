import {Component, OnInit, ViewChild} from '@angular/core';
import {Page} from "../model/graphql/page.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Apollo} from "apollo-angular";
import {FLIGHTS_BY_DATE} from "./query";
import {environment} from "../../environments/environment";
import {NgForm} from "@angular/forms";
import {Flight} from "../model/graphql/flight.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PhotoComponent} from "../photo/photo.component";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  date: string;
  page: Page;
  size = 20;
  @ViewChild('form')
  form: NgForm;
  loading = true;
  error = false;
  errorMessage: string;
  departureInfo = false;
  photoInfo = false;

  constructor(private client: Apollo, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.date = this.route.snapshot.params['date'];
    this.sendQuery(this.route.snapshot.params['page']);
  }

  private sendQuery(page: number) {
    this.client.watchQuery<any>({
      query: FLIGHTS_BY_DATE,
      variables: {date: this.date, page: +page, size: this.size}
    }).valueChanges.subscribe({
      next: ({data, loading}) => {
        this.loading = loading;
        this.setData(data.day.flights);
        this.router.navigate(['/flights', this.date, this.page.pageNumber]).catch();
      },
      error: (error: any) => {
        this.error = true;
        this.errorMessage = error.message;
      }
    });
  }

  private setData(page: any) {
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
    this.router.navigate(['/airline', icao, 0]).catch();
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
      date: this.date,
      time: flight.time,
      photo_url: flight.photo
    };
  }

  onFetch() {
    let size = this.form.value.pageSize;
    if (size > environment.maxPageSize) size = environment.maxPageSize;
    else if (size < 5) size = 5;
    this.size = size;
    this.sendQuery(0);
  }
}
