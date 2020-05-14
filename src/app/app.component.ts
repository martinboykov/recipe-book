import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  route = 'Shopping List';
  onRouteChanged(route: string) {
    this.route = route;
  }
}
