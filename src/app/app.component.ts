import { Component } from "@angular/core";

import { Platform, NavController, Events } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AuthService } from "../app/services/auth.service";
import { DbService } from "../app/services/db.service";


/*PLUGIN STORAGE */
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
})
export class AppComponent {
  public appPages = [
    {
      title: "Inicio",
      url: "/home",
      icon: "home",
      ref: "HOME",
      auth: true,
    },
    {
      title: "Accidentalidad",
      url: "/accidentalidad",
      icon: "pie",
      ref: "ACC",
      auth: false,
    },
    {
      title: "Inspecciones/Encuestas",
      url: "/encuesta",
      icon: "clipboard",
      ref: "encuesta",
      auth: true,
    },

    {
      title: "Subir encuestas",
      url: "/encuestaFinalizada",
      icon: "clipboard",
      ref: "encuesta2",
      auth: true,
    },

    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private AuthService: AuthService,
    private navCtrl: NavController,
    private st: Storage,
    private event: Events
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      const session = await this.AuthService.loadSession();

      if (session) {
        //SE RECORREN LOS VALORES ALMACENADOS EN EL STORAGE
        await this.st.forEach((value, key) => {
          //SE RECORREN LAS PAGINAS  DEL SIDE MENU
          this.appPages.forEach((page) => {
            //SE VALIDA SI LAS PAGINAS COINCIDEN Y SE ASIGNA EL VALOR RETORNADO DEL STORAGE
            //EN LA PROPIEDAD AUTH
            if (page.ref == key.toString()) {
              //SE ASIGNA EL VALOR DEL STORAGE
              page.auth = value;
            }
          });
        });
        //REDIRECCION AL HOME
        this.navCtrl.navigateRoot("/home", { animated: true });
      } else {
        //REDIRECCION AL LOGIN
        this.navCtrl.navigateRoot("/login", { animated: true });
      }

      //EVENTO DE USUARIO LOGEADO, PARA ACTUALIZAR EL LISTADO DEL SIDE-MENU
      this.event.subscribe("isLogged", async (rta) => {
        //SI REALMENTE INICIO SESSION -> ENTRA
        if (rta) {
          //SE RECORREN LOS VALORES ALMACENADOS EN EL STORAGE
          await this.st.forEach((value, key) => {
            //SE RECORREN LAS PAGINAS  DEL SIDE MENU
            this.appPages.forEach((page) => {
              //SE VALIDA SI LAS PAGINAS COINCIDEN Y SE ASIGNA EL VALOR RETORNADO DEL STORAGE
              //EN LA PROPIEDAD AUTH
              if (page.ref == key.toString()) {
                //SE ASIGNA EL VALOR DEL STORAGE
                page.auth = value;
              }
            });
          });
        }
      });
    });
  }
}
