import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Article, RespuestaNoticias } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GestionApiService {

  apiKey: string = environment.apiKey;
  apiUrl: string = environment.apiUrl;

  //observable especial de tipo behavioursubject
  private datosSubject: BehaviorSubject<{ categoria: string; totalResults: number }|undefined> = new BehaviorSubject<{ categoria: string; totalResults: number }|undefined>(undefined);
  //observable para gestionar cambios de la api
  public datos$: Observable<{ categoria: string; totalResults: number }|undefined> = this.datosSubject.asObservable();

  constructor(private leerArticulosServicioHttp: HttpClient) { }

  public cargarCategoria(categoria: string) {
    //Realizamos la llamada api y la recogemos en un observable de tipo RespuestaNoticias
    let respuesta: Observable<RespuestaNoticias> = this.leerArticulosServicioHttp.get<RespuestaNoticias>("https://newsapi.org/v2/top-headlines?country=us&category=" + categoria + "&apiKey=" + this.apiKey);
    console.log("respuesta: "+respuesta);
    respuesta.subscribe( data => {
      if (data && data.totalResults !== undefined) {
        //Mediante datosSubject.next, avisamos a todos los suscriptores (en este caso datos$) de que hemos recibido un nuevo valor.
        this.datosSubject.next({ categoria: categoria, totalResults: data.totalResults });
      } else {
        console.error('La propiedad totalResults no está definida en la respuesta:', data);
      }
    });
  }
}
