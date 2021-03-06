import { Component, OnInit } from '@angular/core';
import { AppComponent } from "src/app/app.component";
import { Storage } from '@capacitor/storage';//allows us to save variables to storage

//for the searchable dropdown:
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit {
  
  topText = "Welcome";

  adventureActivities:string[] = ["High ropes","Climbing","Paintball","Archery","Fencing","Mountain biking","ATV's","Horseback riding","White water rafting","Survival skills","Sea plane rides","Camping","Orienteering","First aid","Shelter building","Geology","Wildlife investigations","Recycling program","Animal tracking","Forest ecology","Pitching a tent","Building a campfire","Hiking","Swimming","Fishing","Boating","Sailing","Kayaking","Waker skiing","Jet skiing","Paddleboarding","Canoeing","Knee-boarding","Wake-boarding","Tubing","American Football","Soccer","Baseball","Volleyball","Basketball","Lacrosse","Dodgeball","Tennis","Golf","Tetherball","Frisbee","Badminton","Rugby","Motor sports","Capture the flag","Automotive","Fitness","Sustainability","Water fight","Slip'n'Slide","Gladiator","Triathlon","Fort Building","Raft-building","Arkham asylum","Blacksmithing","DJ","Woodwork","Candle-making","Tie-dye","SFX","Band-practice","Board games","Rocketry", "Robotics"].sort();
  artActivities:String[] = ["Musical (theater)","Play (theater)","Comedy (theater)","Short one act (theater)","Monologue (theater)","Acting (theater)","Singing (theater)","Improv (theater)","Audition technique (theater)","Stand-up comedy (theater)","Character creation and development (theater)","Line memorization (theater)","Script analysis (theater)","Stage blocking (theater)","Microphone technique (theater)","Vocal technique (theater)","Projection (theater)","Motion (theater)","How to listen (theater)","Entering/exeunting stage (theater)","Lights (technical theater)","Sets (technical theater)","Sound (technical theater)","Props (technical theater)","Costumes (technical theater)","Set painting (technical theater)","Stage management (technical theater)","Assistant director (technical theater)","Wrangling (technical theater)","Make-up (technical theater)","Prosthetics (technical theater)","Cabling (technical theater)","Sound checks (technical theater)","Microphone checks (technical theater)","Jazz band (music)","Orchestra (music)","Chorus (music)","Strings ensemble (music)","Brass ensemble (music)","Drumline (music)","Woodwind ensemble (music)","Guitar ensemble (music)","Percussion ensemble (music)","Solo vocal (music)","Solo instrumental (music)","Acapella (music)","Composition (music)","Song writing (music)","Digital music composition (music)","Electric bass (music)","Classical guitar (music)","Electric guitar (music)","Piano (music)","Keyboard (music)","Painting (fine arts)","Drawing (fine arts)","Printmaking (fine arts)","Sculpture (fine arts)","Tie-dye (fine arts)","Silk painting (fine arts)","Weaving (fine arts)","Welding (fine arts)","Fashion (fine arts)","Photography (fine arts)","Darkroom (fine arts)","Digital arts (fine arts)","Dungeons & Dragons (fine arts)","Rocketry (fine arts)","Installation arts (fine arts)","Jewelry (fine arts)","Silversmithing (fine arts)","Body art (fine arts)","Time based art (fine arts)","Ceramics (fine arts)","Illustration (fine arts)","Graphic design (fine arts)","Miniatures (fine arts)","Framing art (fine arts)","Portfolio creation (fine arts)","Online web gallery (fine arts)","3D printing (fine arts)","Kinetic art (fine arts)","Camera operation (film)","Sound recording (film)","Video editing (film)","Sound editing (film)","Cinematography (film)","SFX (film)","Animation (film)","Exporting and authoring (film)","Screen play writing (film)","Storyboarding (film)","Location scouting (film)","Directing (film)","Casting (film)","Censorship (film)","Soundscaping (film)","Story development (film)","Understanding your Audience (film)","Ballet (dance)","Modern dance","Hip-Hop (dance)","Jazz (dance)","Tap dancing","Contemporary (dance)","Swing (dance)","Pointe (dance)","Partnering (dance)","Choreograph your own dance","Yoga (dance)","Pilates (dance)","Strengthening (dance)","Circus","Band practice","Recording your songs","Making a music video","Create your own music","Guitar lesson","Bass lesson","Vocal lesson","Keyboard lesson","Recording studio","Band management","Guitar effect pedals","Double bass pedals","Waterfront","ATV's","Tennis","Horseback riding","Soccer","Climbing","High ropes","Tetherball","Ping pong","Fitness","Paintball","Fencing","Jogging","Hiking","Volleyball","Basketball","Touch rugby","Kubb","Badminton","Archery","Martial arts"].sort();

  dropdownArray:String[];

  constructor() {  }
  
  ngOnInit() {
    
    // this method sets the personalised message
    this.campSwitch();
    
    //recover previous activities chosen
    this.recoverChoices();

  }

  campSwitch(){

    switch(AppComponent.getCamp()){
      case(null):
        console.log("Scheduler.app.ts:  Camp not specified.");
        this.topText = "Good morning camper!\nPlease select a camp in the side menu before in order to schedule your day. B)";
        break;
      case("adventure"):
        console.log("Scheduler.app.ts:  Adventure Camp has been selected");
        this.topText = "Good morning adventure camper!";
        this.dropdownArray=this.adventureActivities;
        break;
      case("art"):
        console.log("Scheduler.app.ts:  Arts Camp has been selected");
        this.topText = "Good morning arts camper!";
        this.dropdownArray=this.artActivities;
        break;
    }
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
    // console.log("choice 1: ",choice1);
    // console.log("choice 2: ",choice2);
    // console.log("choice 3: ",choice3);
    // console.log("choice 4: ",choice4);
    // console.log("choice 5: ",choice5);
    // console.log("choice 6: ",choice6);
    // console.log("choice 7: ",choice7);

    // when we instantiate a new Date, its values are set to Today.
    // We save the date that the choices were made so we know wether or not to throw them away when they're irrelevant.
    set("dateChoicesMade", new Date());

    set("choice1",choice1);
    set("choice2",choice2);
    set("choice3",choice3);
    set("choice4",choice4);
    set("choice5",choice5);
    set("choice6",choice6);
    set("choice7",choice7);
  }

  /*
   *  This method will recover the choices chosen assuming that those activity choices were made today.
   */
  recoverChoices(){
    console.log("recoverChoices method:");

    // First we need to check when the choices were made. If they were made today, we want to recover them.
    // If they were made yesterday, we want to ignore them.

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!

    var shouldRecoverChoices = true;

    get("dateChoicesMade").then(
      function(result) {
        result = new Date(result);
        if(result.getDate() < dd || result.getMonth() < mm){
          shouldRecoverChoices = false;
        }
        if(shouldRecoverChoices){
          console.log("Recovering choices made");
    
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
    
          // console.log("choice1:",choice1);
          // console.log("choice2:",choice2);
          // console.log("choice3:",choice3);
          // console.log("choice4:",choice4);
          // console.log("choice5:",choice5);
          // console.log("choice6:",choice6);
          // console.log("choice7:",choice7);
        }else{
          console.log("Did not recover choices because they're from yesterday.");
        }
      },
      function(error) { console.error("Error in choicesWereMadeToday method: " + error); }
    );
  }

  resetChoices(){
    set("dateChoicesMade", null);
    set("choice1",null);
    set("choice2",null);
    set("choice3",null);
    set("choice4",null);
    set("choice5",null);
    set("choice6",null);
    set("choice7",null);

    this.recoverChoices();

    //reload page
    window.location.reload();
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


