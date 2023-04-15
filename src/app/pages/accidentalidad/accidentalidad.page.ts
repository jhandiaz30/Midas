import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

/* SE IMPORTA EL STORAGE */
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-accidentalidad",
  templateUrl: "./accidentalidad.page.html",
  styleUrls: ["./accidentalidad.page.scss"],
})
export class AccidentalidadPage implements OnInit {
  public opciones: FormGroup;
  public noAccess: boolean = false; //MUESTRELO

  public acci: boolean = true; //ESTAN OCULTOS
  public ili: boolean = true; //ESTAN OCULTOS

  constructor(
    private st: Storage,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.opciones = this.fb.group({
      opcion: [""],
    });
  }

  //Metodo que valida la opccion de ruta y direcciona a la pagina
  public opcion() {
    this.router.navigateByUrl("/" + this.opciones.value.opcion);
    console.log(this.opciones.value.opcion);
    this.opciones.reset();
  }

  async ngOnInit() {
    /* SE OBTIENEN LOS ROLES DEL STORAGE */

    const acci = await this.st.get("ACC-ACI_OPE");
    const ili = await this.st.get("ACC-ILI_OPE");

    /* SE REALIZA LA VALIDACION PARA PODER MOSTRAR EL MODULO SEGUN EL ROL */
    this.acci = acci != true || acci == null ? true : false;
    this.ili = ili != true || ili == null ? true : false;
    this.noAccess = (await (this.acci != true || this.ili != true)) ? true : false;
  }
}
