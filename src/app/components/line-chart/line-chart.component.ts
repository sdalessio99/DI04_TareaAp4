import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent  implements OnInit {

  public chart!: Chart;
  @Input() nameTab: string = "";

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    console.log("ejecuta line-chart");
    this.crearChart();
  }

  private crearChart() {

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    const div = this.renderer.createElement('div');
    //establecer las propiedades del div como si fuesen los atrib en el archivo html
    this.renderer.setStyle(div, 'width', '100%');
    this.renderer.setStyle(div, 'height', '100%');
    this.renderer.setStyle(div, 'margin', 'auto');
    this.renderer.setStyle(div, 'text-align', 'center');
    //indicar el atributo id en el div
    this.renderer.setAttribute(div, 'id', 'container'+this.nameTab+'LineChart');

    //crear el canvas
    const canvas = this.renderer.createElement('canvas');
    //añadir id al canvas
    this.renderer.setAttribute(canvas, 'id', this.nameTab+'LineChart');
    //añadir el canvas dentro del div
    this.renderer.appendChild(div, canvas);
    //añadir el div al elemento del componente, en este caso bar-chart.component.html
    this.renderer.appendChild(this.el.nativeElement, div);

    this.chart = new Chart(canvas, {
      type: 'line' as ChartType,
      data: data,
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
