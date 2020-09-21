import { Component, OnInit } from "@angular/core";
/*SE IMPORTAN LAS LIBRERIAS QUE SIRVE PARA VALIDAR LOS FORMULARIOS */
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AccidentesService } from "../../../services/accidentes.service";
import { UtilitiesService } from "../../../services/utilities.service";

@Component({
  selector: "app-accidentes-form",
  templateUrl: "./accidentes-form.page.html",
  styleUrls: ["./accidentes-form.page.scss"],
})
export class AccidentesFormPage implements OnInit {
  public loadEvent = ["Ninguno"];
  public loadMuni = ["Ninguno"];
  public loadClass = ["Ninguno"];
  public loadContrato = ["Ninguno"];

  public formAcc: FormGroup;

  constructor(
    private Accser: AccidentesService,
    private UtilSer: UtilitiesService,
    private formB: FormBuilder,
    private router: Router
  ) {
    /* SE REALIZA LA VALIDACION DE CADA CAMPO DEL FORMULARIO */
    this.formAcc = this.formB.group({
      cont: ["", Validators.required],
      eve: ["", Validators.required],
      clasEv: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$"),
        ]),
      ],
      municipio: ["", Validators.required],
      zona: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$"),
        ]),
      ],
      clasAc: ["", Validators.required],
      poblacion: ["", Validators.required],
      cedula: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ]),
      ],
      nomAcc: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$"),
        ]),
      ],
      cargoAcc: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9-a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$"),
        ]),
      ],
      trabajo: ["", Validators.required],
    });
  }

  /* ESTA FUNCION PERMITE ENVIAR LOS DATOS DEL FORM 1 AL FORM 2 */
  public sendAccForm() {
    /* EN LA VARIABLE DATA SE ALMACENA EL VALOR DE CADA CAMPO DEL FORMULARIO*/
    let data = {
      eve: this.formAcc.value.eve,
      clasEv: this.formAcc.value.clasEv,
      municipio: this.formAcc.value.municipio,
      zona: this.formAcc.value.zona,
      clasAc: this.formAcc.value.clasAc,
      poblacion: this.formAcc.value.poblacion,
      cedula: this.formAcc.value.cedula,
      nomAcc: this.formAcc.value.nomAcc,
      cargoAcc: this.formAcc.value.cargoAcc,
      trabajo: this.formAcc.value.trabajo,
      cont: this.formAcc.value.cont,
    };

    /* SE REENVIAN LOS DATOS AL SIGUIENTE FORMULARIO */
    this.router.navigateByUrl("/accidentes-form2/" + JSON.stringify(data));

    /* SE LIMPIA EL FORMULARIO */
    this.formAcc.reset();
  }

  async ngOnInit() {
    /*SE PRESENTA EL LOADING PARA PODER CARGAR EL VALOR DE LOS SELECT DESDE LA BD */
    await this.UtilSer.presentLoading("Un momento");

    /*SE CARGA LA INFORMACION NECESARIA PARA EL LLENADO DE LOS COMBOS */
    const evento = await this.Accser.loadEvent();
    const muni = await this.Accser.loadMunicipio();
    const clase = await this.Accser.loadClase();
    const contrato = await this.Accser.loadContrato();

    /*SE VALIDA EL MENSAJE DE ERROR QUE RETORNA EL SERVICIO DESDE EL SERVICIO REST */
    if (evento["error"] != 0) {
      console.log(evento["message"]);
    } else if (muni["error"] != 0) {
      console.log(muni["message"]);
    } else if (clase["error"] != 0) {
      console.log(clase["message"]);
    } else if (contrato["error"] != 0) {
      console.log(contrato["message"]);
    } else {
      /*SE ASIGNA LA INFORMACION HACIA CADA COMBO DE LA PAGINA */
      this.loadEvent = evento["message"];
      this.loadMuni = muni["message"];
      this.loadClass = clase["message"];
      this.loadContrato = contrato["message"];
    }
    /*SE CIERRA EL LOADING*/
    this.UtilSer.closePresentLoading();
  }
}
