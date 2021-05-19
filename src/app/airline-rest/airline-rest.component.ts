import {Component, OnInit} from '@angular/core';
import {Flights} from '../model/flights.model';
import {DataService} from '../service/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-airline-rest',
  templateUrl: './airline-rest.component.html',
  styleUrls: ['./airline-rest.component.css', '../app.component.css']
})
export class AirlineRestComponent implements OnInit {
  flights: Flights;
  loading: boolean;
  departureStartDate: number = new Date(environment.departuresStartDate).setHours(0, 0, 0, 0);
  airlinesStartDate: number = new Date(environment.airlinesStartDate).setHours(0, 0, 0, 0);
  airlinesInfo: boolean;
  error = false;
  errorMessage: string;

  constructor(private service: DataService, private route: ActivatedRoute, private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.service.fetch(environment.urlBase + '/airline/' + this.route.snapshot.params.icao + '/flights').subscribe(
      (data: Flights) => {
        this.setData(data);
        this.loading = false;
      },
      (message) => {
        this.error = true;
        this.errorMessage = message.error;
      });
  }

  private setData(data: Flights) {
    this.flights = data;
    this.airlinesInfo = this.airlinesStartDate <= new Date(this.flights._embedded.flightDtoes[0].date).setHours(0, 0, 0, 0);
  }

  onPrev() {
    this.service.fetch(this.flights._links.prev.href).subscribe(
      (planes: Flights) => {
        this.setData(planes);
      });
  }

  onNext() {
    this.service.fetch(this.flights._links.next.href).subscribe(
      (planes: Flights) => {
        this.setData(planes);
      });
  }

  onLast() {
    this.service.fetch(this.flights._links.last.href).subscribe(
      (planes: Flights) => {
        this.setData(planes);
      });
  }

  onBack() {
    this.location.back();
  }

  onDay(date: string) {
    this.router.navigate(['/day', date]).catch();
  }

  onAirport(icao: string) {
    this.router.navigate(['/airport', icao]).catch();
  }

  onPlane(icao: string) {
    this.router.navigate(['/plane', icao]).catch();
  }

  checkDate(date: string) {
    const flightDate = new Date(date).setHours(0, 0, 0, 0);
    return flightDate >= this.departureStartDate && flightDate < new Date().setHours(0, 0, 0, 0);
  }
}
