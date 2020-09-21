import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

const path = environment.api;
const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

@Injectable({
  providedIn: 'root',
})
export class ParametrizacionService {
  constructor(private hc: HttpClient) {}

  /* FUNCION QUE CARGA EL CONTENIDO DEL HOME */
  public async contenidoHome() {
    let promesa = new Promise((resolve) => {
      this.hc.get(path + '/contenidoHome', { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }
}
