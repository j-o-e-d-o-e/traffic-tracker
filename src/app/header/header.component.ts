import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  open = false;
  readonly environment = environment;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  toggle() {
    this.open = !this.open;
  }

  onHome() {
    this.router.navigate(['home']).catch();
  }
}
