import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from "../../services/utilities.service";
import { AuthService } from "../../services/auth.service";
import { DbService } from '../../services/db.service';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage';
import { AlertController, Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';


import { NavController, MenuController, Events, ToastController } from "@ionic/angular";

@Component({
  selector: 'app-cargardatos',
  templateUrl: './cargardatos.component.html',
  styleUrls: ['./cargardatos.component.scss'],
})
export class CargardatosComponent implements OnInit {
  public loadusuarios = [];
  public formLogin: FormGroup;
  Data: any[] = [];
  toast: any;
  public offline: boolean=true;
  public text: string="Ofline activo";
  public loadUsurol = [];
  public loadRoles = [];
  public loadApp = [];
  public loadPreguntas=[];
  public loadPregopc=[];
  public loadOpcionesrta=[];
  public loadContrato=[];
  public loadUsucont=[];
  public loadDependecia=[];
  public loadContenido=[];
  public hab:boolean=true;
  showAlert: boolean;

  constructor(
    private utilServ: UtilitiesService,
    private authServ: AuthService,
    private db: DbService,
    private navCtrl: NavController,
    private router: Router,
    private formB: FormBuilder,
    private st:       Storage,
    private alert: AlertController,
    public Network:Network



  ) {
    this.formLogin = this.formB.group({
      usuario: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
    });
  }

  //PARA EL DESCARGUE DE MAESTROS SE HACE LA MISMA VERIFICACION DE INICIO DE SESION, PERO YA DIRECTAMENTE CON EL SERVIDOR DE LA EMPRESA

  public async login() {
    //SE MUESTRA GIF CARGANDOs
  
    
    
    await this.utilServ.presentLoading("Espere un momento...");
    //SE VALIDA EL USUARIO
    const valid = await this.authServ.login(
      this.formLogin.value.usuario,
      this.formLogin.value.password
    );
     console.log(valid);

   
    //SI LA PROMESA RETORNA UN TRUE SE DEJA INGRESAR AL USUARIO
    if (valid != true) {
      //SI EL USUARIO NO ES VALIDO SE CIERRA EL LOADING Y SE MUESTRA UN MENSAJE TOAST, POR ULTIMO SE RESETEA EL FORMULARIO DE LOGIN
      await this.utilServ.closePresentLoading();
      //SE RESETEA EL FORMULARIO
      this.formLogin.reset();
      //SE MUESTRA MENSAJE DE USUARIO INVALIDO
      this.utilServ.presentToast("Usuario Invalido");
    } else {
      //SI EL USUARIO ES VALIDO SE REDIRIGE EL ROOT DE LA APP HACIA EL HOME
      await this.utilServ.closePresentLoading();
      
  //SI EL USUARIO NO ES INVALIDO TENDRA ACCESO AL METODO DESCARGAR DATOS   
this.descargarDatos();
      
    }
        await this.utilServ.closePresentLoading();


  }

  public  async comprobarConexion(){

if(this.hab==true){
    
    this.alert
      .create({
        header: '¡Importante!',
        cssClass: 'ion-text-center',
        subHeader: '¿Deseas hacer el cargue de los datos?',
        buttons: [
          {
            text: 'Cancelar',
          },
          {
            text: 'Continuar',
            handler: () => {
              
              
                this.subirDatos();
              

            },
          },
        ],
      })
      .then((confirmElement) => {
        confirmElement.present();
      });
    
}else if(this.hab==false){
  let toast2 = await this.toast.create({
    message: 'No carga',
    duration: 2500
  });
  toast2.present(); 
}else{
  let toast2 = await this.toast.create({
    message: 'No carga',
    duration: 2500
  });
}
  } 
  //SE SUVEN TO
  public async subirDatos(){
    await this.utilServ.presentLoading("Espere un momento...");
    

    const usuarios = await this.authServ.loadUsuarios();
    console.log('Console log de preg: ' + JSON.stringify(usuarios));
    this.loadusuarios = usuarios['message'];
    console.log(this.loadusuarios);

    this.db.getUsuarios( this.formLogin.value.usuario,this.formLogin.value.password).then(async(res) => {
      console.log(this.Data.length);
      if(this.Data.length>0){
       
      }  
      else{
        let toast2 = await this.toast.create({
          message: 'usuario no existe',
          duration: 2500
        });
        toast2.present(); 
        await this.utilServ.closePresentLoading();
      }
      await this.utilServ.closePresentLoading();
      });   
  }
  public prueba(){
    console.log("hola");
  }

  public cambiarPagina(){
    this.router.navigateByUrl("/login");

  }
  //SE DESCARGAN TODOS LOS DATOS DE CONFIGURACION O MAESTROS Y SE GUARDAN LOCALMENTE
  public async descargarDatos(){


      var accion="Descargar";
      var id_usuario = await this.st.get('user');
      console.log(parseInt(id_usuario));
       
   var numero:number=parseInt(id_usuario);
          const backup = await this.authServ.backup("fecha",accion,numero);
          
      console.log(backup);
      console.log(accion);
     
    await this.utilServ.presentLoading("Se están descargando las maestros");

    const usuarios = await this.authServ.loadUsuarios();
    console.log('Console log de preg: ' + JSON.stringify(usuarios));
    this.loadusuarios = usuarios['message'];
    console.log(this.loadusuarios);

    const usurol = await this.authServ.loadUsurol();
    console.log('Console log de preg: ' + JSON.stringify(usurol));
    this.loadUsurol = usurol['message'];
    console.log(this.loadUsurol);

    const roles = await this.authServ.loadRoles();
    console.log('Console log de preg: ' + JSON.stringify(roles));
    this.loadRoles = roles['message'];
    console.log(this.loadRoles);

    const app = await this.authServ.loadApp();
    console.log('Console log de preg: ' + JSON.stringify(app));
    this.loadApp = app['message'];
    console.log(this.loadApp);

    const preguntas = await this.authServ.loadPreguntas();
    console.log('Console log de preg: ' + JSON.stringify(preguntas));
    this.loadPreguntas = preguntas['message'];
    console.log(this.loadPreguntas);

    const preg_opc = await this.authServ.loadPreguntasopc();
    console.log('Console log de preg: ' + JSON.stringify(preg_opc));
    this.loadPregopc = preg_opc['message'];
    console.log(this.loadPregopc);

    const opciones_rta = await this.authServ.loadOpcionesrta();
    console.log('Console log de preg: ' + JSON.stringify(opciones_rta));
    this.loadOpcionesrta = opciones_rta['message'];
    console.log(this.loadOpcionesrta);

    const contrato = await this.authServ.loadContrato();
    console.log('Console log de preg: ' + JSON.stringify(contrato));
    this.loadContrato = contrato['message'];
    console.log(this.loadContrato);

    const usu_cont = await this.authServ.loadUsucont();
    console.log('Console log de preg: ' + JSON.stringify(usu_cont));
    this.loadUsucont = usu_cont['message'];
    console.log(this.loadUsucont);

    const dependencia = await this.authServ.loadDependencia();
    console.log('Console log de preg: ' + JSON.stringify(dependencia));
    this.loadDependecia = dependencia['message'];
    console.log(this.loadDependecia);


    // Se llama del contenido del HOME
    const contenido = await this.authServ.contenidoHome();
    console.log('Console log de preg: ' + JSON.stringify(contenido));
    this.loadContenido = contenido['message'];
    console.log(this.loadContenido);
  

    //SE CARGAN LOS DATOS REGISTRADOS EN LA BASE DE DATOS DEL SERVIDOR A LA DB SQLITE
    for (var i = 0; i < this.loadusuarios.length; i++) { 
      const preg = await this.db.addUsuarios(this.loadusuarios[i]);
    }

    for (var i = 0; i < this.loadUsurol.length; i++) { 
      const preg = await this.db.addUsurol(this.loadUsurol[i]);
    }

    for (var i = 0; i < this.loadRoles.length; i++) { 
      const preg = await this.db.addRoles(this.loadRoles[i]);
    }

    for (var i = 0; i < this.loadApp.length; i++) { 
      const preg = await this.db.addApp(this.loadApp[i]);
    }

    for (var i = 0; i < this.loadPreguntas.length; i++) { 
      const preg = await this.db.addPreguntas(this.loadPreguntas[i]);
    }

    for (var i = 0; i < this.loadPregopc.length; i++) { 
      const preg = await this.db.addPreguntasopc(this.loadPregopc[i]);
    }

    for (var i = 0; i < this.loadOpcionesrta.length; i++) { 
      const preg = await this.db.addOpcrta(this.loadOpcionesrta[i]);
    }

    for (var i = 0; i < this.loadContrato.length; i++) { 
      const preg = await this.db.addContratos(this.loadContrato[i]);
    }

    for (var i = 0; i < this.loadUsucont.length; i++) { 
      const preg = await this.db.addUsucont(this.loadUsucont[i]);
    }

    for (var i = 0; i < this.loadDependecia.length; i++) { 
      const preg = await this.db.addDependencia(this.loadDependecia[i]);
    }

    for (var i = 0; i < this.loadContenido.length; i++) { 
      const preg = await this.db.addContenido(this.loadContenido[i]);
    }
    

    await this.utilServ.closePresentLoading();
    this.utilServ.presentToast("Los datos se han descargado satisfactoriamente");
    this.router.navigateByUrl("/login");


var datos =[];


   var dateYear = new Date().getFullYear()+"";
   var dateMonth = new Date().getMonth()+1+"";
    var dateDay = new Date().getDate()+"";
    var fec=dateYear+"-"+dateMonth+"-"+dateDay;
    let fecha = new Date(fec);

console.log(fecha.toDateString);



  }
  ngOnInit() {
    let desconectar =this.Network.onDisconnect().subscribe(()=>{
      console.log("no hay conexion a internet");
      this.hab=false;
        });
  
        let conectar =this.Network.onConnect().subscribe(()=>{
          console.log(" hay conexion a internet");
          this.hab=true;
  
        });
    
   if(this.hab==false){   
    this.alert
    .create({
      header: '¡Importante!',
      cssClass: 'ion-text-center',
      subHeader: 'Desactiva y activa de nuevo la red, para verificar la conexion',
      buttons: [
        {
          text: 'Aceptar',
        },
        
        
      ],
    })
    .then((confirmElement) => {
      confirmElement.present();
    });
  }

    this.formLogin = this.formB.group({
      usuario: [''],
      password: ['']
    })
  }
}
  

