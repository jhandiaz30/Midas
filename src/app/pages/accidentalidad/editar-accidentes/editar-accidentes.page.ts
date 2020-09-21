import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { AccidentesService } from "../../../services/accidentes.service";
import * as moment from "moment";
import { UtilitiesService } from "../../../services/utilities.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-editar-accidentes",
  templateUrl: "./editar-accidentes.page.html",
  styleUrls: ["./editar-accidentes.page.scss"],
})
export class EditarAccidentesPage implements OnInit {
  public accidente: any;
  public formAcc: FormGroup;

  //variables para llamar arreglos
  public loadContratos = [];
  public loadEvent = [];
  public loadMuni = [];
  public loadClass = [];

  //VARIABLES PARA RECUPERAR DATOS DE ACCIDENTE
  public contrato: any;
  //public contratoRta: any;
  public tipoEve: any;

  constructor(
    private accS: AccidentesService,
    private formB: FormBuilder,
    private st: Storage,
    private utilSer: UtilitiesService,
    private router: Router
  ) {
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

      lAcc: [
        "",

        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$"),
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

  // funcion para cargar la respuesta un select

  /*public cargarSelect(){
   var select = this.loadContratos;
   var opc = this.contrato;

   for(var i=0; i<select.length;i++){

     if (select[i].value==opc){

      select[i]=i
    }
    }
  }

  public cargarTipoEve(){
    var select2 = this.loadEvent;
    var tipoEv = this.tipoEve;

    for(var i=0; i<select2.length;i++){

      if (select2[i].value==tipoEv){
 
       select2[i]=i
     }

   } 
 }
*/

  public async sendAccForm() {
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

      lAcc: this.formAcc.value.lAcc,
      fAcc: moment(this.formAcc.value.fAcc).format("YYYY-MM-DD"),
      cAfect: this.formAcc.value.cAfect,
      dAcc: this.formAcc.value.dAcc,
      aRepor: this.formAcc.value.aRepor,
      cRepor: this.formAcc.value.cRepor,
      fRepor: moment(this.formAcc.value.fRepor).format("DD-MM-YYYY"), //Cambiar formato a YYYY-MM-DD
      hRepor: moment(this.formAcc.value.hRepor).format("HH:mm:ss"),
      eRepor: this.formAcc.value.eRepor,
      idAccidente: this.accidente,
    };
    const response = await this.accS.editAccidente(data);

    if (response["error"] != 0) {
      /*SE LIMPIAN LOS CAMPOS DEL FORMULARIO */
      this.formAcc.reset();

      /*MUESTRA UN ALERT */
      await this.utilSer.presentToast("Ocurrio un error, intentelo nuevamente");

      /*REDIRECCIONA A LA PAGINA ACCIDENTALIDAD DESPUES DE HABER REALIZADO LA ACCION */
      this.router.navigateByUrl("/accidentalidad");
    } else {
      /*SE LIMPIAN LOS CAMPOS DEL FORMULARIO */
      this.formAcc.reset();

      /*MUESTRA UN ALERT */
      await this.utilSer.presentToast("Actualizacion exitosa");

      /*REDIRECCIONA A LA PAGINA ACCIDENTALIDAD DESPUES DE HABER REALIZADO LA ACCION */
      this.router.navigateByUrl("/accidentalidad");
    }
  }

  async ngOnInit() {
    const idAccidente = await this.st.get("id_accidente");

    this.accidente = idAccidente;

    const editAccidente = await this.accS.mostAccidente(idAccidente);
    const contrato = await this.accS.loadContrato();
    const evento = await this.accS.loadEvent();
    const muni = await this.accS.loadMunicipio();
    const clase = await this.accS.loadClase();

    if (editAccidente["error"] != 0) {
      console.log(editAccidente["message"]);
    }
    if (evento["error"] != 0) {
      console.log(evento["message"]);
    } else if (muni["error"] != 0) {
      console.log(muni["message"]);
    } else if (clase["error"] != 0) {
      console.log(clase["message"]);
    } else if (contrato["error"] != 0) {
      console.log(contrato["message"]);
    } else {
      this.loadContratos = contrato["message"];
      this.loadEvent = evento["message"];
      this.loadMuni = muni["message"];
      this.loadClass = clase["message"];

      this.formAcc.get("cont").setValue(editAccidente["message"][0].id_contrato);
      this.formAcc.get("eve").setValue(editAccidente["message"][0].id_tipo_eve);
      this.formAcc.get("clasEv").setValue(editAccidente["message"][0].clase_eve);
      this.formAcc.get("municipio").setValue(editAccidente["message"][0].id_municipio);
      this.formAcc.get("zona").setValue(editAccidente["message"][0].zona);
      this.formAcc.get("clasAc").setValue(editAccidente["message"][0].id_clase_acc);
      this.formAcc.get("poblacion").setValue(editAccidente["message"][0].poblacion);
      this.formAcc.get("cedula").setValue(editAccidente["message"][0].cedula_acc);
      this.formAcc.get("nomAcc").setValue(editAccidente["message"][0].nom_accidentado);
      this.formAcc.get("cargoAcc").setValue(editAccidente["message"][0].cargo_accidentado);
      this.formAcc.get("trabajo").setValue(editAccidente["message"][0].t_normal);
      this.formAcc.get("lAcc").setValue(editAccidente["message"][0].lugar_acc);
      this.formAcc.get("fAcc").setValue(editAccidente["message"][0].fecha_acc);
      this.formAcc.get("cAfect").setValue(editAccidente["message"][0].p_cuerpo_afec);
      this.formAcc.get("aRepor").setValue(editAccidente["message"][0].nom_reporta);
      this.formAcc.get("cRepor").setValue(editAccidente["message"][0].cargo_reporta);
      this.formAcc.get("fRepor").setValue(editAccidente["message"][0].fh_reporte);
      this.formAcc.get("hRepor").setValue(editAccidente["message"][0].fh_reporte);
      this.formAcc.get("eRepor").setValue(editAccidente["message"][0].estado_reporte);
      this.formAcc.get("dAcc").setValue(editAccidente["message"][0].descripcion_acc);
    }
  }
}
