import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { AlertController, NavParams } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { EncuestaService } from "src/app/services/encuesta.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VerEncuestaService } from "../../services/ver-encuesta.service";

@Component({
  selector: "app-encuesta",
  templateUrl: "./encuesta.page.html",
  styleUrls: ["./encuesta.page.scss"],
})
export class EncuestaPage implements OnInit {
  public nombreApp = ["Ninguno"];
  public opcion = [];
  public formOpc: FormGroup;

  public titulo: any;

  public Ruta = {
    opc: [],
  };

  constructor(
    private st: Storage,
    private EncuestaSer: EncuestaService,
    private Utilser: UtilitiesService,
    public alertController: AlertController,
    public formB: FormBuilder,
    public verEncS: VerEncuestaService,
    private router: Router
  ) {
    this.formOpc = this.formB.group({
      opcion: [""],
    });
  }

  // metodo que evalua a que modulo el usuario se quiere dirigir
  public opciones() {
    this.router.navigateByUrl("/" + this.formOpc.value.opcion);
    this.formOpc.reset();
  }

  //FUNCION QUE CARGA EL ID  DE LA ENCUESTA EN EL STORAGE PARA CARGAR LAS PREGUNTAS
  public async mostrarEnc(encuesta: any) {
    const pregunta = await this.EncuestaSer.loadPregunta(encuesta);

    if (pregunta["error"] != 0) {
      console.log(pregunta["message"]);
    } else {
      await this.st.set("id_app", pregunta["message"][0].ID_APP);
    }
  }

  //FUNCION QUE CARGA EL ID  DE LA ENCUESTA EN EL STORAGE PARA CARGAR LAS RESPUESTAS DE PARA ESA ENCUESTA
  public async rtaEncuesta(encuesta: any) {
    console.log(encuesta);
    await this.st.set("app", encuesta);
  }
  // FUNCION QUE CARGA LOS TITULOS EN EL STORAGE PARA MOSTRAR EL TITULO DE CADA ENCUESTA
  public async mostrarTitulo(titulo: any) {
    await this.st.set("titulo", titulo);
  }

  public async opcionEncuesta(opc: any, i: any) {
    this.opcion[i] = opc;

    console.log(this.opcion);
  }

  async ngOnInit() {
    // SE CARGAN LAS ENCUESTAS SEGUN EL USUARIO
    await this.Utilser.presentLoading("Un momento");
    const app = await this.EncuestaSer.nombreApp();

    if (app["error"] != 0) {
      console.log(app["message"]);
    } else {
      this.nombreApp = app["message"];
    }

    this.Utilser.closePresentLoading();
  }
}
