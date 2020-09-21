import { Component, OnInit } from "@angular/core";

import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilitiesService } from "../../../services/utilities.service";
import { AlertController } from "@ionic/angular";

import { ReglasOroService } from "src/app/services/reglas-oro.service";

@Component({
  selector: "app-cinco-reglas-oro",
  templateUrl: "./cinco-reglas-oro.page.html",
  styleUrls: ["./cinco-reglas-oro.page.scss"],
})
export class CincoReglasOroPage implements OnInit {
  //VALORES INICIALES DE LAS VARIABLES
  public loadPregunta = ["Ninguno"];
  public admin = "Seleccione un contrato";
  public depend = "Seleccione un contrato";
  public periodoCont: any;
  public periodoFinal: any;
  public flagDatePicker: boolean = true;
  public flagEstadisticas: boolean = true;
  public dataEstadisticas: any;

  //INDICA SI SE DEBE REALIZAR UN INSERT O UN UPDATE
  public flagSql: any = "null";

  public formReglas: FormGroup;

  constructor(
    private ReglasSer: ReglasOroService,
    private Utilser: UtilitiesService,
    private formB: FormBuilder,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    /* SE REALIZA LA VALIDACION DE CADA CAMPO DEL FORMULARIO */
    this.formReglas = this.formB.group({
      pregunta: ["", Validators.required],
      periodoContrato: [{ value: "", disabled: true }, Validators.required],
      accIncapacitante: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ]),
      ],
      accNoIncapacitante: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ]),
      ],
      diasPerdidos: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ]),
      ],
      horasHT: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ]),
      ],
    });
  }

  async ngOnInit() {
    await this.Utilser.presentLoading("Un momento");

    const preg = await this.ReglasSer.loadPregunta();

    if (preg["error"] != 0) {
      console.log(preg["message"]);
    } else {
      this.loadPregunta = preg["message"];
    }

    this.Utilser.closePresentLoading();
  }
}
