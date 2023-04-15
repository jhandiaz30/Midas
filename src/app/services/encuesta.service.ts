import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

import { Storage } from "@ionic/storage";

const path = environment.api;

const headers = new HttpHeaders().set(
  "Content-Type",
  "application/x-www-form-urlencoded; charset=UTF-8"
);

@Injectable({
  providedIn: "root",
})
export class EncuestaService {
  constructor(private hc: HttpClient, private st: Storage) {}

  // METODO QUE PERMITE CARGAR LAS ENCUESTAS
  public async nombreApp() {
    const user = await this.st.get("user");

    const dataBody = new HttpParams().set("id_user", user);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/nombreApp", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    return promesa;
  }

  //METODO QUE PERMITE CARGAR LAS PREGUNTAS  POR ENCUESTA
  public async loadPregunta(encuesta: any) {
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

  //se registra el encabezado de la encuesta
  public async registrarEncuesta(datos: any) {
    const user = await this.st.get("user");
    const app = await this.st.get("id_app");

    const dataBody = new HttpParams()
      .set("numeroCont", datos.cont)
      .set("usuario", user)
      .set("numeroCuadrilla", datos.Ncuadrilla)
      .set("numeroConsignacion", datos.NConsignacion)
      .set("nombreJefe", datos.nombreJefe)
      .set("actividad", datos.actividad)
      .set("app", app)
      .set("encuesta", datos.flagSql);

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
}
