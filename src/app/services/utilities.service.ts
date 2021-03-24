import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private toast:ToastController) {

   }

   async presentToast(msg:string, col:string){
     const tt = await this.toast.create({
       message:msg,
       color:col,
       duration: 2000,
       position: "top"
     });
     tt.present();
   }
}
