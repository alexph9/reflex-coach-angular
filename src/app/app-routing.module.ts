import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { GamesComponent } from './pages/games/games.component';
import { HomeComponent } from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import { HistoricalComponent } from './pages/historical/historical.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: "", component: HomeComponent },
  {path: "games", component: GamesComponent, canActivate: [AuthGuard] },
  {path: "login", component: LoginComponent },
  {path: "register", component: RegisterComponent },
  {path: "historical", component: HistoricalComponent, canActivate: [AuthGuard] },
  {path: '**', component: NotFoundComponent },
];

@NgModule({
  providers: [AuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
