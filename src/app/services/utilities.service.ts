import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class UtilitiesService {
  public loading: any;

  constructor(
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  /* FUNCION QUE CREA EL MODAL QUE PRESENTA LOS MENSAJES*/
  public async presentLoading(msj: string) {
    this.loading = await this.loadCtrl.create({
      message: msj,
      backdropDismiss: false,
      duration: 300000,
    });

    return await this.loading.present();
  }

  /*FUNCION QUE CIERRA EL MODAL */
  public async closePresentLoading() {
    return await this.loading.dismiss();
  }

  /* FUNCION QUE CREA EL TOAST QUE PRESENTA LOS MENSAJES*/
  public async presentToast(msj: string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 2500,
    });

    return await toast.present();
  }

  public async presentAlert(msj: string) {
    const alert = await this.alertCtrl.create({
      header: "Aviso",
      backdropDismiss: false,
      message: msj,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
