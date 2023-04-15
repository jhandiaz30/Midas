import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { EditarAccidentesPage } from "./editar-accidentes.page";

import { ComponentsModule } from "../../../components/components.module";

const routes: Routes = [
  {
    path: "",
    component: EditarAccidentesPage,
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
  declarations: [EditarAccidentesPage],
})
export class EditarAccidentesPageModule {}
