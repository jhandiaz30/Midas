import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
/*SE IMPORTAN LOS COMPONENTES PROPIOS DE IONIC  */
import { IonicModule } from "@ionic/angular";
/*SE IMPORTA EL COMPONENTE HOME */
import { HomePage } from "./home.page";
/*SE IMPORTA EL COMPONENTE DEL MENU */
import { ComponentsModule } from "../../components/components.module";

const routes: Routes = [
  {
    path: "",
    component: HomePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
