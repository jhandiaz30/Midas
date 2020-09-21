import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

import { Storage } from "@ionic/storage";
import { timeout, catchError } from 'rxjs/operators';
const path = environment.api;

/* Headers para peticiones externas*/
const headers = new HttpHeaders().set(
  "Content-Type",
  "application/x-www-form-urlencoded; charset=UTF-8"
);

@Injectable({
  providedIn: "root",
})
export class MostrarEncuestaService {
  constructor(private hc: HttpClient, private st: Storage) {}

  /*FUNCION QUE CARGA LOS CONTRATOS EN EL SELECT */
  public async loadContrato() {
    const user = await this.st.get("user");
    const dataBody = new HttpParams().set("id_user", user);
    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/loadContrato", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });
    return promesa;
  }

  /*FUNCION QUE CARGA LA DEPENDENCIA SEGUN EL CONTRATO QUE SE LE PASE */
  public async loadAdminDepend(cont: any) {
    const dataBody = new HttpParams().set("id_contrato", cont);
    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/loadAdminDepend", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });
    return promesa;
  }
  /*FUNCION QUE CARGA LOS DATOS DEL USUARIO */
  public async loadUsuario() {
    const user = await this.st.get("user");
    const dataBody = new HttpParams().set("id_user", user);
    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/loadUsuario", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });
    return promesa;
  }

  //FUNCION QUE CARGA LOS DATOS DE LA APP
  public async loadEncabezado() {
    const encuesta = await this.st.get("id_app");

    const dataBody = new HttpParams().set("id_app", encuesta);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/loadEncabezado", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });
    return promesa;
  }

  //FUNCION QUE CARGA LAS PREGUNTAS SEGUN LA ENCUESTA SELECIONADA
  public async loadPregunta() {
    const encuesta = await this.st.get("id_app");

    const dataBody = new HttpParams().set("id_app", encuesta);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/loadPregunta", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });
    return promesa;
  }

  //FUNCION QUE CARGA LAS OPCIONES DE RESPUESTA DE CADA PREGUNTA
  public async loadOpcionRta(pregu: any) {
    const dataBody = new HttpParams().set("id_pregunta", pregu);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/loadOpcionRta", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });
    return promesa;
  }

  //FUNCION QUE TRAE LA ULTIMA ENCUESTA CREADA
  public async loadTraerEncuesta() {
    const user = await this.st.get("user");

    const dataBody = new HttpParams().set("id_user", user);

    console.log(dataBody);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/loadTraerEncuesta", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });
    return promesa;
  }

  //Registra el encabesado de la encuesta
  public async registrarEncuesta(datos: any) {
    const user = await this.st.get("user");
    const nombreEnc = await this.st.get("id_app");

    const dataBody = new HttpParams()
      .set("numeroCuadrilla", datos.Ncuadrilla)
      .set("numeroConsignacion", datos.NConsignacion)
      .set("nombreJefe", datos.nombreJefe)
      .set("actividad", datos.actividad)
      .set("fechaEncuesta", datos.fechaEncuesta)
      .set("numeroCont", datos.cont)
      .set("nombreEnc", nombreEnc)
      .set("usuario", user);

    console.log(dataBody);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/saveEncuesta", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    return promesa;
  }

  //Registra  las respuestas de cada pregunta
  public async registrarRta(datos: any) {
    const dataBody = new HttpParams()
      .set("pregunta", datos.pregunta)
      .set("respuesta", datos.valor)
      .set("observacion", datos.observacion)
      .set("opcion", datos.opcion)
      .set("image", datos.image)
      .set("id_encuesta", datos.encuesta);

    console.log(dataBody);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/saveRta", dataBody, { headers })
        .pipe(timeout(50000), catchError(e => {
          return 'error';
        }))
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    return promesa;
  }

  //Registra  las respuestas de cada pregunta y finaliza la encuesta
  public async registrarRtaFinal(datos: any) {
    const dataBody = new HttpParams()
      .set("pregunta", datos.pregunta)
      .set("respuesta", datos.valor)
      .set("observacion", datos.observacion)
      .set("opcion", datos.opcion)
      .set("image", datos.image)
      .set("id_encuesta", datos.encuesta);

    console.log(dataBody);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/saveRtaFinal", dataBody, { headers })
        .pipe(timeout(50000), catchError(e => {
          return 'error';
        }))
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    return promesa;
  }

}