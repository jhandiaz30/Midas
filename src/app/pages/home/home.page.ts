import { Component, OnInit } from '@angular/core';

/*PLUGIN STORAGE */
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
import { MostrarEncuestaService } from 'src/app/services/mostrar-encuesta.service';
import { ParametrizacionService } from 'src/app/services/parametrizacion.service';
import { async } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { DbService } from './../../services/db.service';
import { UtilitiesService } from './../../services/utilities.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public usuario: any;
  public contenidoHome: any = '';
  public imageUrl: any = '';
  public conexion: any;
  Data: any[] = []
  toast: any;
  utilServ: any;


  constructor(private st: Storage,     private MosSer: MostrarEncuestaService,
    private parametrizacionService: ParametrizacionService, private domSanitizer: DomSanitizer,private db: DbService ,private Utilser: UtilitiesService
    ) {}

  async ngOnInit() {
    /* ESTA PROMESA RETORNA que tipo de conexion se está realizando offline (base de datos local o a traves de la db del servidor) */
    this.conexion = await this.st.get('conexion');
    //R
if( this.conexion=="offline"){

  let promesa = new Promise(async () => {
    this.usuario = await this.st.get('name');
  
  });
  // Se llama del contenido del HOME
  const contenido = await this.db.contenidoHome();
     this.Data=[];
  
        this.contenidoHome = contenido['message'][0];
        this.imageUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/svg+xml;base64,' + this.contenidoHome.imagen);
        console.log(this.imageUrl);    

}

     else{
  let promesa = new Promise(async () => {
    this.usuario = await this.st.get('name');
  });

  // Se llama del contenido del HOME
  const contenidoServ = await this.parametrizacionService.contenidoHome();

  if (contenidoServ['error'] != 0) {
    console.log(contenidoServ['message']);
  } else {
    this.contenidoHome = contenidoServ['message'][0];
    this.imageUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/svg+xml;base64,' + this.contenidoHome.imagen);
    console.log(this.imageUrl);
  }

  /* return promesa;*/
     
     }
  }

}

  