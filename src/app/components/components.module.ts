import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from '../components/menu/menu.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { AtrasComponent } from '../components/atras/atras.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MenuComponent,
    LogoutComponent,
    AtrasComponent,
   

  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MenuComponent,
    LogoutComponent,
    AtrasComponent,
  ]
})
export class ComponentsModule { }
