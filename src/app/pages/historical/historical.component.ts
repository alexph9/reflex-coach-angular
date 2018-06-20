import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataProviderService } from '../../services/data-provider/data-provider.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { GamesComponent } from '../games/games.component';


@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})
export class HistoricalComponent implements OnInit {
  chart: any;
  userLogged: any;
  userUid: string;
  numGames:number;
  games: Array<string> = [];
  dates: Array<string> = [];


  constructor(
    public dpService: DataProviderService,
    public authService: AuthService,
    public db: AngularFireDatabase,
  ) {
    this.authService.isUserLogged = false;
    if (!this.authService.isUserLogged) {
      this.authService.getAuth().subscribe(user => {
        this.userUid = user.uid || '';
      })
    }
  }

  ngOnInit() {
    this.dpService.getOneUser(this.userUid).subscribe(user => {
      this.userLogged = user;
      this.getUserGames();
    });
  }

  getUserGames() {
    var cont = -1;
    console.log(this.userLogged)
    for (let j in this.userLogged.games) {
      cont++;
      this.games[cont] = j;
    }
    this.numGames = cont+1;
    for (let i = 0; i < this.games.length; i++) {
      var date = new Date(0);
      let seconds = parseInt(this.games[i]);
      date.setUTCSeconds(seconds);
      this.dates[i] = date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();
    }
  }

  timePerButtonChart() {
    let data = ["BUZZ 0", "BUZZ 1", "BUZZ 2", "BUZZ 3"];
    let datasets = this.getTimePerButtonDataset();
    this.createChart('bar', data, datasets, 'Time per button');

  }

  getTimePerButtonDataset() {
    let timePerBuzz: Array<number> = [0, 0, 0, 0];
    let contTries: Array<number> = [0, 0, 0, 0];
    let buzz
    for (let i = 0; i < this.numGames; i++) {
      for(let j = 0; j < this.userLogged.games[this.games[i]].numTries; j++ ){
        buzz = this.userLogged.games[this.games[i]].tries[j].buzz;
        contTries[buzz] += 1;
        timePerBuzz[buzz] += this.userLogged.games[this.games[i]].tries[j].delay;
      }
    }
    for (let i = 0; i < timePerBuzz.length; i++) {
      timePerBuzz[i] = timePerBuzz[i] / contTries[i];
    }
    return timePerBuzz;
  }

  timePerAttemptChart() {
    let data = this.timePerAttemptData();
    let datasets = this.timePerAttemptDataset();
    this.createChart('line', data, datasets, 'Time per attempt')
  }

  timePerAttemptData(){
    let numAttempt : Array<string> = [];
    for (let i = 0; i < this.numGames; i++) {
      numAttempt[i] = this.dates[i];
    }
    return numAttempt;
  }

  timePerAttemptDataset(){
    let delayAttempt : number = 0;
    let delayAttemptAvg : Array<number> = [];
    for (let i = 0; i < this.numGames; i++) {
      for(let j = 0; j < this.userLogged.games[this.games[i]].numTries; j++ ){
        delayAttempt += this.userLogged.games[this.games[i]].tries[j].delay
      }
      delayAttemptAvg[i] = delayAttempt / this.userLogged.games[this.games[i]].numTries;
      delayAttempt = 0;
    }
    return delayAttemptAvg;
  }


  hitsVsFailuresChart() {
    let data = ["Hits", "Failures"];
    let datasets = this.hitsVsFailuresDataset();
    this.createChart('pie', data, datasets, 'Hits vs Failures')
  }

  hitsVsFailuresDataset(){
    let successPercent: Array<number> = [0,0];
    let contSuccess: number = 0;
    let numTotalTries: number = 0;
    for (let i = 0; i < this.numGames; i++) {
      for(let j = 0; j < this.userLogged.games[this.games[i]].numTries; j++ ){
        numTotalTries++;
        if(this.userLogged.games[this.games[i]].tries[j].delay < this.userLogged.games[this.games[i]].maxTime){
          contSuccess++;
        }
      }
    }
    successPercent[0] = (contSuccess*100) / numTotalTries;
    successPercent[1] = 100 - successPercent[0];
    return successPercent;

  }

  createChart(type, data, datasets, name) {
    if (this.chart !== undefined) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: type,
      data: {
        labels: data,
        datasets: [{
          label: name,
          data: datasets,
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            left: 30,
            right: 30,
            top: 0,
            bottom: 0
          },
        }

      }
    });
  }

}
