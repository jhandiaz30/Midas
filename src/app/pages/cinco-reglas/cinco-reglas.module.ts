import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { CincoReglasPage } from "./cinco-reglas.page";
/*SE IMPORTA EL COMPONENTE DEL MENU */
import { ComponentsModule } from "../../components/components.module";

const routes: Routes = [
  {
    path: "",
    component: CincoReglasPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CincoReglasPage],
})
export class CincoReglasPageModule {}
