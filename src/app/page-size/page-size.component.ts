import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.css']
})
export class PageSizeComponent implements OnInit {
  @ViewChild('form')
  form: NgForm;
  @Output()
  pageSizeInput: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.pageSizeInput.emit(this.form.value.pageSize);
  }
}
