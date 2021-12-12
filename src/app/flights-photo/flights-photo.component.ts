import {Component, OnInit} from '@angular/core';
import {DataService} from '../service/data.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {Location} from '@angular/common';

@Component({
  selector: 'app-flights-photo',
  templateUrl: './flights-photo.component.html',
  styleUrls: ['./flights-photo.component.css', '../app.component.css']
})
export class FlightsPhotoComponent implements OnInit {
  callsign: string;
  photoURL: string;

  constructor(private service: DataService, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    this.callsign = this.service.callsignPhoto;
    this.photoURL = environment.urlBase + '/flights/' + this.route.snapshot.params.id + '/image';
    // console.log(this.photoURL);
  }

  onBack() {
    this.location.back();
  }
}
