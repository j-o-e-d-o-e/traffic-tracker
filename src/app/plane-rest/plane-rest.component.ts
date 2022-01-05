import {Component, OnInit, ViewChild} from '@angular/core';
import {Flight, Flights} from '../model/flights.model';
import {DataService} from '../service/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {environment} from '../../environments/environment';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FlightsPhotoComponent} from '../flights-photo/flights-photo.component';

@Component({
  selector: 'app-plane-rest',
  templateUrl: './plane-rest.component.html',
  styleUrls: ['./plane-rest.component.css', '../app.component.css']
})
export class PlaneRestComponent implements OnInit {
  flights: Flights;
  loading: boolean;
  departureStartDate: number = new Date(environment.departuresStartDate).setHours(0, 0, 0, 0);
  airlinesStartDate: number = new Date(environment.airlinesStartDate).setHours(0, 0, 0, 0);
  airlinesInfo: boolean;
  photoInfo: boolean;
  error = false;
  errorMessage: string;
  @ViewChild('form')
  form: NgForm;
  stdPageSize = 20;

  constructor(private service: DataService, private modalService: NgbModal,
              private route: ActivatedRoute, private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.photoInfo = false;
    this.fetch(environment.urlBase + '/planes/' + this.route.snapshot.params.icao + '/flights'
      + '?page=' + this.route.snapshot.params.page + '&size=' + this.stdPageSize);
  }

  // noinspection DuplicatedCode
  private fetch(url: string) {
    const start = Date.now();
    this.service.fetch(url).subscribe(
      (flights: Flights) => {
        const responseTime = Date.now() - start;
        console.log('Response time: ' + responseTime + ' ms');
        this.setData(flights);
        this.router.navigate(['/plane', this.flights._embedded.flightDtoes[0].icao_24, this.flights.page.number]).catch();
        this.loading = false;
      },
      (message) => {
        this.error = true;
        this.errorMessage = message.error;
      });
  }

  private setData(data: Flights) {
    this.flights = data;
    console.log(this.flights);
    this.airlinesInfo = this.airlinesStartDate <= new Date(this.flights._embedded.flightDtoes[0].date).setHours(0, 0, 0, 0);
    this.photoInfo = this.flights._embedded.flightDtoes.some(f => f.photo);
  }

  onPrev() {
    this.fetch(this.flights._links.prev.href);
  }

  onNext() {
    this.fetch(this.flights._links.next.href);
  }

  onLast() {
    this.fetch(this.flights._links.last.href);
  }

  onBack() {
    this.location.back();
  }

  onDay(date: string) {
    this.router.navigate(['/day', date]).catch();
  }

  checkDate(date: string) {
    const flightDate = new Date(date).setHours(0, 0, 0, 0);
    return flightDate >= this.departureStartDate && flightDate < new Date().setHours(0, 0, 0, 0);
  }

  onAirline(icao: string) {
    this.router.navigate(['/airline-rest', icao, 0]).catch();
  }

  onAirport(icao: string) {
    this.router.navigate(['/airport-rest', icao, 0]).catch();
  }

  // noinspection DuplicatedCode
  onFetch() {
    let size = this.form.value.pageSize;
    if (size < 5) {
      size = 5;
    }
    if (size > environment.maxPageSize) {
      size = environment.maxPageSize;
    }
    const url = environment.urlBase + '/planes/' + this.route.snapshot.params.icao + '/flights?page=0&size=' + size;
    this.fetch(url);
  }

  onPhoto(flight: Flight) {
    const modalRef = this.modalService.open(FlightsPhotoComponent);
    modalRef.componentInstance.flight = flight;
  }
}
