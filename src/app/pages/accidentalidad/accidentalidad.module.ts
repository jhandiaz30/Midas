import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AccidentalidadPage } from "./accidentalidad.page";

/*SE IMPORTA EL COMPONENTE DEL MENU */
import { ComponentsModule } from "../../components/components.module";

const routes: Routes = [
  {
    path: "",
    component: AccidentalidadPage,
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
  declarations: [AccidentalidadPage],
})
export class AccidentalidadPageModule {}
