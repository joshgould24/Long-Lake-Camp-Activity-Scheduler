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

  camp:string;
  adventureActivities:string[] = ["High ropes","Climbing","Paintball","Archery","Fencing","Mountain biking","ATV's","Horseback riding","White water rafting","Survival skills","Sea plane rides","Camping","Orienteering","First aid","Shelter building","Geology","Wildlife investigations","Recycling program","Animal tracking","Forest ecology","Pitching a tent","Building a campfire","Hiking","Swimming","Fishing","Boating","Sailing","Kayaking","Waker skiing","Jet skiing","Paddleboarding","Canoeing","Knee-boarding","Wake-boarding","Tubing","American Football","Soccer","Baseball","Volleyball","Basketball","Lacrosse","Dodgeball","Tennis","Golf","Tetherball","Frisbee","Badminton","Rugby","Motor sports","Capture the flag","Automotive","Fitness","Sustainability","Water fight","Slip'n'Slide","Gladiator","Triathlon","Fort Building","Raft-building","Arkham asylum","Blacksmithing","DJ","Woodwork","Candle-making","Tie-dye","SFX","Band-practice","Board games","Rocketry"].sort();
  artActivities:String[] = ["Musical (theater)","Play (theater)","Comedy (theater)","Short one act (theater)","Monologue (theater)","Acting (theater)","Singing (theater)","Improv (theater)","Audition technique (theater)","Stand-up comedy (theater)","Character creation and development (theater)","Line memorization (theater)","Script analysis (theater)","Stage blocking (theater)","Microphone technique (theater)","Vocal technique (theater)","Projection (theater)","Motion (theater)","How to listen (theater)","Entering/exeunting stage (theater)","Lights (technical theater)","Sets (technical theater)","Sound (technical theater)","Props (technical theater)","Costumes (technical theater)","Set painting (technical theater)","Stage management (technical theater)","Assistant director (technical theater)","Wrangling (technical theater)","Make-up (technical theater)","Prosthetics (technical theater)","Cabling (technical theater)","Sound checks (technical theater)","Microphone checks (technical theater)","Jazz band (music)","Orchestra (music)","Chorus (music)","Strings ensemble (music)","Brass ensemble (music)","Drumline (music)","Woodwind ensemble (music)","Guitar ensemble (music)","Percussion ensemble (music)","Solo vocal (music)","Solo instrumental (music)","Acapella (music)","Composition (music)","Song writing (music)","Digital music composition (music)","Electric bass (music)","Classical guitar (music)","Electric guitar (music)","Piano (music)","Keyboard (music)","Painting (fine arts)","Drawing (fine arts)","Printmaking (fine arts)","Sculpture (fine arts)","Tie-dye (fine arts)","Silk painting (fine arts)","Weaving (fine arts)","Welding (fine arts)","Fashion (fine arts)","Photography (fine arts)","Darkroom (fine arts)","Digital arts (fine arts)","Dungeons & Dragons (fine arts)","Rocketry (fine arts)","Installation arts (fine arts)","Jewelry (fine arts)","Silversmithing (fine arts)","Body art (fine arts)","Time based art (fine arts)","Ceramics (fine arts)","Illustration (fine arts)","Graphic design (fine arts)","Miniatures (fine arts)","Framing art (fine arts)","Portfolio creation (fine arts)","Online web gallery (fine arts)","3D printing (fine arts)","Kinetic art (fine arts)","Camera operation (film)","Sound recording (film)","Video editing (film)","Sound editing (film)","Cinematography (film)","SFX (film)","Animation (film)","Exporting and authoring (film)","Screen play writing (film)","Storyboarding (film)","Location scouting (film)","Directing (film)","Casting (film)","Censorship (film)","Soundscaping (film)","Story development (film)","Understanding your Audience (film)","Ballet (dance)","Modern dance","Hip-Hop (dance)","Jazz (dance)","Tap dancing","Contemporary (dance)","Swing (dance)","Pointe (dance)","Partnering (dance)","Choreograph your own dance","Yoga (dance)","Pilates (dance)","Strengthening (dance)","Circus","Band practice","Recording your songs","Making a music video","Create your own music","Guitar lesson","Bass lesson","Vocal lesson","Keyboard lesson","Recording studio","Band management","Guitar effect pedals","Double bass pedals","Waterfront","ATV's","Tennis","Horseback riding","Soccer","Climbing","High ropes","Tetherball","Ping pong","Fitness","Paintball","Fencing","Jogging","Hiking","Volleyball","Basketball","Touch rugby","Kubb","Badminton","Archery","Martial arts"].sort();

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

    //get the camp chosen in the dropdown menu
    var camp = (document.getElementById("camp_selector") as HTMLSelectElement).value;

    console.log("updateCamp method:",camp);

    window.location.reload();

    //use Capacitor Storage to remember the choice.
    set("camp", camp);
  }

  /**
   *  This method will recover the chosen camp. It is called when the app opens.
   */
  recoverCamp(){

    console.log("recoverCamp method:");

    get("camp").then(
      function(result) {
        (document.getElementById("camp_selector") as HTMLSelectElement).value = result;
        console.log("I found...:",result);
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


