// db.service.ts

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { usuarios } from './usuarios';
import { NavController } from '@ionic/angular';

import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  
  songsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  toast: any;
  public authState:boolean = null;
  public usuario: any;
  public imageUrl: any = '';


  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
    private st: Storage,
    private navCtrl:  NavController

  ) {
    //CREA LA DB LOCAL  CON UN NOMBRE

   
  
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'midas9.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        //CREA LAS TABLAS
          this.storage = db;
          this.tablaUsuarios();
          this.tablApp();
          this.tablaRoles();
          this.tablaUsuRol();
          this.tablaParametrizacion();
          this.tablaDependencia();
          this.tablaContrato();
          this.tablaEncuestas();
          this.tablaUsuCont();
          this.tablaPreguntas();
          this.tablaFirmas();
          this.tablaPregopc();
          this.tablaOpcRta();
          this.tablaRespuestasEnc();


      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchSongs(): Observable<usuarios[]> {
    return this.songsList.asObservable();
  }
 
//CREA LAS TABLAS
    tablaUsuarios() {
      this.httpClient.get(
        'assets/usuario.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

    tablaPregopc() {
      this.httpClient.get(
        'assets/preg_opc.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
    tablaFirmas() {
      this.httpClient.get(
        'assets/firmas.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
    tablaPreguntas() {
      this.httpClient.get(
        'assets/preguntas.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

    tablaRoles() {
      this.httpClient.get(
        'assets/roles.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

    tablaParametrizacion() {
      this.httpClient.get(
        'assets/parametrizacion.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
    tablaUsuCont() {
      this.httpClient.get(
        'assets/usu_cont.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
    tablaUsuRol() {
      this.httpClient.get(
        'assets/usu_rol.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

    tablaOpcRta() {
      this.httpClient.get(
        'assets/opciones_rta.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
  

    tablApp() {
      this.httpClient.get(
        'assets/app.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

    tablaDependencia() {
      this.httpClient.get(
        'assets/dependencia.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

    tablaContrato() {
      this.httpClient.get(
        'assets/contrato.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

    tablaRespuestasEnc() {
      this.httpClient.get(
        'assets/respuestas_enc.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

    tablaEncuestas() {
      this.httpClient.get(
        'assets/encuestas.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

 
    public async loadAdminDepend(cont: any) {
      const datos = [];
      
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("SELECT C.COORDINADOR AS N_COORDINADOR,  C.FECHA_INI AS FECHA_INICIAL, strftime('%Y-%m-%d %H:%M:%S', datetime('now')) AS FECHA_FINAL, D.DESCRIPCION AS N_DEPENDENCIA FROM CONTRATO AS C INNER JOIN DEPENDENCIA AS D ON C.ID_DEPENDENCIA = D.ID_DEPENDENCIA WHERE C.ID_CONTRATO = ? AND C.ESTADO = 'Activo';",[cont])
        .then(async res => { 
     
         console.log(res.rows.length);
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
           console.log(res.rows);
           
                     datos.push({ 
                       N_COORDINADOR: res.rows.item(i).N_COORDINADOR,
                       FECHA_INICIAL: res.rows.item(i).FECHA_INICIAL,
                       FECHA_FINAL: res.rows.item(i).FECHA_FINAL,
                       N_DEPENDENCIA: res.rows.item(i).N_DEPENDENCIA
                      });
                   }
                   const  prueba={"message":datos};
     
                   resolve(prueba); 
                 }
     
                
                 
        }, (error) =>{
         reject(error);
       
       });
  
      
    });
    }
//ACCEDE A LA BASE DE DATOS LOCAL PARA ACCEDER A LA ENCUESTA REGISTRADA
    public async editarEncuesta(datos: any) {
     
       const Ncuadrilla =datos.Ncuadrilla;
       const NConsignacion =  datos.NConsignacion;
       const nombreJefe=  datos.nombreJefe;
       const actividad = datos.actividad;
       const fechaEncuesta = datos.fechaEncuesta;
       const con = datos.cont;
       const numeroEnc = datos.numeroEnc;
  
        const dato = [];
      
        return new Promise((resolve, reject)=>{
          this.storage.executeSql("UPDATE encuestas SET numero_grupo_trabajo = ?, numero_de_consignacion = ?, nombre_jefe_consignacion= ?, actividad_realizar= ?, fecha_sistema = ?, fecha_encuesta = ?, id_contrato = ?, estado = 'Editado'  WHERE id_encuesta = ?;"
          ,[Ncuadrilla,NConsignacion,nombreJefe,actividad,fechaEncuesta,con,numeroEnc])
          .then(async res => { 
       
           console.log(res.rows.length);
           
             if (res.rows.length > 0) {
           for (var i = 0; i < res.rows.length; i++) { 
             console.log(res);
             console.log(res.rows);
             
                       dato.push({ 
                        numeroCuadrilla:res.rows.item(i).numeroCuadrilla,
                        numeroConsignacion:res.rows.item(i).numero_de_consignacion,
                        nombreJefe:res.rows.item(i).nombre_jefe_consignacion,
                        actividad: res.rows.item(i).actividad_realizar,
                        fechaSistema: res.rows.item(i).fecha_sistema,
                        fechaEncuesta: res.rows.item(i).fecha_encuesta,
                        contrato: res.rows.item(i).fecha_encuesta,
                        id_encuesta: res.rows.item(i).id_encuesta
                        });
                     }
                     const  prueba={"message":datos};
       
                     resolve(prueba); 
                   }
       
                  
                   
          }, (error) =>{
           reject(error);
         
         });
    
        
      });
    }
 //Registra  las respuestas de cada pregunta
  
  //Registra  las respuestas de cada pregunta y finaliza la encuesta
  public async registrarRtaFinal(datos: any) {

      const pregunta = datos.pregunta;
      const respuesta = datos.valor;
      const observacion = datos.observacion;
      const opcion = datos.opcion;
      const image = datos.image;
      const id_encuesta = datos.encuesta;

   
       const dato = [];
     
       return new Promise((resolve, reject)=>{
         this.storage.executeSql("SELECT respuesta, observacion, evidencia, id_opcion_rta, id_pregunta FROM respuestas_enc  WHERE id_encuesta = ? AND id_pregunta = ?"
         ,[pregunta,id_encuesta])
         .then(async res => { 
      
          console.log(res.rows.length);
          
            if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) { 
            console.log(res);
            console.log(res.rows);
          
                     
          }
        
                    const  prueba={"message":"pasa"};
      
                    resolve(prueba); 

                    const dato = [];
     
                    return new Promise((resolve, reject)=>{
                      this.storage.executeSql("UPDATE respuestas_enc SET respuesta = ?, observacion = ?, evidencia = ? WHERE id_encuesta = ? "
                      ,[respuesta,observacion,image,id_encuesta])
                      .then(async res => { 
                   
                       console.log(res.rows.length);
                       
                         if (res.rows.length > 0) {
                       for (var i = 0; i < res.rows.length; i++) { 
                         console.log(res);
                         console.log(res.rows);
                                  
                                 }
            
                                 const  prueba={"message":"pasa"};
                   
                                 resolve(prueba); 
                               }
                               else{
                                 
                    this.storage.executeSql("UPDATE encuestas SET estado = 'Finalizado' WHERE id_encuesta = ?"
                    ,[id_encuesta])
                    .then(async res => { 
                 
                     console.log(res.rows.length);
                     
                       if (res.rows.length > 0) {
                     for (var i = 0; i < res.rows.length; i++) { 
                       console.log(res);
                       console.log(res.rows);
                       
                                
                               }
      
                               const  prueba={"message":"pasa"};
                 
                               resolve(prueba); 
                             }
                             else{
                              const  prueba={"message":"pasa"};
                 
                              resolve(prueba); 
                             }
                 
                            
                             
                    }, (error) =>{
                     reject(error);
                   
                   });
                                 
                               }
                   
                              
                               
                      }, (error) =>{
                       reject(error);
                     
                     });
                
                    
                  });
                  }
                  else{
                    this.storage.executeSql("INSERT INTO respuestas_enc (respuesta, observacion, evidencia, id_pregunta, id_opcion_rta, id_encuesta) VALUES (?, ?, ?, ?, ?, ?)"
                    ,[respuesta,observacion,image,pregunta,opcion,id_encuesta])
                    .then(async res => { 
                 
                     console.log(res.rows.length);
                     
                       if (res.rows.length > 0) {
                     for (var i = 0; i < res.rows.length; i++) { 
                       console.log(res);
                       console.log(res.rows);
                       
                                
                               }
           
                               
                               const  prueba={"message":datos};
                 
                               resolve(prueba); 
                             }
                             else{
                              this.storage.executeSql("UPDATE encuestas SET estado = 'Finalizado' WHERE id_encuesta = ?;"
                               ,[id_encuesta])
                              .then(async res => { 
                           
                               console.log(res.rows.length);
                               
                                 if (res.rows.length > 0) {
                               for (var i = 0; i < res.rows.length; i++) { 
                                 console.log(res);
                                 console.log(res.rows);
                                 
                                          
                                         }
                     
                                         
                                         const  prueba={"message":datos};
                           
                                         resolve(prueba); 
                                       }
                                       else{
                                        const  prueba={"message":"pasa"};
                 
                                        resolve(prueba); 
                                       }
                           
                                      
                                       
                              }, (error) =>{
                               reject(error);
                             
                             });
                             }
                 
                            
                             
                    }, (error) =>{
                     reject(error);
                   
                   });
                  }
      
                 
                  
         }, (error) =>{
          reject(error);
        
        });
   
       
     });
  }
    public async finalizarEncuesta(datos: any) {
    
        const numeroCuadrilla = datos.Ncuadrilla;
        const numeroConsignacion = datos.NConsignacion;
        const nombreJefe= datos.nombreJefe;
        const actividad = datos.actividad;
        const fechaEncuesta = datos.fechaEncuesta;
        const numeroCont = datos.cont;
        const id_encuesta = datos.numeroEnc;
        const dato = [];
      

    
        return new Promise((resolve, reject)=>{
          this.storage.executeSql("UPDATE encuestas SET numero_grupo_trabajo = ?, numero_de_consignacion = ?, nombre_jefe_consignacion= ?, actividad_realizar= ?, fecha_sistema = ?, fecha_encuesta = ?, id_contrato = ?, estado = 'Finalizado' WHERE id_encuesta = ?;"
          ,[numeroCuadrilla,numeroConsignacion,nombreJefe,actividad,fechaEncuesta,fechaEncuesta,numeroCont,id_encuesta])
          .then(async res => { 
       
           console.log(res.rows.length);
           
             if (res.rows.length > 0) {
           for (var i = 0; i < res.rows.length; i++) { 
             console.log(res);
             console.log(res.rows);
             
                       dato.push({ 
                        numeroCuadrilla:res.rows.item(i).numeroCuadrilla,
                        numeroConsignacion:res.rows.item(i).numero_de_consignacion,
                        nombreJefe:res.rows.item(i).nombre_jefe_consignacion,
                        actividad: res.rows.item(i).actividad_realizar,
                        fechaSistema: res.rows.item(i).fecha_sistema,
                        fechaEncuesta: res.rows.item(i).fecha_encuesta,
                        contrato: res.rows.item(i).fecha_encuesta,
                        id_encuesta: res.rows.item(i).id_encuesta
                        });
                     }
                     const  prueba={"message":dato};
       
                     resolve(prueba); 
                   }else{

                    dato.push({ 
                      mensaje:"mensaje"
                      });
                   
                   const  prueba={"message":dato};
     
                   resolve(prueba); 
                   }
       
                  
                   
          }, (error) =>{
           reject(error);
         
         });
    
        
      });
    }


    public async editarRtas(datos: any) {
      const dato = [];

        const pregunta= datos.pregunta;
        const respuesta= datos.valor;
        const observacion= datos.observacion;
        const opcion= datos.opcion;
        const image= datos.image;
        const id_encuesta= datos.encuesta;
      //.set('id_respuesta', datos.idRta)
  
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("UPDATE RESPUESTAS_ENC SET  RESPUESTA= ?, OBSERVACION = ?, EVIDENCIA = ?, ID_OPCION_RTA = ? WHERE id_pregunta = ? AND id_encuesta = ?",[respuesta,observacion,image,opcion,pregunta,id_encuesta])
        .then(async res => { 
     
         console.log(res.rows.length);
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
           console.log(res.rows);
           
                     dato.push({ 
                      respuesta:"paso"
                      });
                   }
                   const  prueba={"message":dato};
     
                   resolve(prueba); 
                 }
                 else{
                  dato.push({ 
                    respuesta:"paso"
                    });
                 const  prueba={"message":dato};
                 resolve(prueba); 
                 }
                 
        }, (error) =>{
         reject(error);
       
       });
  
    });  
    }
    public async eliminarEncuesta(datos: any) {
      const dato = [];
    return new Promise((resolve, reject)=>{
      this.storage.executeSql("UPDATE encuestas SET estado = 'Eliminado' WHERE id_encuesta = ?;",[datos.numeroEnc])
      .then(async res => { 
   
       console.log(res.rows.length);
       
         if (res.rows.length > 0) {
       for (var i = 0; i < res.rows.length; i++) { 
         console.log(res);
         console.log(res.rows);
         
                   dato.push({ 
                    id_encuesta: res.rows.item(i).id_encuesta
                    });
                 }
                 const  prueba={"message":dato};
   
                 resolve(prueba); 
               }else{
                const  prueba={"message":"eliminado"};
 
                resolve(prueba); 
               }
              
               
               
      }, (error) =>{
       reject(error);
     
     });

  });  
    }

    public async eliminarEncuest(datos: any) {
      const dato = [];
    return new Promise((resolve, reject)=>{
      this.storage.executeSql("UPDATE encuestas SET estado = 'Eliminado' WHERE id_encuesta = ?;",[datos.numeroEnc])
      .then(async res => { 
   
       console.log(res.rows.length);
       
         if (res.rows.length > 0) {
       for (var i = 0; i < res.rows.length; i++) { 
         console.log(res);
         console.log(res.rows);
         
                   dato.push({ 
                    id_encuesta: res.rows.item(i).id_encuesta
                    });
                 }
                 const  prueba={"message":dato};
   
                 resolve(prueba); 
               }else{
                const  prueba={"message":"eliminado"};
 
                resolve(prueba); 
               }
              
               
               
      }, (error) =>{
       reject(error);
     
     });

  });  
    }
    public async loadContrato() {
      const user = await this.st.get("user");
      const dato = [];
    return new Promise((resolve, reject)=>{
      this.storage.executeSql("SELECT C.ID_CONTRATO, C.NUMERO, C.EMPRESA  FROM USU_CONT AS US INNER JOIN USUARIO AS U ON U.ID_USUARIO = US.ID_USUARIO INNER JOIN  CONTRATO AS C ON C.ID_CONTRATO = US.ID_CONTRATO WHERE U.ID_USUARIO = ?;",[user])
      .then(async res => { 
   
       console.log(res.rows.length);
       
         if (res.rows.length > 0) {
       for (var i = 0; i < res.rows.length; i++) { 
         console.log(res);
         console.log(res.rows.item(i).numero);
         
                   dato.push({ 
                    ID_CONTRATO: res.rows.item(i).id_contrato,
                    NUMERO: res.rows.item(i).numero,
                    EMPRESA: res.rows.item(i).empresa
                    });
                 }
                 const  prueba={'message':dato};
   console.log(prueba);
                 resolve(prueba); 
               }
               else{

               }
               
      }, (error) =>{
       reject(error);
     
     });

  });  
    }
    //CARGA LOS ENCABEZADOS, CADA FORMATO O ENCUESTA TIENE UN ECABEZADO
    public async loadEncabezado() {
      const encuesta = await this.st.get("id_app");
      const dato = [];
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("SELECT macroproceso, proceso, descripcion, versión, codigo from app where id_app = ?;"
        ,[encuesta])
        .then(async res => { 
     
         console.log(res.rows.length);
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
           console.log(res.rows);
           
                     dato.push({ 
                      macroproceso: res.rows.item(i).macroproceso,
                      proceso: res.rows.item(i).proceso,
                      descripcion: res.rows.item(i).descripcion,
                      version: res.rows.item(i).versión,
                      codigo: res.rows.item(i).codigo

                      });
                   }
                   const  prueba={"message":dato};
     
                   resolve(prueba); 
                 }
                 
        }, (error) =>{
         reject(error);
       
       });
  
    });  
  
    }

    public async loadUsuario() {
      const user = await this.st.get("user");
      const dato = [];
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("SELECT nombre, cedula from usuario where id_usuario = ?;"
        ,[user])
        .then(async res => { 
     
         console.log(res.rows.length);
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
           console.log(res.rows);
           
                     dato.push({ 
                      nombre: res.rows.item(i).nombre,
                      cedula: res.rows.item(i).cedula,
                      id_usuario: res.rows.item(i).id_usuario
                      });
                   }
                   const  prueba={"message":dato};
     
                   resolve(prueba); 
                 }
                 
        }, (error) =>{
         reject(error);
       
       });
  
    });  
    }


    public  async nombreApp() {
      const datos = [];
      const user = await this.st.get("user");
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("SELECT id_app, nombre, descripcion From APP WHERE id_app IN (SELECT id_app FROM roles WHERE id_rol IN (SELECT id_rol FROM usu_rol WHERE id_usuario = ?) AND id_app <> 3) AND estado = 'Activo'",[user])
        .then(async res => { 
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
         
           
                     datos.push({ 
                       ID_APP: res.rows.item(i).id_app,
                       NOMBRE: res.rows.item(i).nombre,
                       DESCRIPCION: res.rows.item(i).descripcion
                      });
                   }
                   const  prueba={"message":datos};
     
                   resolve(prueba); 
                 }
     
                
                 
        }, (error) =>{
         reject(error);
       
       });
  
      
    });
    }
    public async registrarRta(datos: any) {
      
        const pregunta = datos.pregunta;
        const respuesta = datos.valor;
        const observacion= datos.observacion;
        const opcion= datos.opcion;
        const image= datos.image;
        const id_encuesta= datos.encuesta;
  
  console.log(id_encuesta);
        const dato = [];
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("SELECT respuesta, observacion, evidencia, id_opcion_rta, id_pregunta FROM respuestas_enc WHERE id_encuesta = ? AND id_pregunta = ?", [id_encuesta,pregunta])
        .then(async res => { 
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
         
           
                     dato.push({ 
                       
                      });
                   }
                   this.storage.executeSql("UPDATE respuestas_enc SET respuesta = ?, observacion = ?, evidencia = ? WHERE id_encuesta = ? AND id_pregunta = ?", [respuesta, observacion, image,id_encuesta,pregunta])
                   .then(async res => { 
                    console.log("pasa actualizacion");
                      if (res.rows.length > 0) {
                    for (var i = 0; i < res.rows.length; i++) { 
                    
                      
                                dato.push({ 
                                  
                                 });
                              }
                              const  prueba={"message":dato};
                
                              resolve(prueba); 
                            }
                
                           
                            
                   }, (error) =>{
                    reject(error);
                  
                  });
                 }
                 else{
                  this.storage.executeSql("INSERT INTO respuestas_enc (respuesta, observacion, evidencia, id_pregunta, id_opcion_rta, id_encuesta) VALUES (?, ?, ?, ?, ?, ?);", [respuesta, observacion, image,pregunta,opcion,id_encuesta])
                  .then(async res => { 
                    console.log("pasa insertar");

                     if (res.rows.length > 0) {
                   for (var i = 0; i < res.rows.length; i++) { 
                   
                     
                               dato.push({ 
                                mensaje:" "

                                });
                             }
                             const  prueba={"message":dato};
               
                             resolve(prueba); 
                           }
               
                          else{
                            dato.push({ 
                                 mensaje:" "
                            });
                         
                         const  prueba={"message":dato};
           
                         resolve(prueba); 
                          }
                           
                  }, (error) =>{
                   reject(error);
                 
                 }); 
                 }
     
                
                 
        }, (error) =>{
         reject(error);
       
       });
  
      
    });
    }

    public async registrarRta2(datos: any) {
      
      const pregunta = datos.pregunta;
      const respuesta = datos.valor;
      const observacion= datos.observacion;
      const opcion= datos.opcion;
      const image= datos.image;
      const id_encuesta= datos.encuesta;


      const dato = [];
    return new Promise((resolve, reject)=>{
      this.storage.executeSql("INSERT INTO respuestas_enc (respuesta, observacion, evidencia, id_pregunta, id_opcion_rta, id_encuesta) VALUES (?,?,?,?,?,?);",
      [respuesta,observacion,image,pregunta,opcion,id_encuesta])
      .then(async res => { 
       
         if (res.rows.length > 0) {
       for (var i = 0; i < res.rows.length; i++) { 
       
         
                   dato.push({ 
                     
                    });
                 }
                 const  prueba={"message":dato};
   
                 resolve(prueba); 
               }
   
              
               
      }, (error) =>{
       reject(error);
     
     });

    
  });
  }
    public async registrarEncuesta(datos: any) {
      const dato=[];
      const user = await this.st.get("user");
      const nombreEnc = await this.st.get("id_app");
  
    console.log(datos);
        const numeroCuadrilla= datos.Ncuadrilla;
        const numeroConsignacion= datos.NConsignacion;
        const nombreJefe= datos.nombreJefe;
        const actividad= datos.actividad;
        const fechaEncuesta= datos.fechaEncuesta;
        const numeroCont= datos.cont;
        const nombreEn= nombreEnc;
        const usuario= user;

        console.log(numeroCuadrilla+" "+numeroConsignacion+" "+nombreJefe+" "
        +actividad+" "+fechaEncuesta+" "+fechaEncuesta+" "+numeroCont+" "+
        nombreEn+" "+usuario);

        var f = new Date();
        console.log((f.getFullYear+"-"+f.getMonth+"-"+f.getDay));

        return new Promise((resolve, reject)=>{
          this.storage.executeSql("INSERT INTO encuestas( numero_grupo_trabajo, numero_de_consignacion, nombre_jefe_consignacion, actividad_realizar, fecha_sistema, fecha_encuesta, id_contrato, id_app, id_usuario, estado) VALUES (?,?,?,?,?,?,?,?,?,?);",
          [numeroCuadrilla,numeroConsignacion,nombreJefe,actividad,fechaEncuesta,fechaEncuesta,numeroCont,nombreEn,usuario,'activo'])
          .then(async res => { 
           
             if (res.rows.length > 0) {
           for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
             
                       dato.push({ 
                        usuario:"usuario"
                        });
                     }
                     const  prueba={"message":dato};
       
                     resolve(prueba); 
                   }
                  else {
                    console.log("sin");
                                dato.push({ 
                                 usuario:"usuario"
                                 });
                              
                              const  prueba={"message":dato};
                
                              resolve(prueba); 
                            }
       
                  
                   
          }, (error) =>{
           reject(error);
         
         });
    
        
      });
    }
    public async loadPregunta(encuesta: any) {

      const datos = [];
      
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("SELECT P.ID_PREGUNTA, P.ORDEN_PREGUNTAS, P.TITULO, P.DESCRIPCION, P.ID_APP  FROM PREGUNTAS AS AP INNER JOIN APP AS A ON A.ID_APP = AP.ID_APP INNER JOIN  PREGUNTAS AS P ON P.ID_PREGUNTA = AP.ID_PREGUNTA WHERE A.ID_APP = ? ORDER BY CAST(P.ORDEN_PREGUNTAS AS FLOAT) ;",[encuesta])
        .then(async res => { 
     
         console.log(res.rows.length);
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
           console.log(res.rows);
           
                     datos.push({ 
                       ID_PREGUNTA: res.rows.item(i).id_pregunta,
                       ORDEN_PREGUNTAS: res.rows.item(i).orden_preguntas,
                       TITULO: res.rows.item(i).titulo,
                       DESCRIPCION: res.rows.item(i).descripcion,
                       ID_APP: res.rows.item(i).id_app
                      });
                   }
                   const  prueba={'message':datos};
     
                   resolve(prueba); 
                 }        
        }, (error) =>{
         reject(error);
       
       });
  
      
    });
    }

    public async loadRtaPreguntas(idEncuesta: any) {
      const datos = [];
      
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("SELECT r.id_respuesta, r.respuesta, r.observacion, r.evidencia, r.id_encuesta, r.id_opcion_rta, p.id_pregunta, p.orden_preguntas,p.titulo, p.descripcion, p.imagen, p.id_app FROM respuestas_enc AS r INNER JOIN preguntas as p on p.id_pregunta = r.id_pregunta WHERE r.id_encuesta = ?  ",[idEncuesta])
        .then(async res => { 
     
         console.log(res.rows.length);
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
           console.log(res.rows);
           
                     datos.push({ 
                      id_respuesta: res.rows.item(i).id_respuesta,
                      respuesta: res.rows.item(i).respuesta,
                      observacion: res.rows.item(i).observacion,
                      evidencia: res.rows.item(i).evidencia,
                      id_encuesta: res.rows.item(i).id_encuesta,
                      id_opcion_rta: res.rows.item(i).id_opcion_rta,
                      id_pregunta: res.rows.item(i).id_pregunta,
                      orden_preguntas: res.rows.item(i).orden_preguntas,
                      titulo: res.rows.item(i).titulo,
                      descripcion: res.rows.item(i).descripcion,
                      imagen: res.rows.item(i).imagen,
                      id_app: res.rows.item(i).id_app
                      });
                   }
                   const  prueba={"message":datos};
     
                   resolve(prueba); 
                 }

                 else{
                  datos.push({ 
                    id_respuesta:'',
                    respuesta: '',
                    observacion: '',
                    evidencia: '',
                    id_encuesta: '',
                    id_opcion_rta: '',
                    id_pregunta: '',
                    orden_preguntas: '',
                    titulo: '',
                    descripcion: '',
                    imagen: '',
                    id_app: ''
                    });

                    const  prueba={"message":datos};
     
                   resolve(prueba); 
                 }
        }, (error) =>{
         reject(error);
       
       });
  
      
    });
    }

    public async loadFirma(id_encuesta: any) {

      const dato = [];
      
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("SELECT id_Firma, Nombres, cedula, firma, id_encuesta FROM firmas WHERE id_encuesta= ?",[id_encuesta])
        .then(async res => { 
     
         console.log(res.rows.length);
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
           console.log(res.rows);
           
                     dato.push({ 
                       Nombres: res.rows.item(i).Nombres,
                       cedula: res.rows.item(i).cedula,
                       firma: res.rows.item(i).firma,
                       id_encuesta: res.rows.item(i).id_encuesta
                      });
                   }
                   const  prueba={"message":dato};
     
                   resolve(prueba); 
                 }
                 else{
                  const  prueba={"message":"no tiene firma"};
     
                  resolve(prueba);  
                 }
     
    
                 
        }, (error) =>{
         reject(error);
       
       });
  
      
    });
    }
    public async registrarFirmma(datos: any) {
       const Nombres= datos.Nombres;
       const cedula= datos.cedula;
       var firma= datos.firma;
       const id_encuesta= datos.id_encuesta;
       firma = firma.replace( " " , "+" , firma );     

       const dato = [];
      
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("INSERT INTO firmas (Nombres, cedula, firma, id_encuesta) VALUES (?, ?, ?, ?);",[Nombres, cedula, firma,id_encuesta])
        .then(async res => { 
     
         console.log(res.rows.length);
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
           console.log(res.rows);
           
                     dato.push({ 
                       Nombres: res.rows.item(i).Nombres,
                       cedula: res.rows.item(i).cedula,
                       firma: res.rows.item(i).firma,
                       id_encuesta: res.rows.item(i).id_encuesta
                      });
                   }
                   const  prueba={"message":dato};
     
                   resolve(prueba); 
                 }
     
                
                 
        }, (error) =>{
         reject(error);
       
       });
  
      
    });
  

    }


    public async addUsuarios(datos: any) {
      const id_usuario= datos.id_usuario;
      const nombre= datos.nombre;
      const usuario= datos.usuario;
      const clave= datos.clave;
      const estado= datos.estado;
      const cedula= datos.cedula;  
console.log(cedula);
      const dato = [];
     
     return new Promise((resolve, reject)=>{
       this.storage.executeSql("INSERT or IGNORE INTO usuario(id_usuario, nombre, usuario, clave, estado, cedula) VALUES (?, ?, ?, ?, ?, ?);",[id_usuario, nombre, usuario, clave, estado, cedula])
       .then(async res => { 
    
        console.log("usuarios insertados");
        
        const  prueba={"message":" usuarios insertados"};
    
        resolve(prueba);
                
       }, (error) =>{
        reject(error);
      
      });
 
     
   });

   }

   public async addUsurol(datos: any) {
    const id_usu_rol= datos.id_usu_rol;
    const id_rol= datos.id_rol;
    const id_usuario= datos.id_usuario;

console.log(id_usu_rol);
    const dato = [];
   
   return new Promise((resolve, reject)=>{
     this.storage.executeSql("INSERT or IGNORE INTO usu_rol (id_usu_rol, id_usuario, id_rol) VALUES (?, ?, ?);",[id_usu_rol, id_usuario, id_rol])
     .then(async res => { 
  
      console.log("usuroles insertados");
      
      const  prueba={"message":"usuroles insertados"};
  
      resolve(prueba);
              
     }, (error) =>{
      reject(error);
    
    });

   
 });
 }

 public async addRoles(datos: any) {
  const nombre= datos.nombre;
  const id_rol= datos.id_rol;
  const descripcion= datos.descripcion;
  const id_app= datos.id_app;
  const tipo_rol= datos.tipo_rol;


console.log(id_rol);
  const dato = [];
 
 return new Promise((resolve, reject)=>{
   this.storage.executeSql("INSERT or IGNORE INTO roles(id_rol, nombre, descripcion, id_app, tipo_rol) VALUES (?, ?, ?, ?, ?);",[id_rol, nombre, descripcion, id_app, tipo_rol])
   .then(async res => { 

    console.log("roles insertados");
    
    const  prueba={"message":"roles insertados"};

    resolve(prueba);
            
   }, (error) =>{
    reject(error);
  
  });

 
});

}



public async addPreguntasopc(datos: any) {
  const id_pre_opc= datos.id_pre_opc;
  const id_pregunta= datos.id_pregunta;
  const id_opcion_rta= datos.id_opcion_rta;


console.log(id_pre_opc);
  const dato = [];
 
 return new Promise((resolve, reject)=>{
   this.storage.executeSql("INSERT or IGNORE INTO preg_opc (id_pre_opc, id_pregunta, id_opcion_rta) VALUES (?, ?, ?);",[id_pre_opc, id_pregunta, id_opcion_rta])
   .then(async res => { 

    console.log("preguntasopc insertados");
    
    const  prueba={"message":"preguntasopc insertados"};

    resolve(prueba);
            
   }, (error) =>{
    reject(error);
  
  });

 
});
}

public async addApp(datos: any) {

  const id_app= datos.id_app;
  const nombre= datos.nombre;
  const descripcion= datos.descripcion;
  const estado= datos.estado;
  const parametrizable= datos.parametrizable;
  const macroproceso= datos.macroproceso;
  const proceso= datos.proceso;
  const versión= datos.versión;
  const codigo= datos.codigo;


console.log(id_app);
  const dato = [];
 
 return new Promise((resolve, reject)=>{
   this.storage.executeSql("INSERT or IGNORE INTO app(id_app, nombre, descripcion, estado, parametrizable, macroproceso, proceso, versión, codigo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",[id_app, nombre, descripcion, estado, parametrizable,macroproceso, proceso, versión, codigo])
   .then(async res => { 

    console.log("app insertados");
    
    const  prueba={"message":"app insertados"};

    resolve(prueba);
            
   }, (error) =>{
    reject(error);
  
  });

 
});
}

public async addOpcrta(datos: any) {

  const id_opcion_rta= datos.id_opcion_rta;
  const orden_opciones= datos.orden_opciones;
  const titulo= datos.titulo;
  const descripcion= datos.descripcion;
  const valor= datos.valor;


console.log(id_opcion_rta);
  const dato = [];
 
 return new Promise((resolve, reject)=>{
   this.storage.executeSql("INSERT or IGNORE INTO opciones_rta (id_opcion_rta, orden_opciones, titulo, descripcion, valor) VALUES (?, ?, ?, ?, ?);",[id_opcion_rta, orden_opciones, titulo, descripcion, valor])
   .then(async res => { 

    console.log("opcionesrta insertados");
    
    const  prueba={"message":"opcionesrta insertados"};

    resolve(prueba);
            
   }, (error) =>{
    reject(error);
  
  });

 
});
}
public async addContrato(datos: any) {

  const id_contrato= datos.id_contrato;
  const numero= datos.numero;
  const empresa= datos.empresa;
  const objetivo= datos.objetivo;
  const coordinador= datos.coordinador;
  const fecha_ini= datos.fecha_ini;
  const estado= datos.estado;
  const id_dependencia= datos.id_dependencia;


console.log(id_contrato);
  const dato = [];
 
 return new Promise((resolve, reject)=>{
   this.storage.executeSql("INSERT or IGNORE INTO contrato (id_contrato, numero, empresa, objetivo, coordinador, fecha_ini, estado, id_dependencia) VALUES (?, ?, ?, ?, ?);",[id_contrato, numero, empresa, objetivo, coordinador, fecha_ini, estado, id_dependencia])
   .then(async res => { 

    console.log("contatos insertados");
    
    const  prueba={"message":"contatos  insertados"};

    resolve(prueba);
            
   }, (error) =>{
    reject(error);
  
  });

 
});
}
public async addPreguntas(datos: any) {
  const id_pregunta= datos.id_pregunta;
  const orden_preguntas= datos.orden_preguntas;
  const titulo= datos.titulo;
  const descripcion= datos.descripcion;
  const imagen= datos.imagen;
  const id_app= datos.id_app;

console.log(id_app);
  const dato = [];
 
 return new Promise((resolve, reject)=>{
   this.storage.executeSql("INSERT or IGNORE INTO preguntas (id_pregunta, orden_preguntas, titulo, descripcion, imagen, id_app) VALUES (?, ?, ?, ?, ?, ?);",[id_pregunta, orden_preguntas, titulo, descripcion, imagen, id_app])
   .then(async res => { 

    console.log("preguntas insertados");
    
    const  prueba={"message":"pregunas insertados"};

    resolve(prueba);
            
   }, (error) =>{
    reject(error);
  
  });

 
});
}


public async addContratos(datos: any) {

  const id_contrato= datos.id_contrato;
  const numero= datos.numero;
  const empresa= datos.empresa;
  const objetivo= datos.objetivo;
  const coordinador= datos.coordinador;
  const fecha_ini= datos.fecha_ini;
  const estado= datos.estado;
  const id_dependencia= datos.id_dependencia;


console.log(id_contrato);
  const dato = [];
 
 return new Promise((resolve, reject)=>{
   this.storage.executeSql("INSERT or IGNORE INTO contrato (id_contrato, numero, empresa, objetivo, coordinador, fecha_ini, estado, id_dependencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",[id_contrato, numero, empresa, objetivo, coordinador, fecha_ini, estado, id_dependencia])
   .then(async res => { 

    console.log("contatos insertados");
    
    const  prueba={"message":"contatos  insertados"};

    resolve(prueba);
            
   }, (error) =>{
    reject(error);
  
  });

 
});
}
public async addUsucont(datos: any) {
  const id_usu_cont= datos.id_usu_cont;
  const id_usuario= datos.id_usuario;
  const id_contrato= datos.id_contrato;
  const tipo_usu= datos.tipo_usu;


console.log(id_usu_cont);
  const dato = [];
 
 return new Promise((resolve, reject)=>{
   this.storage.executeSql("INSERT or IGNORE INTO usu_cont (id_usu_cont, id_usuario, id_contrato, tipo_usu) VALUES (?, ?, ?, ?);",[id_usu_cont, id_usuario, id_contrato, tipo_usu])
   .then(async res => { 

    console.log("usucont insertados");
    
    const  prueba={"message":"usucont insertados"};

    resolve(prueba);
            
   }, (error) =>{
    reject(error);
  
  });

 
});
}


public async addContenido(datos: any) {
  const id_parametrizacion= datos.id_parametrizacion;
  const titulo= datos.titulo;
  const subtitulo= datos.subtitulo;
  const imagen= datos.imagen;
  const descripcion= datos.descripcion;
  const activo= datos.activo;



console.log(id_parametrizacion);
  const dato = [];
 
 return new Promise((resolve, reject)=>{
   this.storage.executeSql("INSERT or IGNORE INTO parametrizacions (id_parametrizacion, titulo, subtitulo, imagen, descripcion, activo) VALUES (?, ?, ?, ?, ?, ?);",[id_parametrizacion, titulo, subtitulo, imagen, descripcion, activo])
   .then(async res => { 

    console.log("conido insertados");
    
    const  prueba={"message":" contenido insertados"};

    resolve(prueba);
            
   }, (error) =>{
    reject(error);
  
  });

 
});
}

public async addDependencia(datos: any) {
  const id_dependencia= datos.id_dependencia;
  const codigo= datos.codigo;
  const descripcion= datos.descripcion;


console.log(descripcion);
  const dato = [];
 
 return new Promise((resolve, reject)=>{
   this.storage.executeSql("INSERT or IGNORE INTO dependencia(id_dependencia, codigo, descripcion) VALUES (?, ?, ?);",[id_dependencia, codigo, descripcion])
   .then(async res => { 

    console.log("dependencia insertados");
    
    const  prueba={"message":"dependencia insertados"};

    resolve(prueba);
            
   }, (error) =>{
    reject(error);
  
  });

 
});
}
    public async eliminarFirma(datos: any) {
      const Nombres= datos.Nombres;
      const cedula= datos.cedula;
      var firma= datos.firma;
      const id_encuesta= datos.id_encuesta;
      firma = firma.replace( " " , "+" , firma );     

      const dato = [];

      return new Promise((resolve, reject)=>{
        this.storage.executeSql("DELETE FROM firmas WHERE Nombres = ? AND cedula= ? AND firma= ? AND id_encuesta= ?",[Nombres, cedula, firma,id_encuesta])
        .then(async res => { 
     
         console.log(res.rows.length);
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
           console.log(res.rows);
           
                     dato.push({ 
                       Nombres: res.rows.item(i).Nombres,
                       cedula: res.rows.item(i).cedula,
                       firma: res.rows.item(i).firma,
                       id_encuesta: res.rows.item(i).id_encuesta
                      });
                   }
                   const  prueba={"message":dato};
     
                   resolve(prueba); 
                 }
                 else{
                
                
                const  prueba={"message":"firma eliminada"};
  
                resolve(prueba); 

                 }
     
                
                 
        }, (error) =>{
         reject(error);
       
       });
  
      
    });
  
    }

    public async loadTraerEncuesta() {
      const user = await this.st.get("user");
  
      const dato = [];

      return new Promise((resolve, reject)=>{
        this.storage.executeSql("SELECT * FROM encuestas WHERE id_encuesta = (SELECT MAX(id_encuesta) FROM encuestas WHERE estado = 'activo' or estado = 'editado') AND id_usuario = ?;",[user])
        .then(async res => { 
     
         console.log(res.rows.length);
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
           console.log(res.rows);
           
                     dato.push({ 
                      id_encuesta:res.rows.item(i).id_encuesta
                      });
                   }
                   const  prueba={"message":dato};
     
                   resolve(prueba); 
                 }
     
                 
        }, (error) =>{
         reject(error);
       
       });
  
      
    });
    }
    public async loadOpcionRta(pregu: any) {
      const datos = [];
      
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("SELECT O.ID_OPCION_RTA, O.ORDEN_OPCIONES, O.TITULO, O.VALOR, P.ID_PREGUNTA FROM PREG_OPC AS PO INNER JOIN PREGUNTAS AS P ON P.ID_PREGUNTA = PO.ID_PREGUNTA INNER JOIN  OPCIONES_RTA AS O ON O.ID_OPCION_RTA = PO.ID_OPCION_RTA WHERE P.ID_PREGUNTA = ?",[pregu])
        .then(async res => { 
     
         console.log(res.rows.length);
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
           console.log(res.rows);
           
                     datos.push({ 
                       ID_OPCION_RTA: res.rows.item(i).id_opcion_rta,
                       ORDEN_OPCIONES: res.rows.item(i).orden_opciones,
                       TITULO: res.rows.item(i).titulo,
                       VALOR: res.rows.item(i).valor,
                       ID_PREGUNTA: res.rows.item(i).id_pregunta
                      });
                   }
                   const  prueba={"message":datos};
     
                   resolve(prueba); 
                 }
                 else{
                  datos.push();

                   const  prueba={"message":datos};
     
                   resolve(prueba); 
                 }
     
                
                 
        }, (error) =>{
         reject(error);
       
       });
    });
    }

    public async loadRespuestasEncuestas(id_encuesta: any) {
      const dato = [];
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("SELECT id_respuesta, respuesta, observacion, evidencia, id_opcion_rta, id_pregunta, id_encuesta FROM respuestas_enc WHERE id_encuesta = ?;",
        [id_encuesta])
        .then(async res => { 
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) {           

                     dato.push({ 
                      id_respuesta: res.rows.item(i).id_respuesta,
                      respuesta: res.rows.item(i).respuesta,
                      observacion: res.rows.item(i).observacion,
                      evidencia: res.rows.item(i).evidencia,
                      id_opcion_rta: res.rows.item(i).id_opcion_rta,
                      id_pregunta: res.rows.item(i).id_pregunta,
                      id_encuesta: res.rows.item(i).id_encuesta
                      });
                   }
                   const  prueba={"message":dato};
console.log(prueba);
                   resolve(prueba); 


                 }else{
                  dato.push({ 
                   
                    });
                 
                 const  prueba={"message":"no hay datos"};
   
                 resolve(prueba); 
                 }
     
                
                 
        }, (error) =>{
         reject(error);
       
       });
  
      
    });
    }



    
    public async loadEncuestasFinalizadas() {
      const user = await this.st.get("user");
  
      console.log(user);
  
      const datos = [];
      
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("SELECT  c.numero, c.coordinador, co.id_encuesta, co.numero_de_consignacion, co.numero_grupo_trabajo, co.nombre_jefe_consignacion, co.fecha_encuesta, co.actividad_realizar, co.id_contrato, co.id_app, co.id_usuario, co.estado, co.fecha_sistema FROM encuestas  AS co INNER JOIN contrato AS c ON c.id_contrato = co.id_contrato WHERE  co.id_usuario = ? AND (co.estado = 'Finalizado') ORDER BY  co.id_encuesta DESC;", [user])
        .then(async res => { 
     
         console.log(res.rows.length);
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
           console.log(res.rows);
           
                     datos.push({ 
                       numero: res.rows.item(i).numero,
                       coordinador: res.rows.item(i).coordinador,
                       id_encuesta: res.rows.item(i).id_encuesta,
                       numero_de_consignacion: res.rows.item(i).numero_de_consignacion,
                       numero_grupo_trabajo: res.rows.item(i).numero_grupo_trabajo,
                       nombre_jefe_consignacion: res.rows.item(i).nombre_jefe_consignacion,
                       fecha_encuesta: res.rows.item(i).fecha_encuesta,
                       actividad_realizar: res.rows.item(i).actividad_realizar,
                       id_contrato: res.rows.item(i).id_contrato,
                       estado: res.rows.item(i).estado,
                       id_app: res.rows.item(i).id_app
                      });
                   }
                   const  prueba={"message":datos};
     
                   resolve(prueba); 
                 }
                 else{
                  const  prueba={"message":"No hay datos"};
     
                  resolve(prueba);  
                 }
     
                
                 
        }, (error) =>{
         reject(error);
       
       });
  
      
    });
  
    
    }

    public async loadEncuesta(encuesta: any) {
      const user = await this.st.get("user");
  
      console.log(user);
  
      console.log(encuesta);
      const datos = [];
      
      return new Promise((resolve, reject)=>{
        this.storage.executeSql("SELECT c.numero, c.coordinador, co.id_encuesta, co.numero_de_consignacion, co.numero_grupo_trabajo, co.nombre_jefe_consignacion, co.fecha_encuesta, co.actividad_realizar, co.id_contrato  FROM encuestas  AS co INNER JOIN contrato AS c ON c.id_contrato = co.id_contrato WHERE co.id_app = ? AND co.id_usuario = ? AND (co.estado = 'activo' OR co.estado = 'Editado') ORDER BY  co.id_encuesta DESC;", [encuesta,user])
        .then(async res => { 
     
         console.log(res.rows.length);
         
           if (res.rows.length > 0) {
         for (var i = 0; i < res.rows.length; i++) { 
           console.log(res);
           console.log(res.rows);
           
                     datos.push({ 
                       numero: res.rows.item(i).numero,
                       coordinador: res.rows.item(i).coordinador,
                       id_encuesta: res.rows.item(i).id_encuesta,
                       numero_de_consignacion: res.rows.item(i).numero_de_consignacion,
                       numero_grupo_trabajo: res.rows.item(i).numero_grupo_trabajo,
                       nombre_jefe_consignacion: res.rows.item(i).nombre_jefe_consignacion,
                       fecha_encuesta: res.rows.item(i).fecha_encuesta,
                       actividad_realizar: res.rows.item(i).actividad_realizar,
                       id_contrato: res.rows.item(i).id_contrato
                      });
                   }
                   const  prueba={"message":datos};
     
                   resolve(prueba); 
                 }
     
                
                 
        }, (error) =>{
         reject(error);
       
       });
  
      
    });
  
    
    }

    //REALIZA UN SELECT EN LA TABLA PARAMETRIZACION PARA EL CONTENIDO DEL HOME
  public  contenidoHome() {
    const datos = [];
    return new Promise((resolve, reject)=>{
    this.storage.executeSql("SELECT titulo, subtitulo, imagen, descripcion FROM parametrizacions WHERE activo = 'S'",[])
   .then(async res => { 

    console.log(res.rows.length);
    
      if (res.rows.length > 0) {
    for (var i = 0; i < res.rows.length; i++) { 
      console.log(res);
      console.log(res.rows);
      
                datos.push({ 
                  titulo: res.rows.item(i).titulo,
                  subtitulo: res.rows.item(i).subtitulo,
                  imagen: res.rows.item(i).imagen,
                  descripcion: res.rows.item(i).descripcion
                 });
              }
              const  prueba={"message":datos};

              resolve(prueba); 
            }

           
            
   }, (error) =>{
    reject(error);
  
  });
 
  });


  }

  //Realiza la consulta con el usuario y clave ingresado
public getUsuarios(usuario:string, clave:string){
return new Promise((resolve, reject)=>{

   this.storage.executeSql("SELECT U.NOMBRE AS N_USUARIO, U.ID_USUARIO AS ID_USUARIO, APP.NOMBRE AS N_APP, R.NOMBRE AS N_ROL FROM USUARIO AS U INNER JOIN USU_ROL AS UR ON U.ID_USUARIO = UR.ID_USUARIO INNER JOIN ROLES AS R ON UR.ID_ROL = R.ID_ROL INNER JOIN APP ON R.ID_APP = APP.ID_APP WHERE U.USUARIO = ? AND U.CLAVE = ? AND U.ESTADO = 'activo'", [usuario,clave])
   .then(async res => { 

    
      const datos = [];
      if (res.rows.length > 0) {
       
        for (var i = 0; i < res.rows.length; i++) { 
console.log(res);
console.log(res.rows);

          datos.push({ 
            N_USUARIO: res.rows.item(i).N_USUARIO,
            ID_USUARIO: res.rows.item(i).ID_USUARIO+"",
            N_APP: res.rows.item(i).N_APP,
            N_ROL: res.rows.item(i).N_ROL
           });
         
        }
      
     

            var flagILI:number = 0;
            var flagODC:number = 0;
            var flagCRO:number = 0;
           const  prueba={"message":datos}
console.log(prueba);
            //SE GUARDA LA VARIABLE DE SESSION
            await this.st.set("session", true);

            //SE GUARDA EL NOMBRE DEL USUARIO
            await this.st.set("name", res.rows.item(0).N_USUARIO);

            //SE GUARDA EL ID DEL USUARIO
            await this.st.set("user", res.rows.item(0).ID_USUARIO);

            //SE GUARDA EL TIPO DE CONEXION

            await this.st.set("conexion", "offline");


            //SE RECORRE EL OBJETO DE RESPUESTA PARA VALIDAR EL ACCESO A LOS MODULOS DEL SISTEMA
          prueba['message'].forEach( async obj => {
              
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

            });
          

            //SE RESUELVE LA PROMESA
            resolve(true);
        
            this.songsList.next(datos);
          }
          else{
            resolve(false);

            
          }
   },

          (error) =>{
            reject(error);
          
          }
    //RETORNAMOS LA PROMESA
   );
        
        });
      

  }


  

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


 

  // Add
 
 

  getUsuario(usuario,clave): Promise<usuarios> {
    return this.storage.executeSql( "SELECT U.NOMBRE AS N_USUARIO, U.ID_USUARIO AS ID_USUARIO, APP.NOMBRE AS N_APP, R.NOMBRE AS N_ROL FROM USUARIO AS U INNER JOIN USU_ROL AS UR ON U.ID_USUARIO = UR.ID_USUARIO INNER JOIN ROLES AS R ON UR.ID_ROL = R.ID_ROL INNER JOIN APP ON R.ID_APP = APP.ID_APP WHERE U.USUARIO = ? AND U.CLAVE = ? AND U.ESTADO = 'activo'").then(res => { 
      return {
        id_usuario: res.rows.item(0).id_usuario,
        nombre: res.rows.item(0).nombre,  
        usuario: res.rows.item(0).usuario, 
        clave: res.rows.item(0).clave,
        estado : res.rows.item(0).estado,
            cedula : res.rows.item(0).cedula
           
      }
    });
  }

  // Update
 
  
}