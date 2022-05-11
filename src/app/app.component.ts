import { Component } from '@angular/core';
import { SchedulerPage } from "src/app/pages/scheduler/scheduler.page";
import { Storage } from '@capacitor/storage';//allows us to save variables to storage


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  //return the camp which has been selected in the dropdown menu. this will either be adventure, art, or undefined.
  static getCamp(): any {   
    return (document.getElementById("camp_selector") as HTMLSelectElement).value;
  }

  public appPages = [
    { title: 'Schedule', url: '/scheduler', icon: 'calendar' },
    { title: 'Export data', url: '/export', icon: 'analytics' }
  ];
  
  constructor() {  }

  updateScheduler(){
    console.log("updateScheduler method:");
    //SchedulerPage.setTopText((document.getElementById("camp_selector") as HTMLSelectElement).value);
    let e:string = AppComponent.getCamp();
    //SchedulerPage.setTopText(e);
  }
}
