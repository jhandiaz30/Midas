import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignaturePadModule } from 'angular2-signaturepad';

import { IonicModule } from "@ionic/angular";

import { CargardatosComponent } from "./cargardatos.page";
import { ComponentsModule } from "src/app/components/components.module";

const routes: Routes = [
  {
    path: "",
    component: CargardatosComponent,
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
  declarations: [CargardatosComponent],
})
export class CargardatosPageModule {}
