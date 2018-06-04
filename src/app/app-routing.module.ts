import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartComponent } from './pages/chart/chart.component';
import { HomeComponent } from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';


const routes: Routes = [
  {path: "", component: HomeComponent },
  {path: "chart", component: ChartComponent },
  {path: "login", component: LoginComponent },
  {path: "register", component: RegisterComponent },
  {path: "user", component: UserProfileComponent },
  {path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
