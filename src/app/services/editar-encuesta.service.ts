import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Storage } from '@ionic/storage';
import { timeout, catchError } from 'rxjs/operators';

const path = environment.api;
const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

@Injectable({
  providedIn: 'root',
})
export class EditarEncuestaService {
  constructor(private hc: HttpClient) {}

  // funcion que trae las respuestas de las preguntas
  public async loadRtaPreguntas(idEncuesta: any) {
    const dataBody = new HttpParams().set('id_encuesta', idEncuesta);
    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/loadRtaPreguntas', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }

  //funcion que actualiza el encabezado de la encuesta
  public async editarEncuesta(datos: any) {
    const dataBody = new HttpParams()
      .set('numeroCuadrilla', datos.Ncuadrilla)
      .set('numeroConsignacion', datos.NConsignacion)
      .set('nombreJefe', datos.nombreJefe)
      .set('actividad', datos.actividad)
      .set('fechaEncuesta', datos.fechaEncuesta)
      .set('numeroCont', datos.cont)
      .set('id_encuesta', datos.numeroEnc);

    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/editarEncabezadoEncuesta', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });

    return promesa;
  }

  //Función que actualiza y finaliza el estado de la encuesta
  public async finalizarEncuesta(datos: any) {
    const dataBody = new HttpParams()
      .set('numeroCuadrilla', datos.Ncuadrilla)
      .set('numeroConsignacion', datos.NConsignacion)
      .set('nombreJefe', datos.nombreJefe)
      .set('actividad', datos.actividad)
      .set('fechaEncuesta', datos.fechaEncuesta)
      .set('numeroCont', datos.cont)
      .set('id_encuesta', datos.numeroEnc);

    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/finalizarEncabezadoEncuesta', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });

    return promesa;
  }

  //funcion que actualiza las respuestas de cada pregunta
  public async editarRtas(datos: any) {
    const dataBody = new HttpParams()
      .set('pregunta', datos.pregunta)
      .set('respuesta', datos.valor)
      .set('observacion', datos.observacion)
      .set('opcion', datos.opcion)
      .set('image', datos.image)
      .set('id_encuesta', datos.encuesta);
    //.set('id_respuesta', datos.idRta)

    console.log('Console log Databody: ' + dataBody);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + '/editarRtasEncuesta', dataBody, { headers })
        .pipe(timeout(50000), catchError(e => {
          return 'error';
        }))
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    console.log('Promesa: ' + JSON.stringify(promesa));
    return promesa;
  }

  //Elimina las encuestas diligenciadas
  public async eliminarEncuesta(datos: any) {
    const dataBody = new HttpParams().set('id_encuesta', datos.numeroEnc);

    console.log(dataBody);

    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/eliminarEncuesta', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });

    return promesa;
  }
}
