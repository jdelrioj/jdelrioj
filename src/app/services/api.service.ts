import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Albaranes } from '../interfaces/albaranes';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { Logindata } from '../interfaces/logindata';
import { publishFacade } from '@angular/compiler';

  

@Injectable({
  providedIn: 'root'
})

export class ApiService{

  private datosrecibidostemp: Logindata;
  
  public user: User;
  private api = 'https://singnote.tandemsm.com';
  constructor(private http: HttpClient, private localS: NativeStorage, private router: Router) {
    //this.checkSession();
  }

  public isLogged():boolean{
    if(this.user==null){
      return false;
    }else{
      return true;
    }
  }

  async init(){
    //console.log("init api")
    let u=null;
    try{
      u = await this.localS.getItem('user');
      //console.log("bruh "+u.email)
    }catch(err){
      //console.log("aaaaaaaaaa")
      u=null;
    }
    
    if(u!=null){
      //console.log("aa")
      this.user=u;
    }

    if(!this.isLogged()){
      this.router.navigate(['login'])
      return false;
    }else{
      this.router.navigate(['mainmenu'])
    }
    return true;
  }

  /*
    codigoempresa -> 1
    ejercicioalbaran -> 2021
    seriealbaran -> T
    numeroalbaran -> 1
    archivo -> aquí el base 64
    fecha -> fecha y hora
    nombre -> Nombre cualquiera
    apellidos -> Apellidos cualquiera
    dni -> Dni valido
  */

  //añadir nueva firma
  enviarFirma(datos: Albaranes): Observable<any> {
    return this.http.post<any>(this.api+'/api/insertarfirma', datos);
  }

  //Obtener todos los albaranes
  getAlbaranes(): Observable<any> {
    /*
      http://singnote.tandemsm.com/api/index.php/mostrarcabeceraalbaran/7ab51713a7193ff0ecd278a52ff0de99/1
      primer parametro token, segundo código de empresa.
    */
    return this.http.get<any>(this.api+`/api/mostrarcabeceraalbaran/${this.datosrecibidostemp["Token"]}/${this.datosrecibidostemp["CodigoEmpresa"]}`);

  }

  //mostrar lineas de un albarán según los campos que tenga en la cabecera
  public getLinesAlbaran(ejercicio: string, serie: string, numero: string) {
    /*
      http://singnote.tandemsm.com/api/index.php/mostrarlineasalbaran/7ab51713a7193ff0ecd278a52ff0de99/1/2016/SC/452
      token/codigoempresa/ejercicio/serie/numero
    */
    return this.http.get<any>(this.api+`/api/mostrarlineasalbaran/${this.datosrecibidostemp["Token"]}/${this.datosrecibidostemp["CodigoEmpresa"]}/${ejercicio}/${serie}/${numero}`);
  }


  
  login(usuario: string, contraseña: string): Observable<any>{
    
    //console.log(this.http.get<any>(`/api/loginapp/${usuario}/${contraseña}`));
    return this.http.get<any>(this.api+`/api/loginapp/${usuario}/${contraseña}`);
  }

  setDatosrecibidos(valor: Logindata){
    this.datosrecibidostemp = valor;
  }

  
  getDatosrecibidos(){
    return this.datosrecibidostemp;
  }

  
  public async logout() {
    //usuario
    this.user = null;
    //await this.saveSession();
    await this.localS.remove('user');
    //cookie
  }

  /*
  * Almacena el usuario en local con el nombre
  * @param user el usuario a almacenar, y en caso de por defecto se eliminará
  */
  public async saveSession(user?: User) {
    //console.log(user)
    if (user) {
      await this.localS.setItem('user', user);
      //console.log("notnull")
    } else {
      await this.localS.remove('user');
      //console.log("null");
    }
  }


}
