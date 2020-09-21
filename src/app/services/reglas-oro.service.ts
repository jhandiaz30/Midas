import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

import { Storage } from "@ionic/storage";
import { resolve } from "url";

const path = environment.api;

/* Headers para peticiones externas*/
const headers = new HttpHeaders().set(
  "Content-Type",
  "application/x-www-form-urlencoded; charset=UTF-8"
);

@Injectable({
  providedIn: "root",
})
export class ReglasOroService {
  constructor(private hc: HttpClient, private st: Storage) {}

  //Funcion que carga las preguntas
  public async loadPregunta() {
    const dataBody = new HttpParams();

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/loadPregunta", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    return promesa;
  }
}
