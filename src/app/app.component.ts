import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Schedule', url: '/scheduler', icon: 'calendar' },
    { title: 'Export data', url: '/export', icon: 'analytics' }
  ];
  
  constructor() {}
}
