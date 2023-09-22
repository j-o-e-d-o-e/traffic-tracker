import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {environment} from "../../environments/environment";
import {NgForm} from "@angular/forms";
import {Page} from "../model/graphql/page.model";
import {Apollo} from "apollo-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../service/data.service";
import {FLIGHTS_BY_PLANE} from "./query";
import {Flight} from "../model/graphql/flight.model";
import {PhotoComponent} from "../photo/photo.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GraphQLError} from "graphql/error";

@Component({
  selector: 'app-plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.css']
})
export class PlaneComponent implements OnInit {
  icao: string;
  page: Page;
  size = 20;
  @ViewChild('form')
  form: NgForm;
  loading = true;
  error = false;
  errorMessage: string;
  departureInfo = false
  photoInfo = false;

  constructor(private client: Apollo, private service: DataService, private route: ActivatedRoute,
              private modalService: NgbModal, private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.icao = this.route.snapshot.params['icao'];
    this.sendQuery(this.route.snapshot.params['page']);
  }

  private sendQuery(page: number) {
    this.client.watchQuery<any>({
      query: FLIGHTS_BY_PLANE,
      variables: {icao: this.icao, page: +page, size: this.size}
    }).valueChanges.subscribe({
      next: ({data, loading}) => {
        this.loading = loading;
        this.setData(data.plane.flights);
        this.router.navigate(['/plane', this.icao, this.page.pageNumber]).catch();
      },
      error: (error: GraphQLError) => {
        this.loading = false;
        this.error = true;
        this.errorMessage = error.message;
      }
    });
  }

  private setData(page: Page) {
    this.page = page;
    // console.log(this.page);
    this.photoInfo = this.page.content.some(f => f.photo);
    this.departureInfo = false;
    for (const flight of this.page.content) {
      if (flight.departure !== undefined) {
        console.log(flight.departure);
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

  onBack() {
    this.location.back();
  }

  onDay(date: string) {
    this.router.navigate(['/day', date]).catch();
  }

  onAirline(icao: string) {
    this.router.navigate(['/airline', icao, 0]).catch();
  }

  onAirport(icao: string) {
    this.router.navigate(['/airport', icao, 0]).catch();
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
    this.sendQuery(0);
  }
}
