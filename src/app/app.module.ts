import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

//Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './pages/common/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ChartComponent } from './pages/chart/chart.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
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




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ChartComponent,
    UserProfileComponent,
    NotFoundComponent
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
    
  ],
  providers: [AuthService, AuthGuard, FlashMessagesService, DataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
