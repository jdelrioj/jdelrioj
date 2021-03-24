import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {

  constructor(private router:Router, private modalcontroller:ModalController, private api:ApiService) { }

  ngOnInit() {
  }

  logOut(){
    this.api.logout();
    this.router.navigate(['/login']);
  }

  public async goProfile(){
    //console.log("profile")
    /*
    const modal = await this.modalcontroller.create({
      component: ProfilePage,
      cssClass:'my-custom-class',
      componentProps:{

      }
    });

    return await modal.present();*/
    this.router.navigate(['/profile'])
  }

}
