import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import {Storage} from '@ionic/storage';

const path = environment.api;
const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");


@Injectable({
  providedIn: 'root'
})
export class CrearEncuestaService {


    constructor(
      private hc: HttpClient,
      private st:Storage
    ) { }
  
     /*FUNCION QUE CARGA LOS CONTRATOS EN EL SELECT */
  public async loadContrato(){
    const user = await this.st.get('user');
    const dataBody = new HttpParams()
    .set('id_user',user)
    let promesa = new Promise( (resolve)=>{
    this.hc.post(path+'/loadContrato',dataBody,{headers}).subscribe((resp) =>{
    resolve(resp);
    });
    });
    return promesa; 
    }
    
  
    /*FUNCION QUE CARGA LA DEPENDENCIA SEGUN EL CONTRATO QUE SE LE PASE */
    public async loadAdminDepend( cont: any ){
      const dataBody = new HttpParams()
      .set('id_contrato', cont)
      let promesa = new Promise( (resolve)=>{
        this.hc.post(path+'/loadAdminDepend', dataBody, {headers}).subscribe( (resp) =>
        {
        resolve(resp);
        });
      });
      return promesa;
    }
  
  
}
