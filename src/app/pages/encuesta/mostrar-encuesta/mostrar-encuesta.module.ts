import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";
import { SignaturePadModule } from 'angular2-signaturepad';


import { MostrarEncuestaPage } from "./mostrar-encuesta.page";
import { ComponentsModule } from "src/app/components/components.module";

const routes: Routes = [
  {
    path: "",
    component: MostrarEncuestaPage,
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
    SignaturePadModule
  ],
  declarations: [MostrarEncuestaPage],
})
export class MostrarEncuestaPageModule {}
