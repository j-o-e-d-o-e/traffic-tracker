import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Flight} from '../model/flights.model';

@Component({
  selector: 'app-flights-photo',
  templateUrl: './flights-photo.component.html',
  styleUrls: ['./flights-photo.component.css', '../app.component.css']
})
export class FlightsPhotoComponent implements OnInit {
  @Input()
  flight: Flight;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    // console.log(this.flight);
  }

  onClose() {
    this.activeModal.dismiss('Cross click');
  }
}
