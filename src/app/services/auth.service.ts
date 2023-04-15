import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';

/*PLUGIN STORAGE */
import { Storage } from '@ionic/storage';



const path = environment.api;

/*Headers para peticiones externas */
const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public authState:boolean = null;

  constructor(
              private hc:       HttpClient,
              private st:       Storage,
              private navCtrl:  NavController
    ) 
  { }

  public async contenidoHome() {
    let promesa = new Promise((resolve) => {
      this.hc.get(path + '/contenidoHome', { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }
  public async loadUsuarios() {
    const dataBody = new HttpParams();
    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/loadUsuarios', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }

  public async loadUsurol() {
    const dataBody = new HttpParams();
    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/loadUsurol', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }


  public async loadRoles() {
    const dataBody = new HttpParams();
    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/loadRoles', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }

  public async loadApp() {
    const dataBody = new HttpParams();
    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/loadApp', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }

  public async backup(fecha:any,accion: string, id_usuario:any) {
    const dataBody = new HttpParams()
    .set('fecha' , fecha)
    .set('accion' , accion)
    .set('id_usuario' , id_usuario);
    
    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/backup', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }

  public async loadPreguntas() {
    const dataBody = new HttpParams();
    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/loadPreguntas', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }

  public async loadPreguntasopc() {
    const dataBody = new HttpParams();
    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/loadPreguntasopc', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }

  public async loadOpcionesrta() {
    const dataBody = new HttpParams();
    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/loadOpcionesrta', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }

  public async loadContrato() {
    const dataBody = new HttpParams();
    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/loadContratos', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }

  public async loadUsucont() {
    const dataBody = new HttpParams();
    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/loadUsucont', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }

  public async loadDependencia() {
    const dataBody = new HttpParams();
    let promesa = new Promise((resolve) => {
      this.hc.post(path + '/loadDependencia', dataBody, { headers }).subscribe((resp) => {
        resolve(resp);
      });
    });
    return promesa;
  }
  //FUNCTION OF LOGUEO
  handleError(error: HttpErrorResponse){
    return throwError(error);
    }
    
  public login(usuario: string, clave:string ) {

    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('user' , usuario)
    .set('password' , clave)

    //SE CREA UN PROMESA
    let promesa = new Promise( async (resolve) => {
      //SE REALIZA LA PETICION A LA API REST
      console.log(headers);
      console.log(dataBody);

      console.log(promesa);

      this.hc.post(path+'/login', dataBody,{ headers}).subscribe( async (response)=>{

console.log(response);


        // console.log(response['message'][0].ID_USUARIO);

          //SE VALIDA SI EL USUARIO Y CONTRASEÑA SON VALIDOS
          if( response['error'] != 0 ){
            //SE RETORNA EL MENSAJE DE ERROR DEVUELTO POR EL API REST

            resolve(response['message']);
          }else{
            // OPTIMIZACION DE LA CREACION DEL ELEMENTO EN STORAGE PARA CADA MODULO
            var flagILI:number = 0;
            var flagODC:number = 0;
            var flagCRO:number = 0;

            //SE GUARDA LA VARIABLE DE SESSION
            await this.st.set("session", true);

            //SE GUARDA EL NOMBRE DEL USUARIO
            await this.st.set("name", response['message'][0].N_USUARIO);

            //SE GUARDA EL ID DEL USUARIO
            await this.st.set("user", response['message'][0].ID_USUARIO);

            await this.st.set("conexion", "servidor");

            //SE RECORRE EL OBJETO DE RESPUESTA PARA VALIDAR EL ACCESO A LOS MODULOS DEL SISTEMA
            response['message'].forEach( async obj => {
              
              //SE VALIDA EL ACCESO A CADA MODULO
              switch( obj['N_APP'] ){
                case 'ACC':

                    if(flagILI != 0){
                      //NO SE REALIZA NIINGUNA ACCION
                    }else{
                      //SE GUARDA ILI
                      this.st.set("ACC", true);
                      //SE AUMENTA EL VALOR DE LA BANDERA
                      flagILI++;
                    }

                    //SE GUARDAN ROLES ILI
                    await this.st.set("ACC-"+obj['N_ROL'], true);

                break; 
                case 'Encuesta':

                    if(flagODC != 0){
                      //NO SE REALIZA NIINGUNA ACCION
                    }else{
                      //SE GUARDA ODC
                      this.st.set("ODC", true);
                      //SE AUMENTA EL VALOR DE LA BANDERA
                      flagODC++;
                    }

                    //SE GUARDAN ROLES ODC
                    await this.st.set("ODC-"+obj['N_ROL'], true);

                break;/*
                case 'CRO':

                    if(flagCRO != 0){
                      //NO SE REALIZA NIINGUNA ACCION
                    }else{
                      //SE GUARDA CRO
                      this.st.set("CRO", true);
                      //SE AUMENTA EL VALOR DE LA BANDERA
                      flagCRO++;
                    }

                    //SE GUARDAN ROLES CRO
                    await this.st.set("CRO-"+obj['N_ROL'], true);

                break;*/
              }

            } );
            
            //SE RESUELVE LA PROMESA
            resolve(true);

          }

    });

    });

    //RETORNAMOS LA PROMESA
    return promesa;

  }

  //METODO DE CERRAR SESSION EN LA APLICACION
  public logout(){
    //SE MODIFICA LA VARIABLE DE SESSION A NULL
    this.authState = null;
    //SE LIMPIA EL STORAGE DE LA APLICACION
    this.st.clear();
    //SE DIRECCIONA HACIA EL LOGIN
    this.navCtrl.navigateRoot('/login', { animated: true } );
  }

  //FUNCTION LOAD SESSION OF STORAGE
  public async loadSession(){
    //SE CARGA LA VARIABLE DE SESSION
    this.authState = await this.st.get('session') || null;
    //SE VALIDA SI HAY UNA SESSIONN ACTIVA
    if( this.authState ){
      return true;
    }else{
      return false;
    }
  }

}
