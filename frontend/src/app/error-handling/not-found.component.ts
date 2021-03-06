import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../logging/notification.service';

@Component({
  selector: 'app-not-found',
  template: '<div>404</div>',
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router, private notifier: NotificationService) {}

  ngOnInit() {
    this.router.navigate(['/']).then(() => {
      this.notifier.showInfo(
        'Please choose another route or try again later',
        'Redirecting'
      );
      this.notifier.showError('404', 'Page not found');
    });
  }
}
