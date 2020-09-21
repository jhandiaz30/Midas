import { Component, OnInit } from "@angular/core";
import { VerEncuestaService } from "../../../services/ver-encuesta.service";
import { Storage } from "@ionic/storage";
import { Validators, FormBuilder, FormGroup, FormsModule, FormControl, } from "@angular/forms";
import { EncuestaService } from "src/app/services/encuesta.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-ver-encuesta",
  templateUrl: "./ver-encuesta.page.html",
  styleUrls: ["./ver-encuesta.page.scss"],
})
export class VerEncuestaPage implements OnInit {
  public respuestaEncuesta = [];
  public titulo = "sin titulo";

  public formOpc: FormGroup;

  public Form = {
    opc: [],
  };

  constructor(
    private verEncS: VerEncuestaService,
    private st: Storage,
    private formB: FormBuilder,
    private encS: EncuestaService,
    private router: Router
  ) {
    this.formOpc = this.formB.group({
      opc: [""],
    });
  }

  // metodo que trae los datos de las encuestas registrados en base de datos
  public async idEncuesta(rtaEncuesta: any) {
    await this.st.set("idEncuesta", rtaEncuesta.id_encuesta);

    let datos = {
      idEncuesta: rtaEncuesta.id_encuesta,
      contrato: rtaEncuesta.numero,
      admin: rtaEncuesta.coordinador,
      numGrupo: rtaEncuesta.numero_grupo_trabajo,
      numConsignacion: rtaEncuesta.numero_de_consignacion,
      nombre_jefe: rtaEncuesta.nombre_jefe_consignacion,
      actividad: rtaEncuesta.actividad_realizar,
      fechaEncuesta: rtaEncuesta.fecha_encuesta,
      idcontrato: rtaEncuesta.id_contrato,
    };

    // se envian los datos a editar encuesta
    this.router.navigateByUrl("/editar-encuesta/" + JSON.stringify(datos));
  }

  async ngOnInit() {
    // se llama la variable app guardada en el Storage
    const encuesta = await this.st.get("app");

    // se llaman las respuestas del encabezado de la encuesta
    const rtaEncuesta = await this.verEncS.loadEncuesta(encuesta);

    if (rtaEncuesta["error"] != 0) {
      console.log(rtaEncuesta["message"]);
    } else {
      this.respuestaEncuesta = rtaEncuesta["message"];
      //se llama la variable titulo guardada en el Storage
      this.titulo = await this.st.get("titulo");
    }
  }
}
