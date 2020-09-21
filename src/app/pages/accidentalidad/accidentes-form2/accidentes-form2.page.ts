import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
/*SE IMPORTAN LAS LIBRERIAS QUE SIRVE PARA VALIDAR LOS FORMULARIOS */
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
/*LIBRERIA PARA FORMATEAR FECHAS */
import * as moment from "moment";
/* SE IMPORTA LOS SERVICIO */
import { UtilitiesService } from "../../../services/utilities.service";
import { AccidentesService } from "../../../services/accidentes.service";

@Component({
  selector: "app-accidentes-form2",
  templateUrl: "./accidentes-form2.page.html",
  styleUrls: ["./accidentes-form2.page.scss"],
})
export class AccidentesForm2Page implements OnInit {
  public formAcc2: FormGroup;

  //OBJETO PARA ALMACENAR LOS DATOS DEL FORMULARIO ANTERIOR
  public datos: any;

  constructor(
    private activateR: ActivatedRoute,
    private formB: FormBuilder,
    private acciSer: AccidentesService,
    private utilSer: UtilitiesService,
    private router: Router
  ) {
    /* SE REALIZA LA VALIDACION DE CADA CAMPO DEL FORMULARIO */
    this.formAcc2 = this.formB.group({
      lAcc: [
        "",

        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9-a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$"),
        ]),
      ],
      fAcc: ["", Validators.required],
      cAfect: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$"),
        ]),
      ],
      aRepor: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$"),
        ]),
      ],
      cRepor: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9-a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$"),
        ]),
      ],
      fRepor: ["", Validators.required],
      hRepor: ["", Validators.required],
      eRepor: ["", Validators.required],
      dAcc: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
    });
  }

  /* ESTE METODO ENVIA TODOS LOS CAMPOS PARA SER INSERTADOS EN BD */
  public async sendData() {
    /*SE PRESENTA EL LOADING */
    await this.utilSer.presentLoading("Un momento, por favor");

    /*SE ASIGNAN LOS VALORES DEL FORMULARIO AL OBJETO DE DATOS */
    this.datos.lAcc = this.formAcc2.value.lAcc;
    this.datos.fAcc = moment(this.formAcc2.value.fAcc).format("YYYY-MM-DD");
    this.datos.cAfect = this.formAcc2.value.cAfect;
    this.datos.dAcc = this.formAcc2.value.dAcc;
    this.datos.aRepor = this.formAcc2.value.aRepor;
    this.datos.cRepor = this.formAcc2.value.cRepor;
    this.datos.fRepor = moment(this.formAcc2.value.fRepor).format("DD-MM-YYYY"); //Cambiar el formato a YYYY-MM-DD para que quede con la BD de la ESSA
    this.datos.hRepor = moment(this.formAcc2.value.hRepor).format("HH:mm:ss");
    this.datos.eRepor = this.formAcc2.value.eRepor;

    const response = await this.acciSer.registerAcci(this.datos);

    if (response["error"] != 0) {
      /*SE LIMPIAN LOS CAMPOS DEL FORMULARIO */
      this.formAcc2.reset();

      /*MUESTRA UN ALERT */
      await this.utilSer.presentToast("Ocurrio un error, intentelo nuevamente");

      this.utilSer.closePresentLoading();

      /*REDIRECCIONA A LA PAGINA ACCIDENTALIDAD DESPUES DE HABER REALIZADO LA ACCION */
      this.router.navigateByUrl("/accidentalidad");
    } else {
      /*SE LIMPIAN LOS CAMPOS DEL FORMULARIO */
      this.formAcc2.reset();

      /*MUESTRA UN ALERT */
      await this.utilSer.presentToast("Registro exitoso");

      this.utilSer.closePresentLoading();

      /*REDIRECCIONA A LA PAGINA ACCIDENTALIDAD DESPUES DE HABER REALIZADO LA ACCION */
      this.router.navigateByUrl("/accidentalidad");
    }
  }

  ngOnInit() {
    /* SE RECIBEN LOS DATOS QUE VIENEN DEL FORMULARIO DE ACCIDENTES-FORM */
    this.datos = JSON.parse(this.activateR.snapshot.paramMap.get("datos"));
  }
}
