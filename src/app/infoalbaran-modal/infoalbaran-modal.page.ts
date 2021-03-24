import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Albaranes } from '../interfaces/albaranes';
import { ApiService } from '../services/api.service';
import { ToastComponent } from '../components/toast/toast.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad';
import { LineasAlbaran } from '../interfaces/lineas-albaran';
import { LoadingComponent } from '../components/loading/loading.component';
import { FeedbackModalPage } from '../feedback-modal/feedback-modal.page';

@Component({
  selector: 'app-infoalbaran-modal',
  templateUrl: './infoalbaran-modal.page.html',
  styleUrls: ['./infoalbaran-modal.page.scss'],
})
export class InfoalbaranModalPage implements OnInit {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  //Lo que le pasas a la page
  @Input() myData: Albaranes;

  public signatureform: FormGroup;

  public albarandetails: FormGroup;

  albaranes: Albaranes[] = [];
  lineasalbaranes: LineasAlbaran[] = [];
  base64: string;

  //Constructor en el cual conectamos el ftp con nuestras credenciales.
  constructor(private svc: ApiService, private myToast: ToastComponent, private formBuilder: FormBuilder,
    private modalCtrl: ModalController, private nav: NavController, private navParams: NavParams, private myLoading: LoadingComponent) {

    this.myData = navParams.get('Albaran');
  }

  now = new Date();

  /*
   var CodigoEmpresa = '1';
    var EjercicioAlbaran = '2021';
    var SerieAlbaran = 'T';
    var NumeroAlbaran = '5';
    var archivo: string;
    var FechaAlbaran = '2021-01-15';
    var NombreEnvios = 'xxxxx';
    var apellidos = 'xxxxx xxxxx';
    var dni = '11223344A';
  */
  ngOnInit() {
    this.signatureform = this.formBuilder.group({
      CodigoEmpresa: [this.myData.CodigoEmpresa],
      EjercicioAlbaran: [this.myData.EjercicioAlbaran],
      SerieAlbaran: [this.myData.SerieAlbaran],
      NumeroAlbaran: [this.myData.NumeroAlbaran],
      archivo: [this.base64],
      FechaAlbaran: [this.myData.FechaAlbaran],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      //dni expr '/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i'
      dni: ['', Validators.required],
    });


    this.svc.getLinesAlbaran(this.myData.EjercicioAlbaran, this.myData.SerieAlbaran, this.myData.NumeroAlbaran)
      .subscribe(lineasalbaranes => {
        console.log(lineasalbaranes);
        this.lineasalbaranes = lineasalbaranes;
      });

  }

  /*
  Ionic <-> dispositivo móvil
  ionic cordova run android
  */


  //Opciones del panel de firmas
  private signaturePadOptions: Object = {
    'maxWidth': 2,
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 250,
  };



  // Método que limpia el panel de firmas.
  clear() {
    this.signaturePad.clear();
    this.base64 = '';
  }


  /*
    Método que devuelve la firma como URL de datos y la impreme por consola.
  */
  save() {
    var canvas = document.querySelector('canvas');
    var dataURL = canvas.toDataURL();
    console.log(dataURL);

  }

  //http://rafinguer.blogspot.com/2017/03/ionic-2-seleccion-de-fecha-y-hora.html
  addSignature() {
    this.savePNG();
    let data: Albaranes;
    data = {
      CodigoEmpresa: this.signatureform.get('CodigoEmpresa').value,
      EjercicioAlbaran: this.signatureform.get('EjercicioAlbaran').value,
      SerieAlbaran: this.signatureform.get('SerieAlbaran').value,
      NumeroAlbaran: this.signatureform.get('NumeroAlbaran').value,
      archivo: this.base64,
      FechaAlbaran: this.now.toString(),
      nombre: this.signatureform.get('nombre').value,
      apellidos: this.signatureform.get('apellidos').value,
      dni: this.signatureform.get('dni').value,

    }
    this.myLoading.presentLoading();

    try {
      this.svc.enviarFirma(data).subscribe((ok) => {
        this.signatureform.reset();
        this.clear();
        this.myToast.presentToast("Albarán agregado", 'success');
        this.myLoading.hideLoading();
      })
    } catch (error) {
      this.myToast.presentToast("Error", 'danger', 4000);
    }
    this.myLoading.hideLoading();

    this.close();

    this.presentModal();
  }

  /*
    Método que cuando el panel de firmas no esté vacío, descarga en contenido en .png utilizando dowload()
  */
  savePNG() {
    if (this.signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      var dataURL = this.signaturePad.toDataURL();
      this.base64 = dataURL;
      //this.download(dataURL, "signature.png");
    }
  }

  //ionic cordova run android -l -c -t=Pixel
  /*
    método el cual pasa el dato a blob y lo descarga. utiliza dataURLToBlob()
  */
  download(dataURL, filename) {
    var blob = this.dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }

  /*
     Método que transforma el dato en forma de url, a un dato de objeto binario grande.
  */
  dataURLToBlob(dataURL) {
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  //Cierra el modal
  close() {
    this.modalCtrl.dismiss();
  }


  /*
  Método que abre el modal page de feedback
  */
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: FeedbackModalPage
    });
    return await modal.present();
  }

  

}

