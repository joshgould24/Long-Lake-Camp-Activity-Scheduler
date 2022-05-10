import { Component, OnInit } from '@angular/core';
import { AppComponent } from "src/app/app.component";
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';//allows us to save variables to storage

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit {
  
  topText = "hmmmmmm";

  constructor(private nativeStorage: NativeStorage) { console.log("constructor."); }
  
  ngOnInit() {
    if(AppComponent.getCamp() == null){
      console.log("Scheduler.app.ts:  Camp not specified.");
      this.topText = "Good morning camper!\nPlease select a camp in the side menu before in order to schedule your day. B)";
    }
    if(AppComponent.getCamp() == "adventure"){
      console.log("Scheduler.app.ts:  Adventure Camp has been selected");
      this.topText = "Good morning adventure camper!";
    }
    if(AppComponent.getCamp() == "art"){
      console.log("Scheduler.app.ts:  Arts Camp has been selected");
      this.topText = "Good morning arts camper!";
    }
  }

  setTopText(txt:string){
    this.topText = txt;
  }

  save(){
    console.log("save");
    this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }

  recover(){
    console.log("recover");
    this.nativeStorage.getItem('myitem')
    .then(
      data => console.log(data),
      error => console.error(error)
    );
  }

}
