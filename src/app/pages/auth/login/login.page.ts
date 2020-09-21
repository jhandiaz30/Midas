import { Component, OnInit } from "@angular/core";
/*SE IMPORTAN LAS LIBRERIAS QUE SIRVE PARA VALIDAR LOS FORMULARIOS */
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
/*SE IMPORTAN LOS METODOS DE UTILIDADES */
import { UtilitiesService } from "../../../services/utilities.service";
import { AuthService } from "../../../services/auth.service";

import { NavController, MenuController, Events } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public formLogin: FormGroup;

  constructor(
    private formB: FormBuilder,
    private utilServ: UtilitiesService,
    private authServ: AuthService,
    private navCtrl: NavController,
    public menuCtrl: MenuController,
    private event: Events
  ) {
    this.formLogin = this.formB.group({
      usuario: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
    });
  }

  public async login() {
    //SE MUESTRA GIF CARGANDO
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
      
      this.event.publish("isLogged", true);

      this.menuCtrl.enable(true);

      this.navCtrl.navigateRoot("/home", { animated: true });
    }
    await this.utilServ.closePresentLoading();
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }
}
