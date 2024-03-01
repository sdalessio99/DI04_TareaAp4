import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto'

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent  implements OnInit {

  public chart!: Chart;

  constructor() { }

  ngOnInit() {
    console.log('ejecuta pie-chart');
    this.crearChart();
  }

  private crearChart() {
    const data = {
      labels: ['Red','Green','Yellow','Grey','Blue'],
      datasets: [
      {
        label: 'My First Dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }
      ]
    };

    this.chart = new Chart("pieChart", {
      type: 'pie' as ChartType,
      data: data,
      options: { // opciones de la gráfica
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 16,
                weight: 'bold'
              }
            },
          }
        },
      }
    });
  }
}
