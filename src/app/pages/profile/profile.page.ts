import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { Logindata } from 'src/app/interfaces/logindata';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user;
  public data:Logindata;
  constructor(private api:ApiService, private router:Router) {
  }

  ngOnInit() {
    this.user = this.api.user;
    this.data = this.api.getDatosrecibidos();
    console.log(this.data)
  }

  logOut(){
    this.api.logout();
    this.router.navigate(['/login']);
    //console.log("logout");
  }

}
