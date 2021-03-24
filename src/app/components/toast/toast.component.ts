import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {

  constructor(public toastcontroller: ToastController){ }
  ngOnInit() {}


  async presentToast(msg: string, col: string, dur: number = 1200) {
      const toast = await this.toastcontroller.create({
          message: msg,
          duration: dur,
          color: col
      });
      toast.present();
  }
}
