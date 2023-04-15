import { Component, OnInit } from "@angular/core";
/*SE IMPORTAN LAS LIBRERIAS QUE SIRVE PARA VALIDAR LOS FORMULARIOS */
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
/*SE IMPORTAN LOS METODOS DE UTILIDADES */
import { UtilitiesService } from "../../../services/utilities.service";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";


import { NavController, MenuController, Events, ToastController } from "@ionic/angular";
import { DbService } from '../../../services/db.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public formLogin: FormGroup;
  id: any;
  Data: any[] = [];
  public offline: boolean=true;
  public loadusuarios = [];
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



  constructor(
    private formB: FormBuilder,
    private utilServ: UtilitiesService,
    private authServ: AuthService,
    private navCtrl: NavController,
    public menuCtrl: MenuController,
    private db: DbService,
    private event: Events,
    private toast: ToastController,
    private router: Router

  ) {
    this.formLogin = this.formB.group({
      usuario: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
    });
  }

  openFirst() {
    this.menuCtrl.enable(true, 'first');
    this.menuCtrl.open('first');
  }

  openEnd() {
    this.menuCtrl.open('end');
  }

  openCustom() {
    this.menuCtrl.enable(true, 'custom');
    this.menuCtrl.open('custom');
  }




  public async Usuarios(){
    this.Data=[];

    await this.utilServ.presentLoading("Espere un momento...");
// Realiza la consulta a la base de datos local para
    this.db.getUsuarios( this.formLogin.value.usuario,this.formLogin.value.password).then(async(res) => {
    console.log(this.Data.length);
    if(this.Data.length>=0){
      this.cambiarDePagina();
      
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
//verifica la variable offline (Por defecto esta acttivo)
  public verificarConexion(){
    if(this.offline==true){
this.Usuarios();
    }
    else{
      // si no está activo las consultas se haran directamente al servidor y no a la db local
      this.login();
    }
  }

  //metodo que se encarga de verificar si el usuario y contraseña están en la base de datos local
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
    }
     else {
      //SI EL USUARIO ES VALIDO SE REDIRIGE EL ROOT DE LA APP HACIA EL HOME
      await this.utilServ.closePresentLoading();
      
      this.event.publish("isLogged", true);

      this.menuCtrl.enable(true);

      this.navCtrl.navigateRoot("/home", { animated: true });
    }
        await this.utilServ.closePresentLoading();


  }

  //

  public async subirDatos(){
    await this.utilServ.presentLoading("Espere un momento...");
    

    const usuarios = await this.authServ.loadUsuarios();
    console.log('Console log de preg: ' + JSON.stringify(usuarios));
    this.loadusuarios = usuarios['message'];
    console.log(this.loadusuarios);

    this.db.getUsuarios( this.formLogin.value.usuario,this.formLogin.value.password).then(async(res) => {
      console.log(this.Data.length);
      if(this.Data.length>0){
      
        this.cambiarDePagina();
      
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
  

  //metodo que permite el cambio de pantalla para el cargue de maestros
  public async descargarDatos(){

    this.router.navigateByUrl('/cargardatos');

  }
  
  async cambiarDePagina(){

    await this.utilServ.presentLoading("Espere un momento...");
    //SE VALIDA EL USUARIO
    const valid = await this.db.getUsuarios(
      this.formLogin.value.usuario,
      this.formLogin.value.password
    );
     console.log(valid != true);
   
    //SI LA PROMESA RETORNA UN TRUE SE DEJA INGRESAR AL USUARIO
    if (valid !=true) {
      //SI EL USUARIO NO ES VALIDO SE CIERRA EL LOADING Y SE MUESTRA UN MENSAJE TOAST, POR ULTIMO SE RESETEA EL FORMULARIO DE LOGIN
      await this.utilServ.closePresentLoading();
      //SE RESETEA EL FORMULARIO
      this.formLogin.reset();
      //SE MUESTRA MENSAJE DE USUARIO INVALIDO
      this.utilServ.presentToast("Usuario Invalido");
    } else {
      //SI EL USUARIO ES VALIDO SE REDIRIGE EL ROOT DE LA APP HACIA EL HOME
      await this.utilServ.closePresentLoading();
      
      this.event.publish("isLogged", true);

      this.menuCtrl.enable(true);
//lo redirecciona al home de la aplicación
      this.navCtrl.navigateRoot("/home", { animated: true });
    }
        await this.utilServ.closePresentLoading();

  }



  ngOnInit() {

    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchSongs().subscribe(item => {
          this.Data = item
        })
      }
    });
    

    this.formLogin = this.formB.group({
      usuario: [''],
      password: ['']
    }),
    this.menuCtrl.enable(false);

  }

}
