import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

import { Storage } from "@ionic/storage";

const path = environment.api;

/* Headers para peticiones externas*/
const headers = new HttpHeaders().set(
  "Content-Type",
  "application/x-www-form-urlencoded; charset=UTF-8"
);

@Injectable({
  providedIn: "root",
})
export class VerEncuestaService {
  constructor(private hc: HttpClient, private st: Storage) {}

  // funcion que trae las encuestas registradas en base de datos
  public async loadEncuesta(encuesta: any) {
    const user = await this.st.get("user");

    console.log(user);

    console.log(encuesta);
    const dataBody = new HttpParams()
      .set("id_app", encuesta)
      .set("usuario", user);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/loadEncuesta", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    return promesa;
  }
}
