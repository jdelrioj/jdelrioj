import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user;
  constructor(private api:ApiService, private router:Router) {
  }

  ngOnInit() {
    
  }

  logOut(){
    this.api.logout();
    this.router.navigate(['/login']);
    //console.log("logout");
  }

}
