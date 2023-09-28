import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  open = false;
  private readonly window = window;

  toggle() {
    this.open = !this.open;
  }

  navigateTo(url: string) {
    this.open = false;
    window.open(url, '_blank');
  }
}
