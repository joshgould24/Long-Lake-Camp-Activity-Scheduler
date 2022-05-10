import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';//allows us to save variables to storage


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [NativeStorage, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],//added NativeStorage to providers.
  bootstrap: [AppComponent],
})
export class AppModule {}
