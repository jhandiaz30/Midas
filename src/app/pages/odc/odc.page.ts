import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-odc",
  templateUrl: "./odc.page.html",
  styleUrls: ["./odc.page.scss"],
})
export class OdcPage implements OnInit {
  public noAccess: boolean = false; //Muestrelo

  public odc: boolean = true; //Estan ocultos

  constructor(private st: Storage) {}

  async ngOnInit() {
    // Se obtiene el rol del storage
    const odc = await this.st.get("ACC-ODC_OPE");

    //  se realiza la validacion para mostrar el modulo segun el rol
    this.odc = odc != true || odc == null ? true : false;
    this.noAccess = (await (this.odc != true)) ? true : false;
  }
}
