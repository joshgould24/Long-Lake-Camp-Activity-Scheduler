import { Component } from '@angular/core';
import { SchedulerPage } from "src/app/pages/scheduler/scheduler.page";
import { Storage } from '@capacitor/storage';//allows us to save variables to storage
import { clamp } from '@ionic/core/dist/types/utils/helpers';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  camp:any;
  
  //return the camp which has been selected in the dropdown menu. this will either be adventure, art, or undefined.
  static getCamp(): any {   
    return (document.getElementById("camp_selector") as HTMLSelectElement).value;
  }

  public appPages = [
    { title: 'Schedule', url: '/scheduler', icon: 'calendar' },
    { title: 'Export data', url: '/export', icon: 'analytics' },
    { title: 'Information', url: '/info', icon: 'help-circle' }
  ];
  
  constructor() {  }
  
  ngOnInit() {

    //recover previous activities chosen
    this.recoverCamp();
  }

  /**
   * This method updates the stored camp when the user changes the dropdown menus value
   */
  updateCamp(){

    console.log("updateCamp method");

    //get the camp chosen in the dropdown menu
    var camp = (document.getElementById("camp_selector") as HTMLSelectElement).value;

    console.log("found camp:",camp);

    window.location.reload();

    //use Capacitor Storage to remember the choice.
    set("camp", camp);
  }

  /**
   *  This method will recover the chosen camp. It is called when the app opens.
   */
  recoverCamp(){
    console.log("recoverCamp method:");


    console.log(this);
    let self = this;

    get("camp").then(
      function(result) {
        (document.getElementById("camp_selector") as HTMLSelectElement).value = result;
        console.log("I found...:",result);
        
        // this.camp = result;
        self.camp = result;

        // console.log('AAAAAAAAAAAAAAAAAAAAAAAA', this.camp);
      },
      function(error) { console.error("Error in recoverCamp method: " + error); }
    );
  }
  
}

export async function set(key: string, value: any): Promise<void> {
  await Storage.set({
    key: key,
    value: JSON.stringify(value),
  });
}

export async function get(key: string): Promise<any> {
  const item = await Storage.get({ key: key });
  return JSON.parse(item.value);
}

export async function remove(key: string): Promise<void> {
  await Storage.remove({
    key: key,
  });
  
}


