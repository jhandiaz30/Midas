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
export class AccidentesService {
  constructor(private hc: HttpClient, private st: Storage) {}

  //METODO QUE CARGA EL EVENTO DEL FORMULARIO ACCIDENTES
  public async loadEvent() {
    const dataBody = new HttpParams();

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/loadEvent", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    return promesa;
  }

  //METODO QUE CARGA EL MUNICIPIO DEL FORMULARIO ACCIDENTES
  public async loadMunicipio() {
    const dataBody = new HttpParams();

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/loadMunicipio", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    return promesa;
  }

  //METODO QUE CARGA LA CLASE DEL FORMULARIO ACCIDENTES
  public async loadClase() {
    const dataBody = new HttpParams();

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/loadClase", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    return promesa;
  }

  //METODO QUE CARGA EL CONTRATO DEL FORMULARIO ACCIDENTES
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

  //METODO QUE REGISTRA LOS DATOS DEL FORMULARIO DE ACCIDENTES
  public async registerAcci(datos: any) {
    //EL USUARIO SE CARGA DEL STORAGE DEL DISPOSITIVO
    const user = await this.st.get("user");
    //SE CREA EL CUERPO DE LA PETICION
    const dataBody = new HttpParams()
      .set("tipoEvento", datos.eve)
      .set("claseEvento", datos.clasEv)
      .set("municipio", datos.municipio)
      .set("zona", datos.zona)
      .set("claseAccidente", datos.clasAc)
      .set("poblacion", datos.poblacion)
      .set("cedula", datos.cedula)
      .set("nombreAccidentado", datos.nomAcc)
      .set("cargoAccidentado", datos.cargoAcc)
      .set("trabajoNormal", datos.trabajo)
      .set("lugarAccidente", datos.lAcc)
      .set("fechaAccidente", datos.fAcc)
      .set("parteCuerpoAfectado", datos.cAfect)
      .set("descripcion", datos.dAcc)
      .set("nombreReportador", datos.aRepor)
      .set("cargoReportador", datos.cRepor)
      .set("fechaReporte", datos.fRepor + " " + datos.hRepor)
      .set("estadoReporte", datos.eRepor)
      .set("adjunto", null)
      .set("contrato", datos.cont)
      .set("usuario", user);

    console.log(dataBody);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/saveAccidente", dataBody, { headers })
        .subscribe((resp) => {
          console.log(resp);

          resolve(resp);
        });
    });

    return promesa;
  }

  public async editarAccidente() {
    const user = await this.st.get("user");

    const dataBody = new HttpParams().set("id_user", user);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/consultarAccidente", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });

    return promesa;
  }

  public async mostAccidente(idAccidente) {
    const dataBody = new HttpParams().set("id_accidente", idAccidente);
    console.log(idAccidente);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/mostAccidente", dataBody, { headers })
        .subscribe((resp) => {
          resolve(resp);
        });
    });
    return promesa;
  }

  public async editAccidente(datos: any) {
    //EL USUARIO SE CARGA DEL STORAGE DEL DISPOSITIVO
    const user = await this.st.get("user");
    //SE CREA EL CUERPO DE LA PETICION
    const dataBody = new HttpParams()
      .set("tipoEvento", datos.eve)
      .set("claseEvento", datos.clasEv)
      .set("municipio", datos.municipio)
      .set("zona", datos.zona)
      .set("claseAccidente", datos.clasAc)
      .set("poblacion", datos.poblacion)
      .set("cedula", datos.cedula)
      .set("nombreAccidentado", datos.nomAcc)
      .set("cargoAccidentado", datos.cargoAcc)
      .set("trabajoNormal", datos.trabajo)
      .set("lugarAccidente", datos.lAcc)
      .set("fechaAccidente", datos.fAcc)
      .set("parteCuerpoAfectado", datos.cAfect)
      .set("descripcion", datos.dAcc)
      .set("nombreReportador", datos.aRepor)
      .set("cargoReportador", datos.cRepor)
      .set("fechaReporte", datos.fRepor + " " + datos.hRepor)
      .set("estadoReporte", datos.eRepor)
      .set("adjunto", null)
      .set("contrato", datos.cont)
      .set("usuario", user)
      .set("id_accidente", datos.idAccidente);

    let promesa = new Promise((resolve) => {
      this.hc
        .post(path + "/editAccidente", dataBody, { headers })
        .subscribe((resp) => {
          console.log(resp);

          resolve(resp);
        });
    });

    return promesa;
  }
}