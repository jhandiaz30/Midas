import { Component, OnInit } from '@angular/core';

/*PLUGIN STORAGE */
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
import { ParametrizacionService } from 'src/app/services/parametrizacion.service';
import { async } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public usuario: any;
  public contenidoHome: any = '';
  public imageUrl: any = '';

  constructor(private st: Storage, private parametrizacionService: ParametrizacionService, private domSanitizer: DomSanitizer) {}

  async ngOnInit() {
    /* ESTA PROMESA RETORNA EL NOMBRE DEL USUARIO LOGUEADO */
    let promesa = new Promise(async () => {
      this.usuario = await this.st.get('name');
    });

    // Se llama del contenido del HOME
    const contenido = await this.parametrizacionService.contenidoHome();

    if (contenido['error'] != 0) {
      console.log(contenido['message']);
    } else {
      this.contenidoHome = contenido['message'][0];
      this.imageUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/svg+xml;base64,' + this.contenidoHome.imagen);
      console.log(this.imageUrl);
    }

    /* return promesa; */
  }
}
