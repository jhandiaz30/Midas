import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MostrarIliPage } from "./mostrar-ili.page";

const routes: Routes = [
  {
    path: "",
    component: MostrarIliPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MostrarIliPage],
})
export class MostrarIliPageModule {}
