import { Component, OnInit } from '@angular/core';
import { AppComponent } from "src/app/app.component";
import { Storage } from '@capacitor/storage';//allows us to save variables to storage

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit {
  
  topText = "hmmmmmm";

  constructor() { console.log("constructor."); }
  
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

    //recover previous activities chosen
    this.recoverChoices();
  }

  setTopText(txt:string){
    this.topText = txt;
  }

  saveChoices(){

    var choice1 = (document.getElementById("activity1") as HTMLSelectElement).value;
    var choice2 = (document.getElementById("activity2") as HTMLSelectElement).value;
    var choice3 = (document.getElementById("activity3") as HTMLSelectElement).value;
    var choice4 = (document.getElementById("activity4") as HTMLSelectElement).value;
    var choice5 = (document.getElementById("activity5") as HTMLSelectElement).value;
    var choice6 = (document.getElementById("activity6") as HTMLSelectElement).value;
    var choice7 = (document.getElementById("activity7") as HTMLSelectElement).value;

    console.log("saveChoices method:");
    console.log("choice 1: ",choice1);
    console.log("choice 2: ",choice2);
    console.log("choice 3: ",choice3);
    console.log("choice 4: ",choice4);
    console.log("choice 5: ",choice5);
    console.log("choice 6: ",choice6);
    console.log("choice 7: ",choice7);

    set("choice1",choice1);
    set("choice2",choice2);
    set("choice3",choice3);
    set("choice4",choice4);
    set("choice5",choice5);
    set("choice6",choice6);
    set("choice7",choice7);
  }

  recoverChoices(){

    var choice1, choice2, choice3, choice4, choice5, choice6, choice7;

    get("choice1").then(
      function(result) { 
        choice1 = result;
        (document.getElementById("activity1") as HTMLSelectElement).value = choice1;
      },
      function(error) {  }
    );

    get("choice2").then(
      function(result) {
        choice2 = result;
        (document.getElementById("activity2") as HTMLSelectElement).value = choice2;
      },
      function(error) {  }
    );

    get("choice3").then(
      function(result) {
        choice3 = result;
        (document.getElementById("activity3") as HTMLSelectElement).value = choice3;
      },
      function(error) {  }
    );

    get("choice4").then(
      function(result) { 
        choice4 = result;
        (document.getElementById("activity4") as HTMLSelectElement).value = choice4;
      },
      function(error) {  }
    );

    get("choice5").then(
      function(result) {
        choice5 = result;
        (document.getElementById("activity5") as HTMLSelectElement).value = choice5;
      },
      function(error) {  }
    );

    get("choice6").then(
      function(result) {
        choice6 = result;
        (document.getElementById("activity6") as HTMLSelectElement).value = choice6;
      },
      function(error) {  }
    );

    get("choice7").then(
      function(result) {
        choice7 = result;
        (document.getElementById("activity7") as HTMLSelectElement).value = choice7;
      },
      function(error) {  }
    );

    console.log("recoverChoices method:")
    console.log("choice1:",choice1);
    console.log("choice2:",choice2);
    console.log("choice3:",choice3);
    console.log("choice4:",choice4);
    console.log("choice5:",choice5);
    console.log("choice6:",choice6);
    console.log("choice7:",choice7);
  }

  resetChoices(){
    set("choice1",null);
    set("choice2",null);
    set("choice3",null);
    set("choice4",null);
    set("choice5",null);
    set("choice6",null);
    set("choice7",null);

    this.recoverChoices();
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

