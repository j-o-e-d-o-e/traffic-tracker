import {Component, OnInit} from '@angular/core';
import {Flights} from '../model/flights.model';
import {DataService} from '../service/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {environment} from '../../environments/environment';

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
  error = false;
  errorMessage: string;

  constructor(private service: DataService, private route: ActivatedRoute, private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.service.fetch(environment.urlBase + '/planes/' + this.route.snapshot.params.icao + '/flights').subscribe(
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
      (data: Flights) => {
        this.setData(data);
      });
  }

  onNext() {
    this.service.fetch(this.flights._links.next.href).subscribe(
      (data: Flights) => {
        this.setData(data);
      });
  }

  onLast() {
    this.service.fetch(this.flights._links.last.href).subscribe(
      (data: Flights) => {
        this.setData(data);
      });
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
    this.router.navigate(['/airline', icao]).catch();
  }

  onAirport(icao: string) {
    this.router.navigate(['/airport', icao]).catch();
  }
}
