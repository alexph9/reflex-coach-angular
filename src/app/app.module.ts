import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';


//Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './pages/common/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { GamesComponent } from './pages/games/games.component';
import { HistoricalComponent } from './pages/historical/historical.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

//Services
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { DataProviderService } from './services/data-provider/data-provider.service';

// Firebase
import{ AngularFireModule } from 'angularfire2';
import{ AngularFireAuthModule } from 'angularfire2/auth';
import{ AngularFireDatabaseModule } from 'angularfire2/database';
import { environment} from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FooterComponent } from './pages/common/footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    GamesComponent,
    HistoricalComponent,
    NotFoundComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule
    
  ],
  providers: [AuthService, AuthGuard, FlashMessagesService, DataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
