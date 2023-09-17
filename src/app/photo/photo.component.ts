import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  @Input()
  flight: { callsign: string, date: string, time: string, photo_url: string }

  constructor(public activeModal: NgbActiveModal) {
  }

  onClose() {
    this.activeModal.dismiss('Cross click');
  }
}
