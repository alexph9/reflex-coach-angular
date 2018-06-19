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
  email: string;
  userLogged: any;

  constructor(
    public dpService: DataProviderService,
    public authService: AuthService,
    public db: AngularFireDatabase,
  ) {
    /*this.authService.getAuth().subscribe(user => {
      this.userLogged = this.db.list('users', ref => ref.equalTo(user.)).snapshotChanges();
    })*/
    

    this.dpService.getAllUsers().subscribe(users => users.forEach(user => {
      if (user.id.email === this.email) {
        this.userLogged = user;
      }
    }))

    // this.userLogged = this.dpService.filterUserByEmail(this.email).valueChanges();
    
  }

  ngOnInit() {
    console.log(this.userLogged);
    this.getEmail();
    
  }

  getEmail(){
    this.authService.getAuth().subscribe(
      user => {
        this.email = user.email;
      },
      error => {

      })
    console.log("Usuario", this.userLogged);
    console.log("Email", this.email);
  }

  setChart(chartType: any) {
    this.generateChart(chartType);
  }
  generateChart(chartType: any) {
    if (this.chart !== undefined) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: chartType,
      data: {
        labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
        datasets: [{
          label: "Car Speed",
          data: [0, 59, 75, 20, 20, 55, 40],
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}
