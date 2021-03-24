import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  constructor(public loadingcontroller: LoadingController) { }
  loading:HTMLIonLoadingElement;

  ngOnInit() { }

  public async presentLoading() {
    await this.hideLoading();
    if(this.loading){
      this.loading.dismiss();
    }
    this.loading = await this.loadingcontroller.create({
    });
    await this.loading.present();
  }

  public async hideLoading(){
    if(this.loading){
      await this.loading.dismiss();
    }
    this.loading=null;
  }

}
