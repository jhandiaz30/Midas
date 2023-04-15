import { Component, OnInit, ViewChild } from '@angular/core';
import { MostrarEncuestaService } from 'src/app/services/mostrar-encuesta.service';
import { Validators, FormBuilder, FormGroup, FormsModule, FormControl } from '@angular/forms';
import { UtilitiesService } from '../../../services/utilities.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { AlertController, Platform } from '@ionic/angular';
import { EditarEncuestaService } from 'src/app/services/editar-encuesta.service';
import { LoadingController } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { DbService } from "src/app/services/db.service";


pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-mostrar-encuesta',
  templateUrl: './mostrar-encuesta.page.html',
  styleUrls: ['./mostrar-encuesta.page.scss'],
})
export class MostrarEncuestaPage implements OnInit {
  
  //VALORES INICIALES DE LAS VARIABLES
  public titulo = 'Sin titulo';
  public loadPregunta = [];
  public guardarPreguntas = [];

  public loadOpc = [];
  public loadContrato = ['Ninguno'];
  public admin = 'Seleccione un contrato';
  public IdEncuesta: any;

  public respuestasPDF = [];
  public firmasPdf = [];

  public opc = [];
  public respFirma = [];

  public loadEncabezado: any;
  public contrato: any;
  pdfObject: any;
  public datos: any;
  public loadUsuario: any;

  




  //variable para ocultar la card y el boton final
  ocultar1: boolean = false;
  ocultar2: boolean = false;


  //array que guarda los id de las preguntas para asignar a la respuesta
  public pregunta = [];

  public encuesta: any;
  public clicked: any;
  public isDisabled: boolean = false;
  public selectOptions: any;
  public periodoCont: any;
  public periodoFinal: any;
  public valor: any;
  public idPregunta: ['ninguno'];

  //variable para guardar el valor de la imagen
  public image: any = [];
  public foto: any = [];

  public imageFirma: any = [];
  public fotoFirma: any = [];
  public nombresFirma: any = [];
  public cedulaFirma: any = [];
  public fotoFirmaTotal: any = [];
  public nombresFirmaTotal: any = [];
  public cedulaFirmaTotal: any = [];
  public imageFirmaTotal: any = [];


  showAlert: boolean;

  //INDICA SI SE DEBE REALIZAR UN INSERT O UN UPDATE
  public flagSql: any = 'null';
  public conexion: any;

  public formEncabezado: FormGroup;
  public formRta: FormGroup;
  public scope: any;

  //Estado de boton
  public statusButton = true;

  //arreglo para verificar cambios en respuestas
  public validatorChanges = [];
  //arreglo para verificar cambios en firmas

  public validatorChangesFirmas = [];

  public Form = {
    obs: [],
    opc: [],
  };
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  public signaturePadOptions: Object = { 
    'maxWidth':1,
    'minWidth': 1,
    'canvasWidth': 350,
    'canvasHeight': 100,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    
  };
  
  drawStart(){
    console.log('drawStart');
  }

  drawComplete(){
    console.log(this.signaturePad.toDataURL());
  }

  clear(){
    this.signaturePad.clear();
  }
  constructor(
    
    private MosSer: MostrarEncuestaService,
    private Utilser: UtilitiesService,
    private formB: FormBuilder,
    private formA: FormBuilder,
    private st: Storage,
    private router: Router,
    private camera: Camera,
    public navController: NavController,
    private alert: AlertController,
    public editS: EditarEncuestaService,
    public platform: Platform,
    public file: File,
    public fileOpener: FileOpener,
    public loadingController: LoadingController,
    private db: DbService

  ) {
    /* SE REALIZA LA VALIDACION DE CADA CAMPO DEL FORMULARIO formPreguntas*/
    this.formEncabezado = this.formB.group({
      cont: ['', Validators.required],

      Ncuadrilla: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],

      NConsignacion: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],

      nombreJefe: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$')])],

      actividad: [
        
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9-a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$'),
          Validators.maxLength(50),
        ]),
      
      ],

      fechaEncuesta: ['', Validators.required],
    });

    for (var i = 0; i < this.loadPregunta.length; i++) {
      this.formRta = this.formA.group({
        opcion: ['', Validators.required],
        observacion: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$')])],
      });
    }
  }

  //METODO PARA CARGAR EL ADMINISTRADOR DEL CONTRATO
  public async selectAdminDepend(cont: any) {
 
    this.conexion = await this.st.get('conexion');
   

   if( this.conexion=="offline"){
    await this.Utilser.presentLoading('Un momento');

    const rta = await this.db.loadAdminDepend(cont);
    this.admin = rta['message'][0].N_COORDINADOR;
    this.periodoCont = rta['message'][0].FECHA_INICIAL;
    this.periodoFinal = rta['message'][0].FECHA_FINAL;
    this.Utilser.closePresentLoading();


   }else{
    await this.Utilser.presentLoading('Un momento');
    const rta = await this.MosSer.loadAdminDepend(cont);

    if (rta['error'] != 0) {
      console.log(rta['message']);
    } else {
      this.admin = rta['message'][0].N_COORDINADOR;
      this.periodoCont = rta['message'][0].FECHA_INICIAL;
      this.periodoFinal = rta['message'][0].FECHA_FINAL;
    }
    this.Utilser.closePresentLoading();
   }

    
  }

  /* ESTE METODO ENVIA TODOS LOS CAMPOS PARA SER INSERTADOS EN BD */
  public async sendData() {
    this.conexion = await this.st.get('conexion');
    await this.Utilser.presentLoading('Un momento, por favor *');


   if( this.conexion=="offline"){

    let datos = {
      cont: this.formEncabezado.value.cont,
      Ncuadrilla: this.formEncabezado.value.Ncuadrilla,
      NConsignacion: this.formEncabezado.value.NConsignacion,
      nombreJefe: this.formEncabezado.value.nombreJefe,
      actividad: this.formEncabezado.value.actividad,
      fechaEncuesta: moment(this.formEncabezado.value.fechaEncuesta).format('YYYY-MM-DD'),
    };
    const response = await this.db.registrarEncuesta(datos);
    console.log(response);

   
      await this.Utilser.presentToast('Registro exitoso');
      this.Utilser.closePresentLoading();

      const enc = await this.db.loadTraerEncuesta();
      console.log(enc);

      this.encuesta = enc['message'][0].id_encuesta;

      console.log(this.encuesta);
      const encuesta = await this.st.get("id_app");

      //SE CARGAN LAS PREGUNTAS DE LA ENCUESTA
      const preg = await this.db.loadPregunta(encuesta);

      console.log(preg);

        this.loadPregunta = preg['message'];
        

        for (var i = 0; i < this.loadPregunta.length; i++) {
          var idPregunta = preg['message'][i].ID_PREGUNTA;
          var pregunt=preg['message'][i].TITULO;
          this.pregunta[i] = idPregunta;
          this.guardarPreguntas[i]=pregunt;

          // SE LLAMA AL METODO QUE TRAE LAS OPCIONES DE RTA DE CADA PREGUNTA
          const opc = await this.db.loadOpcionRta(idPregunta);

                     this.loadOpc[i] = opc['message'];

        }
    
   }
   else{
    let datos = {
      cont: this.formEncabezado.value.cont,
      Ncuadrilla: this.formEncabezado.value.Ncuadrilla,
      NConsignacion: this.formEncabezado.value.NConsignacion,
      nombreJefe: this.formEncabezado.value.nombreJefe,
      actividad: this.formEncabezado.value.actividad,
      fechaEncuesta: moment(this.formEncabezado.value.fechaEncuesta).format('YYYY-MM-DD'),
    };
    const response = await this.MosSer.registrarEncuesta(datos);
    console.log(response);

    if (response['error'] != 0) {
      /* MUESTRA UN ALERT */
      await this.Utilser.presentToast('Ocurrio un error, intentelo nuevamente');
      this.Utilser.closePresentLoading();
    } else {
      await this.Utilser.presentToast('Registro exitoso');
      this.Utilser.closePresentLoading();

      const enc = await this.MosSer.loadTraerEncuesta();
      this.encuesta = enc['message'][0].id_encuesta;

      console.log(this.encuesta);

      //SE CARGAN LAS PREGUNTAS DE LA ENCUESTA
      const preg = await this.MosSer.loadPregunta();

      console.log(preg);

      if (preg['error'] != 0) {
        console.log(preg['message']);
      } else {
        this.loadPregunta = preg['message'];

        for (var i = 0; i < this.loadPregunta.length; i++) {
          var idPregunta = preg['message'][i].ID_PREGUNTA;
          this.pregunta[i] = idPregunta;

          // SE LLAMA AL METODO QUE TRAE LAS OPCIONES DE RTA DE CADA PREGUNTA
          const opc = await this.MosSer.loadOpcionRta(idPregunta);

          if (opc['error'] != 0) {
            console.log(opc['message']);
            this.showAlert = opc['error'];
          } else {
            this.loadOpc[i] = opc['message'];
          }
        }
      }
    }
   }
    
    
  }

  //Permite ocultar las TARJETAS MIENTRAS SE DA CLICK EN BOTON ENVIAR
  accion1() {
    this.ocultar1 = !this.ocultar1;
    this.formEncabezado.disable();
  }

  accionFirma() {
    this.ocultar2 = !this.ocultar2;

   
  }



  //Permite subir la firma a la db
  enviarFirma(nombres,cedula){
    let base64ImageRepleaced = this.signaturePad.toDataURL().replace(/ /gi, '+'); //Quitar los espacios en blanco del base64
    
    //(<any>window).Ionic.WebView.convertFileSrc(imageData);
    //Obtener el base64 por consola
console.log(base64ImageRepleaced);
console.log(nombres+""+cedula);

console.log(this.signaturePad.toDataURL());
if(cedula==''|| nombres==''){
this.verificacionFIrma3();
}else{

  
this.verificacionFIrma2(base64ImageRepleaced,cedula,nombres);

}
  }

  //FUNCION PARA USAR CAMARA Y CAPTURAR FOTO
  getPicture(i: any) {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
      targetWidth: 640,
      targetHeight: 480,
      quality: 80,
    };

    this.camera.getPicture(options).then(
      (imageURI) => {
        let base64Image = 'data:image/jpeg;base64,' + imageURI;
        let base64ImageRepleaced = base64Image.replace(/ /gi, '+'); //Quitar los espacios en blanco del base64
        this.image[i] = base64ImageRepleaced;
        this.foto[i] = base64ImageRepleaced;
        //Obtener la base64 por consola
        console.log(base64ImageRepleaced);
        console.log();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //FUNCION PARA SUBIR UNA FOTO DE LA GALERIA
  subirPicture(i: any) {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      targetWidth: 640,
      targetHeight: 480,
      quality: 80,
    };

    this.camera.getPicture(options).then(
      (imageURI) => {
        let base64Image = 'data:image/jpeg;base64,' + imageURI;
        let base64ImageRepleaced = base64Image.replace(/ /gi, '+'); //Quitar los espacios en blanco del base64
        this.image[i] = base64ImageRepleaced;
        this.foto[i] = base64ImageRepleaced;
        //(<any>window).Ionic.WebView.convertFileSrc(imageData);
        //Obtener el base64 por consola
        console.log(base64ImageRepleaced);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /* ESTE METODO ENVIA TODOS LOS CAMPOS DE LA RESPUESTA PARA SER INSERTADOS EN BD */
  public async sendDataRta() {

      for (var i = 0; i < this.validatorChanges.length; i++) {
        this.validatorChanges[i]=null;
      }
    
    await this.Utilser.presentLoading('Un momento, por favor -');
    let error = false;

    //se obtiene la ultima encuesta registrada

    console.log(this.pregunta);

    //Variables que ayudarán a validar el número de preguntas respondidas
    var aux = 0;
    var aux2 = 0;
    var sum = 0;

    for (var i = 0; i < this.loadPregunta.length; i++) {

      if (this.Form.opc[i] != null) {
        var idrta = this.Form.opc[i].ID_OPCION_RTA;
        var valor = this.Form.opc[i].VALOR;
        //Validación de preguntas de selección multiple resueltas
        aux = aux + 1;
      } else {
        idrta = '';
        valor = '';
      }

      //Validación de preguntas abiertas resueltas
      if (this.Form.obs[i] != '' && this.Form.obs[i] != undefined && this.loadOpc[i] == undefined) {
        aux2 = aux2 + 1;
      }

      sum = aux + aux2;

      //Validación de total preguntas resueltas
      if (sum == this.loadPregunta.length) {
        this.statusButton = false;
      } else {
        this.statusButton = true;
      }

      console.log('Aux ' + aux);
      console.log('Aux2 ' + aux2);
      console.log('Sum ' + sum);

      let datos = {
        pregunta: this.pregunta[i],
        valor: valor === undefined || null ? '' : valor,
        opcion: idrta === undefined || null ? '' : idrta,
        observacion: this.Form.obs[i] === undefined || null ? '' : this.Form.obs[i],
        image: this.image[i] === undefined || null ? '' : this.image[i],
        encuesta: this.encuesta,
      };

      if (
        this.validatorChanges[i] == null ||
        this.validatorChanges[i].valor != datos.valor ||
        this.validatorChanges[i].observacion != datos.observacion ||
        this.validatorChanges[i].image != datos.image
      ) {
        this.conexion = await this.st.get('conexion');
   

   if( this.conexion=="offline"){
     console.log(datos);
    const response = await this.db.registrarRta(datos);
    console.log(response);

    console.log(datos.encuesta);
      this.validatorChanges[i] = datos;

   }
   else{
    const response = await this.MosSer.registrarRta(datos);
    console.log(datos);

    console.log(datos.encuesta);

    if (response['error'] != 0 || response == 'error') {
      //MUESTRA UN ALERT
      await this.Utilser.closePresentLoading();
      if (response == 'error') {
        await this.Utilser.presentToast('El proceso está tomando más de lo esperado, intentelo nuevamente');
      } else {
        await this.Utilser.presentToast('Ocurrio un error, intentelo nuevamente');
      }
      this.validatorChanges[i] = null;
      error = true;
      break;
    } else {
      this.validatorChanges[i] = datos;
    }
   }
        
      
      }
     
    }
    
    



    if (error === false) {
      await this.Utilser.closePresentLoading();

      await this.Utilser.presentToast('Registro exitoso');
    }
    }
  

  //Este metodo permite enviar los datos y finalizar la encuesta
  public async finalizarEncuesta() {
    await this.Utilser.presentLoading('Un momento, por favor @');

    let error = false;

    //se obtiene la ultima encuesta registrada
    console.log(this.pregunta);

    for (var i = 0; i < this.loadPregunta.length; i++) {
      if (this.Form.opc[i] != null ) {
        var idrta = this.Form.opc[i].ID_OPCION_RTA;
        var valor = this.Form.opc[i].VALOR;
        var observacion=this.Form.obs[i];
      } else {
        idrta = '';
        valor = this.Form.obs[i];
        observacion='';
      }

      let datos = {
        pregunta: this.pregunta[i],
        valor: valor,
        opcion: idrta,
        observacion: observacion,
        image: this.image[i],
        encuesta: this.encuesta,
      };

      if (
        i == 0 ||
        this.validatorChanges[i] == null ||
        this.validatorChanges[i].valor != datos.valor ||
        this.validatorChanges[i].observacion != datos.observacion ||
        this.validatorChanges[i].image != datos.image
      ) {
        //Se envian los datos al servicio mostrar encuesta
        this.conexion = await this.st.get('conexion');
   

        if( this.conexion=="offline"){

          const response = await this.db.registrarRtaFinal(datos);
          console.log(datos);
         
        
            this.validatorChanges[i] = datos;
          
        }else{
          const response = await this.MosSer.registrarRtaFinal(datos);
          console.log(datos);
          if (response['error'] != 0 || response == 'error') {
            //MUESTRA UN ALERT
            await this.Utilser.closePresentLoading();
            if (response == 'error') {
              await this.Utilser.presentToast('El proceso está tomando más de lo esperado, intentelo nuevamente');
            } else {
              await this.Utilser.presentToast('Ocurrio un error, intentelo nuevamente');
            }
            this.validatorChanges[i] = null;
            error = true;
            break;
          }else {
            this.validatorChanges[i] = datos;
          }
        }

       

      
      }
    }
  
    if (error === false) {
      await this.Utilser.closePresentLoading();

      await this.Utilser.presentToast('Registro exitoso');

            this.router.navigateByUrl('/encuesta');

    }
  }

    //Este metodo lanza una ventana de confirmación para validar si se finaliza o no la encuesta.
    OpenConfirmDialogueGenerarPdf() {
      for (var i = 0; i < this.validatorChanges.length; i++) {
        this.validatorChanges[i]=null;
      }
    
    let error = false;

    //se obtiene la ultima encuesta registrada

    console.log(this.pregunta);

    //Variables que ayudarán a validar el número de preguntas respondidas
    var aux = 0;
    var aux2 = 0;
    var sum = 0;

    for (var i = 0; i < this.loadPregunta.length; i++) {

      if (this.Form.opc[i] != null) {
        var idrta = this.Form.opc[i].ID_OPCION_RTA;
        var valor = this.Form.opc[i].VALOR;
        //Validación de preguntas de selección multiple resueltas
        aux = aux + 1;
      } else {
        idrta = '';
        valor ='';
      }

      //Validación de preguntas abiertas resueltas
      if (this.Form.obs[i] != '' && this.Form.obs[i] != undefined && this.loadOpc[i] == '') {
        aux2 = aux2 + 1;
      }

      sum = aux + aux2;

      //Validación de total preguntas resueltas
      if (sum == this.loadPregunta.length) {
        this.statusButton = false;
      } else {
        this.statusButton = true;
      }
    }
  
      
      if(this.statusButton==false){
        this.alert
        .create({
          header: '¡Importante!',
          cssClass: 'ion-text-center',
          subHeader: '¿Desea finalizar la encuesta? ',
          buttons: [
            {
              text: 'Seguir editando',
              handler: () => {
                this.sendDataRta();
                this.router.navigateByUrl('/encuesta');

              }
            },
            {
              text: 'Finalizar',
              handler: () => {
                this.finalizarEncuesta().finally(() => {
                  this.openPDF();
                });
                  this.router.navigateByUrl('/encuesta');

  
              },
            },
          ],
        })
        .then((confirmElement) => {
          confirmElement.present();
        });
      }else{
          this.alert
          .create({
            header: '¡Importante!',
            cssClass: 'ion-text-center',
            subHeader: ' podrá seguir editando luego ¿desea guardar? ',
            buttons: [
              {
                text: 'Cancelar',
                handler: () => {
  
                }
              },
              {
                text: 'Continuar',
                handler: () => {
                  
this.sendDataRta();  
this.router.navigateByUrl('/encuesta');

    
                },
              },
            ],
          })
          .then((confirmElement) => {
            confirmElement.present();
          });
      }
        
    }
  //Este metodo lanza una ventana de confirmación para validar si se finaliza o no la encuesta.
  OpenConfirmDialogue() {
    this.alert
      .create({
        header: '¡Importante!',
        cssClass: 'ion-text-center',
        subHeader: 'Al realizar esta acción no podrás realizar ninguna modificación después. ¿Deseas continuar?',
        buttons: [
          {
            text: 'Cancelar',
          },
          {
            text: 'Continuar',
            handler: () => {
              
              this.finalizarEncuesta().finally(() => {
                this.openPDF();
              });

            },
          },
        ],
      })
      .then((confirmElement) => {
        confirmElement.present();
      });
  }
public async eliminarFirma(i){

  let error = false;
  
    let datos = {
      Nombres: this.nombresFirmaTotal[i],
      cedula: this.cedulaFirmaTotal[i],
      firma: this.fotoFirmaTotal[i],
      id_encuesta: this.encuesta,
    };
    if (
      this.fotoFirmaTotal[i] != null &&
      this.nombresFirmaTotal[i] != null&&
      this.cedulaFirmaTotal[i] != null &&
      this.encuesta != null
    ) {


      this.conexion = await this.st.get('conexion');

      if( this.conexion=="offline"){
        const response = await this.db.eliminarFirma(datos);
        console.log("no hay error");
        this.fotoFirmaTotal.splice(i,1);
this.nombresFirmaTotal.splice(i,1);
this.cedulaFirmaTotal.splice(i,1);
console.log(this.fotoFirma.length);
      }else{
        const response = await this.MosSer.eliminarFirma(datos);
        console.log(datos);
        if (response['error'] != 0 || response == 'error') {
          //MUESTRA UN ALERT
          await this.Utilser.closePresentLoading();
          if (response == 'error') {
            await this.Utilser.presentToast('El proceso está tomando más de lo esperado, intentelo nuevamente');
          } else {
            await this.Utilser.presentToast('Ocurrio un error, intentelo nuevamente');
          }
        
          error = true;
        }else {
          console.log("no hay error");
          this.fotoFirmaTotal.splice(i,1);
  this.nombresFirmaTotal.splice(i,1);
  this.cedulaFirmaTotal.splice(i,1);
  console.log(this.fotoFirma.length)
        }
      }
      //Se envian los datos al servicio mostrar encuesta
    
    }
    else{
     console.log(this.fotoFirma[i]);
     console.log(this.nombresFirma[i]);
     console.log(this.cedulaFirma[i]);
     console.log(this.encuesta);

    }
   
   if (error === false) {
    await this.Utilser.closePresentLoading();

    await this.Utilser.presentToast('Registro exitoso');
  }

}
//ESTE METODO NOS PERMITE HACER LA VERIFICACIÓN PARA EL REGISTRO DE LA FIRMA
  verificacionFIrma2(base64ImageRepleaced,cedula, nombres) {
    this.alert
      .create({
        header: '¡Importante!',
        cssClass: 'ion-text-center',
        subHeader: '¿Desea registrar esta firma?',
        buttons: [
          {
            text: 'Cancelar',
          },
          {
            text: 'Continuar',
            handler: () => {
           
  
    
              this.imageFirma[0] = base64ImageRepleaced;
              this.fotoFirma[0] = base64ImageRepleaced;
              this.nombresFirma[0] = nombres;
              this.cedulaFirma[0] = cedula;

    this.imageFirmaTotal[this.imageFirmaTotal.length] = base64ImageRepleaced;
    this.fotoFirmaTotal[this.fotoFirmaTotal.length] = base64ImageRepleaced;
    this.nombresFirmaTotal[this.nombresFirmaTotal.length] = nombres;
    this.cedulaFirmaTotal[this.cedulaFirmaTotal.length] = cedula;
   
   console.log(this.fotoFirma.length);
          this.sendFirma();

            this.accionFirma();

            },
          },
        ],
      })
      .then((confirmElement) => {
        confirmElement.present();
      });
  }

  
  verificacionFIrma3() {
    this.alert
      .create({
        header: '¡Importante!',
        cssClass: 'ion-text-center',
        subHeader: 'Hay campos sin llenar',
        buttons: [
          {
            text: 'ok',
          },
          
        ],
      })
      .then((confirmElement) => {
        confirmElement.present();
      });
  }
// se envia la firma a la base de datos  
public async sendFirma(){
console.log(this.fotoFirma.length)
  let error = false;
  for (var i = 0; i < this.fotoFirma.length; i++) {
    let datos = {
      Nombres: this.nombresFirma[i],
      cedula: this.cedulaFirma[i],
      firma: this.fotoFirma[i],
      id_encuesta: this.encuesta,
    };
    if (
      this.fotoFirma[i] != null &&
      this.nombresFirma[i] != null&&
      this.cedulaFirma[i] != null &&
      this.encuesta != null
    ) {
      const conexion = await this.st.get("conexion");

      if(conexion=="offline"){
        const response = await this.db.registrarFirmma(datos);
        console.log(datos);
          console.log("no hay error");
      }
      else{
        const response = await this.MosSer.registrarFirmma(datos);
        console.log(datos);
        if (response['error'] != 0 || response == 'error') {
          //MUESTRA UN ALERT
          await this.Utilser.closePresentLoading();
          if (response == 'error') {
            await this.Utilser.presentToast('El proceso está tomando más de lo esperado, intentelo nuevamente');
          } else {
            await this.Utilser.presentToast('Ocurrio un error, intentelo nuevamente');
          }
        
          error = true;
          break;
        }else {
          console.log("no hay error");
        }
      }
      //Se envian los datos al servicio mostrar encuesta
    
    }
    else{
     console.log(this.fotoFirma[i]);
     console.log(this.nombresFirma[i]);
     console.log(this.cedulaFirma[i]);
     console.log(this.encuesta);

    }
   }
   if (error === false) {
    await this.Utilser.closePresentLoading();

    await this.Utilser.presentToast('Registro exitoso');
  }
}
  //Alert que confirma si se realiza o no la acción de finalizar encuesta
  cameraParameter(i: any, captureMode: boolean) {
    console.log('consoleLog de parámetros: ' + i + ' ' + captureMode);
    this.alert
      .create({
        header: '¡Importante!',
        cssClass: 'ion-text-center',
        subHeader:
          captureMode == true
            ? 'Capturar las imágenes en posición horizontal, en formato 4:3 y calidad baja'
            : 'Subir las imágenes en posición horizontal, en formato 4:3 y calidad baja',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              if (captureMode == true) {
                this.getPicture(i);
              } else {
                if (captureMode == false) {
                  this.subirPicture(i);
                }
              }
            },
          },
        ],
      })
      .then((confirmElement) => {
        confirmElement.present();
      });
  }

  async ngOnInit() {
    await this.Utilser.presentLoading('Un momento');

    this.conexion = await this.st.get('conexion');
   
    if( this.conexion=="offline"){
      console.log("pasa");
      const contrato = await this.db.loadContrato();
      this.loadContrato = contrato['message'];
      this.titulo = await this.st.get('titulo');
      console.log(contrato);


      this.Utilser.closePresentLoading();
      const enc = await this.db.loadEncabezado();
      console.log('Console log ENC ' + JSON.stringify(enc));
  
      this.loadEncabezado = enc['message'];
      console.log('Console log Macroproceso: ' + enc['message'][0].macroproceso);
  
      const usuario = await this.db.loadUsuario();
      console.log('Console log USUARIO ' + JSON.stringify(usuario));
  
      this.loadUsuario = usuario['message'];
      console.log('Console log USUARIO: ' + usuario['message'][0].nombre);
      const encuesta = await this.st.get("id_app");

          //SE LLAMA EL METODO QUE PERMITE TRAER LAS PREGUNTAS DE CADA ENCUESTA
          const preg = await this.db.loadPregunta(encuesta);
          console.log('Console log de preg: ' + JSON.stringify(preg));
  
          
       
        this.loadPregunta = preg['message'];
        for (var i = 0; i < this.loadPregunta.length; i++) {
          var idPregunta = preg['message'][i].ID_PREGUNTA;
          this.pregunta[i] = idPregunta;
  
          // SE LLAMA AL METODO QUE TRAE LAS OPCIONES DE RTA DE CADA PREGUNTA
          const opc = await this.db.loadOpcionRta(idPregunta);
  
         
            this.loadOpc[i] = opc['message'];
          
          console.log('loadOpc ' + JSON.stringify(this.loadOpc[i]));
          console.log('Opc ' + opc['message']);
        }
      
    

    }else{
      const contrato = await this.MosSer.loadContrato();

      if (contrato['error'] != 0) {
        console.log(contrato['message']);
      } else {
        this.loadContrato = contrato['message'];
        this.titulo = await this.st.get('titulo');
      }
  
      this.Utilser.closePresentLoading();
      const enc = await this.MosSer.loadEncabezado();
      console.log('Console log ENC ' + JSON.stringify(enc));
  
      this.loadEncabezado = enc['message'];
      console.log('Console log Macroproceso: ' + enc['message'][0].macroproceso);
  
      const usuario = await this.MosSer.loadUsuario();
      console.log('Console log USUARIO ' + JSON.stringify(usuario));
  
      this.loadUsuario = usuario['message'];
      console.log('Console log USUARIO: ' + usuario['message'][0].nombre);
  
          //SE LLAMA EL METODO QUE PERMITE TRAER LAS PREGUNTAS DE CADA ENCUESTA
          const preg = await this.MosSer.loadPregunta();
          console.log('Console log de preg: ' + JSON.stringify(preg));
  
          
      if (preg['error'] != 0) {
        console.log(preg['message']);
      } else {
        this.loadPregunta = preg['message'];
        for (var i = 0; i < this.loadPregunta.length; i++) {
          var idPregunta = preg['message'][i].ID_PREGUNTA;
          this.pregunta[i] = idPregunta;
  
          // SE LLAMA AL METODO QUE TRAE LAS OPCIONES DE RTA DE CADA PREGUNTA
          const opc = await this.MosSer.loadOpcionRta(idPregunta);
  
          if (opc['error'] != 0) {
            console.log(opc['message']);
            this.showAlert = opc['error'];
          } else {
            this.loadOpc[i] = opc['message'];
          }
          console.log('loadOpc ' + JSON.stringify(this.loadOpc[i]));
          console.log('Opc ' + opc['message']);
        }
      }
    }

    //SE CARGAN LOS CONTRATOS ASIGANDOS AL USUARIO
    
  }
  dataPDF() {
  

    this.respuestasPDF.splice(0, this.respuestasPDF.length);
    console.log(this.loadPregunta.length);
    var datos2;

    for (let index = 0; index < this.loadPregunta.length; index++) {
      if (this.Form.opc[index] != null) {
        var idrta = this.Form.opc[index].ID_OPCION_RTA;
        var valor = this.Form.opc[index].VALOR;
        var observaciones =this.Form.obs[index];
      } else {
        idrta = '';
        valor = this.Form.obs[index];
        observaciones='';
      }
      datos2 = {
        pregunta: this.pregunta[index],
        valor: valor=== undefined || null ? '' : valor,
        opcion: idrta,
        observacion: observaciones=== undefined || null ? '' : observaciones,
        image: this.image[index]=== undefined || null ? '' : this.image[index],
        encuesta: this.encuesta,
      };
      console.log(datos2);
      const element = {
        pregunta: this.loadPregunta[index].ORDEN_PREGUNTAS + '. ' + this.loadPregunta[index].TITULO,
    
        respuesta: datos2.valor,
        observacion: datos2.observacion,
        evidencia: datos2.image,
      };

      
      //console.log("Imagen " + element.evidencia)
      this.respuestasPDF.push(element);
      console.log('element ' + index + ' pregunta ' + element.pregunta);
      console.log('element ' + index + ' respuesta ' + element.respuesta);
      console.log('element ' + index + ' observacion ' + element.observacion);
    }

    this.firmasPdf.splice(0, this.firmasPdf.length);
      console.log(this.fotoFirmaTotal.length);
      if(this.fotoFirmaTotal.length==0){
        const element = {
          Nombres: "",
          cedula: "",
          evidencia: '',
        };
        this.firmasPdf.push(element);

      }else{
        for (let index = 0; index < this.fotoFirmaTotal.length; index++) {
          const element = {
            Nombres: this.nombresFirmaTotal[index],
            cedula: this.cedulaFirmaTotal[index],
            evidencia: this.fotoFirmaTotal[index],
          };
  
        //console.log("Imagen " + element.evidencia)
   
          this.firmasPdf.push(element);

          console.log('element ' + index + ' nombres ' + element.Nombres);
          console.log('element ' + index + ' cedula ' + element.cedula);
          console.log('element ' + index + ' firmas' + element.evidencia);
          console.log(this.firmasPdf);
        
       
      }
  }
}

  //Método que se encarga de generar el PDF
  generarPDF() {
    this.dataPDF();
    console.log('PDF Generado');

    let docDefinition = {
      info: {
        title: this.IdEncuesta,
        author: 'john doe',
      },
      content: [
        //Encabezado del documento
        {
          style: 'tableStyle',
          table: {
            widths: [140, '*', 'auto'],
            heights: 20,
            body: [
              //Fila 1
              [
                {
                  rowSpan: 3,
                  image:
                    'data:image/jpeg;base64,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',
                  width: 140,
                  height: 80,
                },
                { text: this.loadEncabezado[0].macroproceso, alignment: 'center' },
                { text: this.loadEncabezado[0].version, alignment: 'center' },
              ],
              //Fila 2
              [{}, { text: this.loadEncabezado[0].proceso, alignment: 'center' }, {}],
              //Fila 3
              [
                {},
                { text: this.loadEncabezado[0].descripcion, alignment: 'center' },
                { text: this.loadEncabezado[0].codigo, alignment: 'center' },
              ],
            ],
          },
        },
        //Datos de la encuesta (Encabezado encuesta)
        {
          style: 'tableStyle',
          table: {
            widths: [140, '*', '*'],
            heights: 20,
            body: [
              //Fila 1
              [
                { text: 'Fecha: ' },
                {
                  colSpan: 2,
                  text: moment(this.formEncabezado.value.fechaEncuesta).format('YYYY-MM-DD'),
                },
                {},
              ],
              //Fila 2
              [
                { text: 'Número de Contrato: ' },
                {
                  colSpan: 2,
                  text: this.titulo,
                },
                {},
              ],
              //Fila 3
              [
                { text: 'Administrador del Contrato: ' },
                { colSpan: 2, text: this.admin },
                {},
              ],
              //Fila 4
              [
                { text: 'Jefe de trabajo: ' },
                { colSpan: 2, text: this.formEncabezado.value.nombreJefe },
                {},
              ],
              //Fila 5
              [
                { text: 'Número grupo de trabajo:' },
                { colSpan: 2, text: this.formEncabezado.value.Ncuadrilla },
                {},
              ],
              //Fila 6
              [
                { text: 'Número consignación ESSA:' },
                { colSpan: 2, text: this.formEncabezado.value.NConsignacion },
                {},
              ],
              //Fila 7
              [
                { text: 'Actividad a realizar:' },
                { colSpan: 2, text: this.formEncabezado.value.actividad },
                {},
              ],
            ],
          },
        },
        //Tabla de preguntas con respuestas
        {
          style: 'tableStyle',
          layout: 'noBorders',
          //margin: [20, 160],
          table: {
            //widths: [140, "*", '*', '*'],
            heights: 20,
            pageBreak: 'before',
            body: [
              [
                table(
                  this.respuestasPDF,
                  ['pregunta', 'respuesta', 'observacion', 'evidencia'],
                  [{ text: 'Pregunta' }, { text: 'Respuesta' }, { text: 'Observación' }]
                ),
              ],
            ],

          },
        },
          
        {
          style: 'table2Style',
          layout: 'noBorders',
          //margin: [20, 160],
          table: {
            //widths: [140, "*", '*', '*'],
            
            heights: 20,
            pageBreak: 'before',
            body: [

              [
                
                table2(
                  this.firmasPdf,
                  ['evidencia','Nombres', 'cedula'],
    
                ),
              ],
            ],
          },
        },
        //Tabla con datos del responsable de la encuesta
        {
          style: 'tableStyle',
          table: {
            widths: [100, '*'],
            heights: 20,
            body: [
              [{ colSpan: 2, alignment: 'center', text: 'Inspección/Encuesta realizada por:' }, {}],
              [{ text: 'Nombre' }, { text: this.loadUsuario[0].nombre }],
              [{ text: 'Cédula:' }, { text: this.loadUsuario[0].cedula }],
            ],
          },
        },



      
       
      ],
      //Configuración de los estilos del PDF
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableStyle: {
          margin: [0, 5, 0, 40],
        },

        table2Style: {
          margin: [0, 5, 0, 15],
          color: 'black',
          lines: 'white',
          background:'white',
          columnGap: 10

        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
          pageBreak: 'before',
        },
      },
    };

    this.pdfObject = pdfMake.createPdf(docDefinition);
  }

  anadirFirma(){
console.log("fimra");

  }

  //Abrir el documento desde la App
  openPDF() {
    this.generarPDF();
    if (this.platform.is('cordova')) {
      try {
        this.pdfObject.getBuffer(async (buffer) => {
          var utf8 = new Uint8Array(buffer);
          var binaryArray = utf8.buffer;
          var blob = new Blob([binaryArray as BlobPart], { type: 'application/pdf' });

          const promise = await this.file.writeFile(this.file.externalApplicationStorageDirectory, 'reporte.pdf', blob, { replace: true });

          this.fileOpener.open(this.file.externalApplicationStorageDirectory + 'reporte.pdf', 'application/pdf');

          /* this.file.checkDir(this.file.dataDirectory, 'files/documents')
            .then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn\'t exist')); */
          console.log('Promise de PDF Make: ' + JSON.stringify(promise));
        });
      } catch (error) {
        console.error('Message error PDFMake' + error);
      }
    } else {
      // On a browser simply use download!
      this.pdfObject.download();
    }
  }
}

function buildTableBody2(data, columns) {
  var body = [];
  var count = 0;

  
  data.forEach(function (row) {
    var dataRow = [];

    columns.forEach(function (column) {
      if(data[0].Nombres ==''){

      }else{
        if (column != 'evidencia') {
          dataRow.push(row[column]);
        }
      }
     
      console.log('Column ' + column);
    });

    body.push(dataRow);

    dataRow = [];

    if (data[count].evidencia != '') {
      var imagenPDF = {
        colSpan: 3,
        image: data[count].evidencia,
        width: 205,
        alignment: 'center',

      };
      var columnEmpty1 = {};
      var columnEmpty2 = {};

      dataRow.push(imagenPDF);
      dataRow.push(columnEmpty1);
      dataRow.push(columnEmpty2);
        

     
      body.push(dataRow);
    }
    count++;
  });

  return body;
}

function buildTableBody(data, columns, headers) {
  var body = [];
  var count = 0;

  body.push(headers);

  data.forEach(function (row) {
    var dataRow = [];

    columns.forEach(function (column) {
      if (column != 'evidencia') {
        dataRow.push(row[column]);
      }
      console.log('Column ' + column);
    });

    body.push(dataRow);

    dataRow = [];

    if (data[count].evidencia != '') {
      var imagenPDF = {
        colSpan: 3,
        image: data[count].evidencia,
        width: 205,
        alignment: 'center',

      };
      var columnEmpty1 = {};
      var columnEmpty2 = {};
      dataRow.push(imagenPDF);
      dataRow.push(columnEmpty1);

      dataRow.push(columnEmpty2);
      body.push(dataRow);
    }
    count++;
  });

  return body;
}

//Función que crea la estrucuta de la tabla con las respuestas del PDF
function table(data, columns, headers) {
  return {
    style: 'tableStyle',

    //fontSize: 12,

    //layout: 'lightHorizontalLines',
    margin: [0, 5, 0, 15],
    table: {
      //margin: [20, -70],
      widths: [164, 162, 162],
      dontBreakRows: true,
      headerCoulums: 1,
      body: buildTableBody(data, columns, headers),
    },
    /*   //Tabla de preguntas con respuestas
          style: "tableStyle",
          table: {
            widths: [100, 396],
            heights: 20,
            body: [
              [{ colSpan: 2, text: data[1].pregunta }, {}],
              [{ text: "Respuesta: " }, { text: data[1].respuesta }],
              [{ text: "Observación: " }, { text: data[1].observacion }],
              [{ colSpan: 2, text: "Adjunto:" }, {}],
              [{ colSpan: 2, text: "" },{}],
            ],
        }, */
  };
}

function table2(data, columns) {
  console.log(data);
  if(data[0].Nombres==""){

    return {
      style: 'table2Style',
    table: {
      //margin: [20, -70],
      widths: [0, 0, 0],
      dontBreakRows: true,
      headerCoulums: 1,
      body: buildTableBody2(data, columns),



    },      

  };
  }else{
    
    var n=[];
    for(var i=0;i<data.length;i++){
       
       n[i]= {
        style: 'tableStyle',
    
        //fontSize: 12,
    
        //layout: 'lightHorizontalLines',
        margin: [0, 20, 0, 15],
        table: {
          //margin: [20, -70],
          widths: [244, 252, 52],
          dontBreakRows: true,
          headerCoulums: 1,
          body: buildTableBody2([data[i]],columns),
      
        },
        /*   //Tabla de preguntas con respuestas
              style: "tableStyle",
              table: {
                widths: [100, 396],
                heights: 20,
                body: [
                  [{ colSpan: 2, text: data[1].pregunta }, {}],
                  [{ text: "Respuesta: " }, { text: data[1].respuesta }],
                  [{ text: "Observación: " }, { text: data[1].observacion }],
                  [{ colSpan: 2, text: "Adjunto:" }, {}],
                  [{ colSpan: 2, text: "" },{}],
                ],
            }, */
            columnGap: 10,
      };
        }
return n;

}
  }
