import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input()
  message: string;

  constructor(private location: Location) {
  }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }
}
