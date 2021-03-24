import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {


  constructor(public alertController: AlertController) { }

  ngOnInit() { }

  myPromiseAlert: Promise<boolean>;

  async presentAlert() {
    let ok: boolean = false;
    const alert = await this.alertController.create({
      header: 'Mensaje de alerta',
      message: '¿Estás seguro de borrar estos datos?',
      buttons: [
        {
          text: 'No.',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Si.',
          handler: () => {
            console.log('Confirm Ok');
            ok = true;
          }
        }
      ]
    });

    await alert.present();

    return this.myPromiseAlert = new Promise((result, error) => {
      alert.onWillDismiss().then(() => {
        result(ok);
      }).catch((err) => {
        error(err);
      });
    })
  }


}