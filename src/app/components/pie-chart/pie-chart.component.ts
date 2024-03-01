import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto'

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent  implements OnInit {

  public chart!: Chart;
  @Input() nameTab: string = "";

  constructor(private el: ElementRef, private renderer: Renderer2) { }

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

    const div = this.renderer.createElement('div');
    //establecer las propiedades del div como si fuesen los atrib en el archivo html
    this.renderer.setStyle(div, 'width', '100%');
    this.renderer.setStyle(div, 'height', '100%');
    this.renderer.setStyle(div, 'margin', 'auto');
    this.renderer.setStyle(div, 'text-align', 'center');
    //indicar el atributo id en el div
    this.renderer.setAttribute(div, 'id', 'container'+this.nameTab+'PieChart');

    //crear el canvas
    const canvas = this.renderer.createElement('canvas');
    //añadir id al canvas
    this.renderer.setAttribute(canvas, 'id', this.nameTab+'PieChart');
    //añadir el canvas dentro del div
    this.renderer.appendChild(div, canvas);
    //añadir el div al elemento del componente, en este caso bar-chart.component.html
    this.renderer.appendChild(this.el.nativeElement, div);

    this.chart = new Chart(canvas, {
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
