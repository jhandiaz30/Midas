import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignaturePadModule } from 'angular2-signaturepad';

import { IonicModule } from "@ionic/angular";

import { EditarEncuestaPage } from "./editar-encuesta.page";
import { ComponentsModule } from "src/app/components/components.module";

const routes: Routes = [
  {
    path: "",
    component: EditarEncuestaPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    SignaturePadModule,
    RouterModule.forChild(routes),
  ],
  declarations: [EditarEncuestaPage],
})
export class EditarEncuestaPageModule {}
