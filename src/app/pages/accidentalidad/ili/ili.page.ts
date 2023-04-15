import { Component, OnInit } from "@angular/core";
/*SE IMPORTAN LAS LIBRERIAS QUE SIRVE PARA VALIDAR LOS FORMULARIOS */
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { IliService } from "../../../services/ili.service";
import { UtilitiesService } from "../../../services/utilities.service";
import { AlertController } from "@ionic/angular";

/*LIBRERIA PARA FORMATEAR FECHAS */
import * as moment from "moment";

@Component({
  selector: "app-ili",
  templateUrl: "./ili.page.html",
  styleUrls: ["./ili.page.scss"],
})
export class IliPage implements OnInit {
  //VALORES INICIALES DE LAS VARIABLES
  public loadContrato = ["Ninguno"];
  public admin = "Seleccione un contrato";
  public depend = "Seleccione un contrato";
  public periodoCont: any;
  public periodoFinal: any;
  public flagDatePicker: boolean = true;
  public flagEstadisticas: boolean = true;
  public dataEstadisticas: any;

  //INDICA SI SE DEBE REALIZAR UN INSERT O UN UPDATE
  public flagSql: any = "null";

  public formIli: FormGroup;

  constructor(
    private Iliser: IliService,
    private Utilser: UtilitiesService,
    private formB: FormBuilder,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    /* SE REALIZA LA VALIDACION DE CADA CAMPO DEL FORMULARIO */
    this.formIli = this.formB.group({
      cont: ["", Validators.required],
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

  /* ESTA FUNCION PERMITE TREAER EL CONTRATO Y PARTIENDO DE ESTE TRAE EL ADMIN Y DEPENDENCIA DEL MISMO */
  public async selectAdminDepend(cont: any) {
    await this.Utilser.presentLoading("Un momento");

    // SE LIMPIA EL CAMPO FECHA DEL FORMULARIO ILI
    this.formIli.get("periodoContrato").reset();
    this.formIli.get("accIncapacitante").reset();
    this.formIli.get("accNoIncapacitante").reset();
    this.formIli.get("diasPerdidos").reset();
    this.formIli.get("horasHT").reset();

    const rta = await this.Iliser.loadAdminDepend(cont);

    if (rta["error"] != 0) {
      console.log(rta["message"]);
    } else {
      this.admin = rta["message"][0].N_COORDINADOR;
      this.depend = rta["message"][0].N_DEPENDENCIA;
      this.periodoCont = rta["message"][0].FECHA_INICIAL;
      this.periodoFinal = rta["message"][0].FECHA_FINAL;

      //SE HABILITA EL DATEPICKER DEL PERIODO
      this.formIli.get("periodoContrato").enable();

      const estadistica = await this.Iliser.loadEstadisticas(cont);

      if (estadistica["error"] != 0) {
        console.log(estadistica["message"]);
      } else {
        this.flagEstadisticas = false;

        this.dataEstadisticas = estadistica["message"];
      }
    }

    this.Utilser.closePresentLoading();
  }

  /* ESTE METODO ENVIA TODOS LOS CAMPOS PARA SER INSERTADOS EN BD */
  public async sendData() {
    /*SE PRESENTA EL LOADING */
    await this.Utilser.presentLoading("Un momento, por favor");

    let datos = {
      cont: this.formIli.value.cont,
      accIncapacitante: this.formIli.value.accIncapacitante,
      accNoIncapacitante: this.formIli.value.accNoIncapacitante,
      diasPerdidos: this.formIli.value.diasPerdidos,
      horasHT: this.formIli.value.horasHT,
      periodoContrato: moment(this.formIli.value.periodoContrato).format(
        "YYYY-MM"
      ),
      flagSql: this.flagSql,
    };

    console.log(datos);

    const response = await this.Iliser.registerIli(datos);

    console.log(response);

    if (response["error"] != 0) {
      /* MUESTRA UN ALERT */
      await this.Utilser.presentToast("Ocurrio un error, intentelo nuevamente");

      this.Utilser.closePresentLoading();

      /*REDIRECCIONA A LA PAGINA ACCIDENTALIDAD DESPUES DE HABER REALIZADO LA ACCION */
      this.router.navigateByUrl("/accidentalidad");
    } else {
      await this.Utilser.presentToast("Registro exitoso");

      this.Utilser.closePresentLoading();

      /*REDIRECCIONA A LA PAGINA ACCIDENTALIDAD DESPUES DE HABER REALIZADO LA ACCION */
      this.router.navigateByUrl("/accidentalidad");
    }
  }

  //METODO QUE VERIFICA SEGUN LA FECHA SI YA EXISTE UN ILI ASOCIADO AL CONTRATO SELECCIONADO
  public async validateDateIli(fecha: any) {
    let cont = this.formIli.value.cont;
    //SE FORMATEA EL AÑO DE LA FECHA
    let anioPerido = moment(fecha).format("YYYY");
    //SE FORMATEA EL MES DE LA FECHA
    let mesPeriodo = moment(fecha).format("MM");

    await this.Utilser.presentLoading("Un momento");

    const verificar = await this.Iliser.verificarIli(
      cont,
      anioPerido,
      mesPeriodo
    );

    //SI ES 0 LA VARIABLE FLAGSQL ES FALSE, SE DEBE REALIZAR UPDATE
    if (verificar["error"] == 0) {
      console.log(verificar);

      await this.Utilser.closePresentLoading();

      this.flagSql = verificar["message"][0].id_ili;

      const alert = await this.alertCtrl.create({
        header: "Aviso",
        message:
          "Ya existe un ILI para la fecha seleecionada, ¿desea actualizarlo?",
        backdropDismiss: false,
        buttons: [
          {
            text: "Cancelar",
            handler: () => {
              // SE LIMPIA EL CAMPO FECHA DEL FORMULARIO ILI
              this.formIli.get("periodoContrato").reset();
            },
          },
          {
            text: "Ok",
            handler: () => {
              //SE SETEAN LOS CAMPOS PARA PODER SER NUEVAMENTE ACTUALIZADOS
              this.formIli
                .get("accIncapacitante")
                .setValue(verificar["message"][0].acc_incap);
              this.formIli
                .get("accNoIncapacitante")
                .setValue(verificar["message"][0].acc_noincap);
              this.formIli
                .get("diasPerdidos")
                .setValue(verificar["message"][0].dias_perdidos);
              this.formIli
                .get("horasHT")
                .setValue(verificar["message"][0].horas_ht);
            },
          },
        ],
      });

      await alert.present();
    } else if (verificar["error"] == 2) {
      await this.Utilser.closePresentLoading();

      this.flagSql = "null";
    }
  }

  //METODO QUE ENVIA LOS DATOS DEL FORMULARIO DE ILI A LA PAGINA DE ESTADISTICAS
  public async sendEstadisticas() {
    this.router.navigateByUrl(
      "/estadisticas/" + JSON.stringify(this.dataEstadisticas)
    );
  }

  async ngOnInit() {
    /*SE PRESENTA EL LOADING PARA PODER CARGAR EL VALOR DE LOS SELECT DESDE LA BD */
    await this.Utilser.presentLoading("Un momento");

    const contrato = await this.Iliser.loadContrato();

    if (contrato["error"] != 0) {
      console.log(contrato["message"]);
    } else {
      this.loadContrato = contrato["message"];
    }

    this.Utilser.closePresentLoading();
  }
}
