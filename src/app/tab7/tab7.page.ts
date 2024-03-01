import { Component, OnInit } from '@angular/core';
import { GestionApiService } from '../services/gestion-api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {

  //variable que se pasan como parametro al componente
  backgroundColorCat: string[] = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ];

  borderColorCat: string[] =[
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ];

  tipoDeChartSeleccionado: string = "bar-chart";

  //array con las categorias para mostrar
  categorias: string[] = [
    "business",
    "entertainment",
    "general",
    "technology",
    "health",
    "science",
    "sports"
  ];

  apiKey: string = environment.apiKey;
  apiUrl: string = environment.apiUrl;

  constructor(public gestionServiceApi: GestionApiService) { }

  ngOnInit() {
    //Mediante el array de categorias, llamamos a la API una vez por cada categoría.
    this.categorias.forEach(categoria => {
      this.gestionServiceApi.cargarCategoria(categoria);
    });
  }

  //Gestionamos el cambio de segmento
  segmentChanged(event: any) {
    //Recogemos el tipo de chart (bar-chart, line-chart o pie-chart), mediante event.detail.value
    this.tipoDeChartSeleccionado = event.detail.value;
    //En caso de bar-chart, realizamos una llamada al api por cada categoria que tenemos.
    if (this.tipoDeChartSeleccionado == "bar-chart"){
      this.categorias.forEach(categoria => {
        this.gestionServiceApi.cargarCategoria(categoria);
      });
    }
  }
}
