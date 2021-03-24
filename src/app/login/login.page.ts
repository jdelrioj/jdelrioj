import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { ApiService } from '../services/api.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Logindata } from '../interfaces/logindata';
import { UtilitiesService } from '../services/utilities.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User
  public loginForm: FormGroup;
  md5 = new Md5();
  dataR: Logindata;
  constructor(private svc: ApiService, private router: Router, private formBuilder: FormBuilder, private utilities:UtilitiesService) {

  }



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }


  //Login
  onLogin(form: FormGroup) {
    let userdata: User
    userdata = {
      email: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
      empresa:''
    }
    this.svc.user=userdata;
    try {
      userdata.password = (Md5.hashStr(userdata.password) as string);
      //console.log('email: ' + userdata.email);
      //console.log('pass: ' + userdata.password);

      this.svc.login(userdata.email, userdata.password)
        .subscribe(datosrecibidos => {
          //console.log(datosrecibidos)
          if(datosrecibidos.Token!=null){
          this.dataR = datosrecibidos;
          console.log("datosrecibidos "+datosrecibidos.empresa)
          console.log("this.datosrecibidos"+this.dataR.NombreEmpresa)
          //console.log(datosrecibidos.Token);

          userdata.empresa = this.dataR.NombreEmpresa;

          this.svc.setDatosrecibidos(this.dataR);

          this.router.navigate(['/mainmenu']);
          }else{
            this.utilities.presentToast("Los datos del usuario no son correctos","danger");
          }
          
        });

      if (userdata) {
        this.svc.saveSession(userdata);
        console.log("userdata"+userdata.empresa)
      }else{

      }

    } catch (err) {
      userdata = null;
      console.log(err)
    }
  }

  saveUserdata() {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    return saveUserdata;
  }

}