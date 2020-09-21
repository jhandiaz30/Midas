import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

/*PLUGIN STORAGE */
import { Storage } from "@ionic/storage";

const path = environment.api;

/*Headers para peticiones externas */
const headers = new HttpHeaders().set(
  "Content-Type",
  "application/x-www-form-urlencoded; charset=UTF-8"
);

@Injectable({
  providedIn: "root",
})
export class IliService {
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

  /*METODO QUE GESTIONA LA CREACION DEL ILI DE ACUERDO AL AÑO Y MES DEL CONTRATO*/
  public async verificarIli(cont: any, anio: any, mes: any) {
    const dataBody = new HttpParams()
      .set("id_contrato", cont)
      .set("anio", anio)
      .set("mes", mes);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/verificarIli", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    return promesa;
  }

  /*METODO QUE PERMITE REGISTRAR EL ILI */
  public async registerIli(datos: any) {
    //EL USUARIO SE CARGA DEL STORAGE DEL DISPOSITIVO
    const user = await this.st.get("user");

    //SE CREA EL CUERPO DE LA PETICION
    const dataBody = new HttpParams()
      .set("numeroCont", datos.cont)
      .set("usuario", user)
      .set("accidentesIncapacitantes", datos.accIncapacitante)
      .set("accidentesNoIncapacitantes", datos.accNoIncapacitante)
      .set("diasPerdidos", datos.diasPerdidos)
      .set("horasHombres", datos.horasHT)
      .set("periodoContrato", datos.periodoContrato)
      .set("id_ili", datos.flagSql);

    console.log(dataBody);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/saveIli", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    return promesa;
  }

  //METODO QUE PERMITE CARGAR LAS ESTADISTICA SEGUN EL CONTRATO SELECCIONADO
  public async loadEstadisticas(cont: any) {
    const dataBody = new HttpParams().set("id_contrato", cont);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/loadEstadisticas", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    return promesa;
  }
}