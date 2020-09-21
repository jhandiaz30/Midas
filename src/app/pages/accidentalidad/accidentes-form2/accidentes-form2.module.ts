import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AccidentesForm2Page } from "./accidentes-form2.page";
/*SE IMPORTA EL COMPONENTE DEL MENU */
import { ComponentsModule } from "../../../components/components.module";

const routes: Routes = [
  {
    path: "",
    component: AccidentesForm2Page,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AccidentesForm2Page],
})
export class AccidentesForm2PageModule {}
