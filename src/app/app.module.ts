import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './pages/common/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';

// firebase
import{ AngularFireModule } from 'angularfire2';
import{ AngularFireDatabaseModule } from 'angularfire2/database';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.fireabase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
