import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { AccidentesService } from "../../../services/accidentes.service";

@Component({
  selector: "app-lista-accidentes",
  templateUrl: "./lista-accidentes.page.html",
  styleUrls: ["./lista-accidentes.page.scss"],
})
export class ListaAccidentesPage implements OnInit {
  // variable tipo arreglo que recibe los accidentes traidos por el metodo editarAccidente
  public accidentes = [];

  constructor(private accS: AccidentesService, private st: Storage) {}

  //metodo que permite guardar el id_accidente en el Storage
  public async editarAccidente(id_accidente) {
    await this.st.set("id_accidente", id_accidente);
  }

  async ngOnInit() {
    // se llama el metodo que muestra los accidentes que estan  registrados en base
    const accidente = await this.accS.editarAccidente();

    if (accidente["error"] != 0) {
      console.log(accidente["message"]);
    } else {
      // se asignan los accidente a la variable accidentes
      this.accidentes = accidente["message"];
    }
  }
}
