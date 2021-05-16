import {Component, OnInit} from '@angular/core';
import {DataService} from '../service/data.service';
import {Flights} from '../model/flights.model';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css', '../app.component.css']
})
export class FlightsComponent implements OnInit {
  flights: Flights;
  loading: boolean;
  departureInfo: boolean;
  airlinesStartDate: number = new Date(environment.airlinesStartDate).setHours(0, 0, 0, 0);
  airlinesInfo: boolean;
  error = false;
  errorMessage: string;

  constructor(private service: DataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.departureInfo = false;
    this.service.fetch(environment.urlBase + '/flights/' + this.route.snapshot.params.date).subscribe(
      (flights: Flights) => {
        this.setData(flights);
        this.loading = false;
      },
      (message) => {
        this.error = true;
        this.errorMessage = message.error;
      });
  }

  private setData(flights: Flights) {
    this.flights = flights;
    // console.log(flights);
    this.airlinesInfo = this.airlinesStartDate <= new Date(this.flights._embedded.flightDtoes[0].date).setHours(0, 0, 0, 0);
    for (const flight of this.flights._embedded.flightDtoes) {
      if (flight.departure_icao !== undefined) {
        this.departureInfo = true;
        break;
      }
    }
  }

  onPrev() {
    this.service.fetch(this.flights._links.prev.href).subscribe(
      (flights: Flights) => {
        this.setData(flights);
      });
  }

  onNext() {
    this.service.fetch(this.flights._links.next.href).subscribe(
      (flights: Flights) => {
        this.setData(flights);
      });
  }

  onLast() {
    this.service.fetch(this.flights._links.last.href).subscribe(
      (flights: Flights) => {
        this.setData(flights);
      });
  }

  onDay() {
    this.router.navigate(['/day', this.flights._embedded.flightDtoes[0].date]).catch();
  }

  onPlane(icao: string) {
    this.router.navigate(['/plane', icao]).catch();
  }

  onAirline(icao: string) {
    this.router.navigate(['/airline', icao]).catch();
  }

  onAirport(icao: string) {
    this.router.navigate(['/airport', icao]).catch();
  }
}
