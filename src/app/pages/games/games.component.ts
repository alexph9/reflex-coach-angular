import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataProviderService } from '../../services/data-provider/data-provider.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  chart: any;
  userLogged: any;
  userUid: string;
  games: Array<string> = [];
  dates: Array<string> = [];
  dateSelectionated: string;
  actualChart: string = 'bar';

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
      this.dateSelectionated = this.games[0];
    });
  }

  getUserGames() {
    var cont = -1;
    console.log(this.userLogged)
    for (let j in this.userLogged.games) {
      cont++;
      this.games[cont] = j;
    }
    for (let i = 0; i < this.games.length; i++) {
      var date = new Date(0);
      let seconds = parseInt(this.games[i]);
      date.setUTCSeconds(seconds);
      this.dates[i] = date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();
    }
  }

  onClickSaveDate(id, event) {
    const selected = document.getElementsByClassName('mat-list-item');
    console.log(selected);
    
    for (let i = 0; i < selected.length; i++) {
      selected[i].className = selected[i].className.replace(' active', '');
    }

    event.currentTarget.className += ' active';

    this.dateSelectionated = this.games[id];
    switch (this.actualChart) {
      case 'bar':
        this.timePerButtonChart();
        break;
      case 'line':
        this.timePerAttemptChart();
        break;
      case 'pie':
        this.hitsVsFailuresChart();
        break;
      default:
        this.timePerButtonChart();
    }
  }

  timePerButtonChart() {
    this.actualChart = 'bar';
    let data = ["BUZZ 0", "BUZZ 1", "BUZZ 2", "BUZZ 3"];
    let datasets = this.getTimePerButtonDataset();
    if (this.chart !== undefined) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: this.actualChart,
      data: {
        labels: data,
        datasets: [{
          label: 'Time per button',
          data: datasets,
          backgroundColor: [
            '#7bed9f',
            '#ff6b81',
            '#70a1ff',
            '#eccc68',
          ],
          borderColor: [
            '#2ed573',
            '#ff4757',
            '#1e90ff',
            '#ffa502',
          ],
          borderWidth: 2,
  
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

  getTimePerButtonDataset() {
    let particularGame = this.userLogged.games[this.dateSelectionated];
    let timePerBuzz: Array<number> = [0, 0, 0, 0];
    let contTries: Array<number> = [0, 0, 0, 0];
    let buzz
    for (let i = 0; i < particularGame.numTries; i++) {
      buzz = particularGame.tries[i].buzz;
      contTries[buzz] += 1;
      timePerBuzz[buzz] += particularGame.tries[i].delay;
    }
    for (let i = 0; i < timePerBuzz.length; i++) {
      timePerBuzz[i] = timePerBuzz[i] / contTries[i];
    }
    return timePerBuzz;
  }

  timePerAttemptChart() {
    this.actualChart = 'line';
    let data = this.timePerAttemptData();
    let datasets = this.timePerAttemptDataset();
    if (this.chart !== undefined) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: this.actualChart,
      data: {
        labels: data,
        datasets: [{
          label: 'Time per attempt',
          data: datasets,
          backgroundColor: '#ffeaa7',
          borderColor: '#ff4757',
          borderWidth: 2,
  
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

  timePerAttemptData() {
    let particularGame = this.userLogged.games[this.dateSelectionated];
    let idTry: number;
    let numAttempt: Array<string> = [];
    for (let i = 0; i < particularGame.numTries; i++) {
      idTry = i + 1;
      numAttempt[i] = idTry.toString();
    }
    return numAttempt;
  }

  timePerAttemptDataset() {
    let particularGame = this.userLogged.games[this.dateSelectionated];
    let delayAttempt: Array<number> = [];
    for (let i = 0; i < particularGame.numTries; i++) {
      delayAttempt[i] = particularGame.tries[i].delay
    }
    return delayAttempt;
  }


  hitsVsFailuresChart() {
    this.actualChart = 'pie'
    let data = ["Hits", "Failures"];
    let datasets = this.hitsVsFailuresDataset();
    if (this.chart !== undefined) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: this.actualChart,
      data: {
        labels: data,
        datasets: [{
          label: 'Hits vs Failures',
          data: datasets,
          backgroundColor: [
            '#2ed573',
            '#ff4757',
          ],
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

hitsVsFailuresDataset() {
  let particularGame = this.userLogged.games[this.dateSelectionated];
  let successPercent: Array<number> = [0, 0];
  let contSuccess: number = 0;
  for (let i = 0; i < particularGame.numTries; i++) {
    if (particularGame.tries[i].delay < particularGame.maxTime) {
      contSuccess++;
    }
  }
  successPercent[0] = (contSuccess * 100) / particularGame.numTries;
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
        backgroundColor: [
          '#7bed9f',
          '#ff6b81',
          '#70a1ff',
          '#eccc68',
        ],
        borderColor: [
          '#2ed573',
          '#ff4757',
          '#1e90ff',
          '#ffa502',
        ],
        borderWidth: 2,

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
