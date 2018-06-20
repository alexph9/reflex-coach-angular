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
  games: any;

  constructor(
    public dpService: DataProviderService,
    public authService: AuthService,
    public db: AngularFireDatabase,
  ) {
    this.authService.isUserLogged = false;
    if(!this.authService.isUserLogged){
      this.authService.getAuth().subscribe(user =>{
        this.userUid = user.uid || '';
      })
      this.games = [1,2,3,4,5,6,7,8,9,10];
    } 
  }

  ngOnInit() {
    this.dpService.getOneUser(this.userUid).subscribe(user => this.userLogged = user)
  }

  timePerButtonChart() {
    let data = ["BUZZ 0", "BUZZ 1", "BUZZ 2", "BUZZ 3"];
    let datasets = [200, 500, 355, 60];//TODO: recoger media tiempo tardado por boton
    this.createChart('bar', data, datasets, 'Time per button')
    console.log("User", this.userLogged.games);
  }

  timePerAttemptChart() {
    let data = ["1", "2", "3", "4", "5","6", "7", "8", "9", "10","11", "12", "13", "14", "15","16", "17", "18", "19", "20"]; //TODO: Array segun num intentos;
    let datasets = [200, 500, 355, 600, 333, 454, 747, 1000, 244, 242, 121, 255, 747, 557, 333, 744, 644, 500, 997, 854];//TODO: Array delay de cada intento
    this.createChart('line', data, datasets, 'Time per attempt')
    console.log("User", this.userLogged.games);
  }

  hitsVsFailuresChart() {
    let data = ["Hits", "Failures"];
    let datasets = [60, 40 ];//TODO: recoger successPercent para exito y 100-successPercent para failure
    this.createChart('pie', data, datasets, 'Hits vs Failures')
    console.log("User", this.userLogged.games);
  }

  createChart(type, data, datasets, name){
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
