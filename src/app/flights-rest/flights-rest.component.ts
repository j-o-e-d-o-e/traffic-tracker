import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../service/data.service';
import {Flights} from '../model/flights.model';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-flights-rest',
  templateUrl: './flights-rest.component.html',
  styleUrls: ['./flights-rest.component.css', '../app.component.css']
})
export class FlightsRestComponent implements OnInit {
  flights: Flights;
  loading: boolean;
  departureInfo: boolean;
  airlinesStartDate: number = new Date(environment.airlinesStartDate).setHours(0, 0, 0, 0);
  airlinesInfo: boolean;
  error = false;
  errorMessage: string;
  @ViewChild('form')
  form: NgForm;

  constructor(private service: DataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.departureInfo = false;
    this.fetch(environment.urlBase + '/flights/' + this.route.snapshot.params.date);
  }

  private fetch(url: string) {
    const start = Date.now();
    this.service.fetch(url).subscribe(
      (flights: Flights) => {
        const responseTime = Date.now() - start;
        console.log('Response time: ' + responseTime + ' ms');
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
    this.fetch(this.flights._links.prev.href);
  }

  onNext() {
    this.fetch(this.flights._links.next.href);
  }

  onLast() {
    this.fetch(this.flights._links.last.href);
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

  onFetch() {
    const size = this.form.value.pageSize;
    const url = environment.urlBase + '/flights/' + this.route.snapshot.params.date + '?page=0&size=' + size;
    this.fetch(url);
  }
}
