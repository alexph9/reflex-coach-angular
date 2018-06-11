import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataProviderService } from '../../services/data-provider/data-provider.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  chart: any;
  constructor(public dpService: DataProviderService) { }
  ngOnInit() {
  
  }
setChart(chartType: any){
  this.generateChart(chartType);
}
  generateChart(chartType: any){
    if(this.chart !== undefined){
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: chartType,
      data: {
        labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
        datasets: [{
          label: "Car Speed",
          data: [0, 59, 75, 20, 20, 55, 40],
        }]},
      options: {
          responsive: true
      }
  });
  }
}
