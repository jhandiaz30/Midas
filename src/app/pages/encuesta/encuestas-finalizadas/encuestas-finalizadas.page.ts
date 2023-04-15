import { Component, OnInit } from "@angular/core";
import { VerEncuestaService } from "../../../services/ver-encuesta.service";
import { Storage } from "@ionic/storage";
import { DbService } from "src/app/services/db.service";
import { MostrarEncuestaService } from 'src/app/services/mostrar-encuesta.service';
import { AlertController, Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormsModule, FormControl, } from "@angular/forms";
import { EncuestaService } from "src/app/services/encuesta.service";
import { Router } from "@angular/router";
import { Network } from '@ionic-native/network/ngx';
import { AuthService } from "../../../services/auth.service";

import { UtilitiesService } from '../../../services/utilities.service';
@Component({
  selector: "app-ver-encuesta",
  templateUrl: "./encuestas-finalizadas.page.html",
  styleUrls: ["./encuestas-finalizadas.page.scss"],
})
export class EncuestasFinalizadas implements OnInit {
  public respuestaEncuesta = [];
  public titulo = "Encuestas finalizadas";

  public formOpc: FormGroup;
  public conexion: any;
  public usuario: any;
  public cantidad: any;
  public estado: any;
  public id_enc: any;
  public encuestas: any=[];

  public hab:boolean=false;
  showAlert: boolean;


  public Form = {
    opc: [],
  };
  toast: any;

  constructor(
    private verEncS: VerEncuestaService,
    private st: Storage,
    private Utilser: UtilitiesService,
    private formB: FormBuilder,
    private encS: EncuestaService,
    private db: DbService,
    private router: Router,
    private MosSer: MostrarEncuestaService,
    public Network:Network,
    private alert: AlertController,
    private authServ: AuthService,

  ) {
   
  }
  

  public  async comprobarConexion(){
    this.estado="Subir encuestas";

    this.verificarConexion();
if(this.hab==true){
  const rtaEncuesta = await this.db.loadEncuestasFinalizadas();
    if(rtaEncuesta["message"]=="No hay datos"){   
      this.alert
      .create({
        header: '¡Importante!',
        cssClass: 'ion-text-center',
        subHeader: 'No hay encuestas por subir',
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
    
    else{
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
    }
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

  async subirDatos(){
    const rtaEncuesta = await this.db.loadEncuestasFinalizadas();
    if(rtaEncuesta["message"].length==0){   
      let toast2 = await this.toast.create({
        message: 'No hay datos por subir',
        duration: 2500
      });
    }
    else{
      await this.Utilser.presentLoading("Se están subiendo las encuestas");

        console.log(rtaEncuesta["message"]);
        for (var i = 0; i < rtaEncuesta["message"].length; i++) {
            console.log(rtaEncuesta["message"][i].id_encuesta+" "+rtaEncuesta["message"][i].id_contrato);
            let datos = {

              cont: rtaEncuesta["message"][i].id_contrato,
              Ncuadrilla: rtaEncuesta["message"][i].numero_grupo_trabajo,
              NConsignacion: rtaEncuesta["message"][i].numero_de_consignacion,
              nombreJefe: rtaEncuesta["message"][i].nombre_jefe_consignacion,
              actividad: rtaEncuesta["message"][i].actividad_realizar,
              fechaEncuesta: rtaEncuesta["message"][i].fecha_encuesta,
              estado: rtaEncuesta["message"][i].estado,
              id_app: rtaEncuesta["message"][i].id_app
            };
            const response = await this.MosSer.encuestaFinal(datos);
            console.log(response);
        console.log(datos);
            if (response['error'] != 0) {
              /* MUESTRA UN ALERT */
              await this.Utilser.presentToast('Ocurrio un error, intentelo nuevamente');
              this.Utilser.closePresentLoading();
            } else {
              await this.Utilser.presentToast('Registro exitoso, espere a que se cambie de pantalla');
              this.Utilser.closePresentLoading();
              var accion="Cargar";
              var id_usuario = await this.st.get('user');
              console.log(parseInt(id_usuario));
           var numero:number=parseInt(id_usuario);
                  const backup = await this.authServ.backup("fecha",accion,numero);

              console.log(backup);
              console.log(accion);
            }     
}
    }
var verificarEncuestas= await this.MosSer.loadTraerEncuestaFinalizada2(parseInt(rtaEncuesta["message"].length));
console.log(verificarEncuestas);
this.encuestas=verificarEncuestas;
console.log(this.encuestas);
for (var i = 0; i < this.encuestas["message"].length; i++) {

var respuesta_encuestas = await this.db.loadRespuestasEncuestas(parseInt(rtaEncuesta["message"][i].id_encuesta));
console.log(respuesta_encuestas["message"][i]);
console.log(rtaEncuesta["message"][i].id_encuesta);
console.log(this.encuestas);
for (var j = 0; j < respuesta_encuestas["message"].length; j++) {
  var obs="";
if(respuesta_encuestas["message"][j].observacion == null){
var obs="";
var img="";
}
else{
var obs=respuesta_encuestas["message"][j].observacion;
var img=respuesta_encuestas["message"][j].evidencia;
}
let datos2 = {
  pregunta: respuesta_encuestas["message"][j].id_pregunta,
  valor: respuesta_encuestas["message"][j].respuesta === undefined || null ? '' : respuesta_encuestas["message"][j].respuesta,
  opcion: respuesta_encuestas["message"][j].id_respuesta === undefined || null ? '' : respuesta_encuestas["message"][j].id_respuesta,
  observacion: obs,
  image: img,
  encuesta:  parseInt(this.encuestas['message'][i].id_encuesta),
};


const rtas = await this.MosSer.registrarRta(datos2);
console.log(datos2);

console.log(rtas);

console.log(datos2.encuesta);
console.log(datos2.pregunta);
console.log(datos2.valor);
console.log(datos2.opcion);
console.log(datos2.observacion);
console.log(datos2.image);

this.id_enc=datos2.encuesta;

if (rtas['error'] != 0 || rtas == 'error') {
  //MUESTRA UN ALERT
  await this.Utilser.closePresentLoading();
  if (rtas == 'error') {
    await this.Utilser.presentToast('El proceso está tomando más de lo esperado, intentelo nuevamente');
  } else {
    await this.Utilser.presentToast('Ocurrio un error, intentelo nuevamente');
  }

} else {
  console.log("No hay error");
}

}
}

for (var i = 0; i < this.encuestas["message"].length; i++) {
  const firmas = await this.db.loadFirma(parseInt(rtaEncuesta["message"][i].id_encuesta));

console.log(firmas["message"]); 
console.log('Console log de preg: ' + JSON.stringify(firmas));
if(firmas["message"][i]=="no tiene firma"){
console.log("no hay firmas"); 

}else{
for (var j = 0; j < firmas["message"].length; j++) {

let datos3 = {
Nombres: firmas["message"][j].Nombres,
cedula: firmas["message"][j].cedula,
firma: firmas["message"][j].firma,
id_encuesta:  parseInt(this.encuestas['message'][i].id_encuesta),
}
console.log(datos3);

const response = await this.MosSer.registrarFirmma(datos3);

if (response['error'] != 0 || response == 'error') {
//MUESTRA UN ALERT
await this.Utilser.closePresentLoading();
if (response == 'error') {
await this.Utilser.presentToast('El proceso está tomando más de lo esperado, intentelo nuevamente');
} else {
await this.Utilser.presentToast('Ocurrio un error, intentelo nuevamente');
}
      break;
}else {
console.log("no hay error");
}
}
}
}
for (var i = 0; i < this.encuestas["message"].length; i++) {

var response2 = await this.MosSer.encuestasRegistradas(this.encuestas["message"][i].id_encuesta);
if (response2['error'] != 0 || response2 == 'error') {
  //MUESTRA UN ALERT
  await this.Utilser.closePresentLoading();
  if (response2 == 'error') {
    await this.Utilser.presentToast('El proceso está tomando más de lo esperado, intentelo nuevamente');
  } else {
    await this.Utilser.presentToast('Ocurrio un error, intentelo nuevamente');
  }
}
else {
  let datos = {
    id_encuesta: response2["message"].id_encuesta,
  
  }
  console.log(datos);
let datos2 = {
numeroEnc: rtaEncuesta["message"][i].id_encuesta,
};

this.conexion = await this.st.get('conexion');

//Se envian los datos al servicio mostrar encuesta

const response = await this.db.eliminarEncuesta(datos2);

this.Utilser.closePresentLoading();
this.router.navigateByUrl('/home');

}
}
}
ionViewDidLoad(){
  let desconectar =this.Network.onDisconnect().subscribe(()=>{
console.log("no hay conexion a internet");
this.hab=false;
  });

  let conectar =this.Network.onConnect().subscribe(()=>{
    console.log(" hay conexion a internet");
    this.hab=false;

  });
}

verificarConexion(){
  let desconectar =this.Network.onDisconnect().subscribe(()=>{
    console.log("no hay conexion a internet");
    this.hab=false;
    this.estado="No tienes internet";
      });

      let conectar =this.Network.onConnect().subscribe(()=>{
        console.log(" hay conexion a internet");
        this.hab=true;
        this.estado="Enviar";

      });
}
  async ngOnInit() {
    // se llama la variable app guardada en el Storage
   /* 
    */

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
   let desconectar =this.Network.onDisconnect().subscribe(()=>{
    console.log("no hay conexion a internet");
    this.hab=false;
    this.estado="No tienes internet";
      });

      let conectar =this.Network.onConnect().subscribe(()=>{
        console.log(" hay conexion a internet");
        this.hab=true;
        this.estado="Enviar";

      });
   this.usuario = await this.st.get('name');
{}
   const rtaEncuesta = await this.db.loadEncuestasFinalizadas();
       
        console.log(rtaEncuesta["message"]);
        for (var i = 0; i < rtaEncuesta["message"].length; i++) {
            console.log(rtaEncuesta["message"][i].id_encuesta+" "+rtaEncuesta["message"][i].id_contrato);
            let datos = {
              cont: rtaEncuesta["message"][i].id_contrato,
              Ncuadrilla: rtaEncuesta["message"][i].numero_grupo_trabajo,
              NConsignacion: rtaEncuesta["message"][i].numero_de_consignacion,
              nombreJefe: rtaEncuesta["message"][i].nombre_jefe_consignacion,
              actividad: rtaEncuesta["message"][i].actividad_realizar,
              fechaEncuesta: rtaEncuesta["message"][i].fecha_encuesta,
              estado: rtaEncuesta["message"][i].estado,
            }

            console.log(datos);
            };
            this.cantidad = rtaEncuesta["message"].length;

  


   // se llaman las respuestas del encabezado de la encuesta
 
  }
}
