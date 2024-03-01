import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { GestionApiService } from 'src/app/services/gestion-api.service'

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent  implements OnInit {

  @Input() datosCategorias: number[] = [];
  @Input() nombresCategorias: string[] = [];

  @Input() backgroundColorCategorias: string[] = [];
  @Input() borderColorCategorias: string[] = [];
  @Input() tipoChartSelected: string = "";

  public chart!: Chart;

  //para que detecte la etiqueta de la tab
  @Input() nameTab: string = "";

  constructor(private el:ElementRef, private renderer: Renderer2, private gestionServiceApi: GestionApiService) { }

  ngOnInit(): void {
    console.log('ejecuta bar-chart');
    this.crearChart();

    this.gestionServiceApi.datos$.subscribe((datos) => {
      if (datos != undefined) {
        this.nombresCategorias.push(datos.categoria);
        this.datosCategorias.push(datos.totalResults);
        this.chart.update();
      }
    });
  }

  private crearChart() {
    let data = null;

    if (this.tipoChartSelected === "bar-chart"){
      // Datos asignados con los valores que vienen desde tab6
      data = {
        labels: this.nombresCategorias,
        datasets: [{
          label: 'My First Dataset',
          data: this.datosCategorias,
          fill: false,
          backgroundColor: this.backgroundColorCategorias,
          borderColor: this.borderColorCategorias,
          tension: 0.1
        }]
      };
    } else {
      data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            tension: 0.1
          },
          {
            label: 'Dataset 2',
            data: [30, 45, 70, 35, 75, 90, 60],
            fill: false,
            backgroundColor: [
              'rgba(255, 0, 0, 0.2)',
              'rgba(0, 255, 0, 0.2)',
              'rgba(0, 0, 255, 0.2)',
              'rgba(255, 255, 0, 0.2)',
              'rgba(255, 0, 255, 0.2)',
              'rgba(0, 255, 255, 0.2)',
              'rgba(128, 128, 128, 0.2)'
            ],
            borderColor: [
              'rgb(255, 0, 0)',
              'rgb(0, 255, 0)',
              'rgb(0, 0, 255)',
              'rgb(255, 255, 0)',
              'rgb(255, 0, 255)',
              'rgb(0, 255, 255)',
              'rgb(128, 128, 128)'
            ],
            tension: 0.1
          },
          // Se pueden agregar más objetos al datasets
        ]
      }
    };


    // Creamos la gráfica
    const canvas = this.renderer.createElement('canvas');
    this.renderer.setAttribute(canvas, 'id', 'barChart');

    // Añadimos el canvas al div con id "chartContainer"
    const container = this.el.nativeElement.querySelector('#contenedor-barchart');
    this.renderer.appendChild(container, canvas);

    this.chart = new Chart(canvas, {
      type: 'bar' as ChartType, // tipo de la gráfica
      data: data, // datos
      options: { // opciones de la gráfica
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
              font: {
                size: 16,
                weight: 'bold'
              }
            },
          }
        },
      }
    });
    this.chart.canvas.width = 100;
    this.chart.canvas.height = 100;
  }

}
