import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { InfoalbaranModalPage } from '../infoalbaran-modal/infoalbaran-modal.page';
import { Albaranes } from '../interfaces/albaranes';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  textoBuscar = '';
  albaranes: Albaranes[] = [];
  albackup: Albaranes[] = [];

  constructor(private svc: ApiService, private modalCtrl: ModalController, private myLoading: LoadingComponent) {

  }

  ngOnInit() {
    this.svc.getAlbaranes()
      .subscribe(albaranes => {
        console.log(albaranes);
        this.albaranes = albaranes;
      });

    this.svc.getAlbaranes()
      .subscribe(albackup => {
        console.log(albackup);
        this.albackup = albackup;
      });
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

  /*
   Método que filtra el array por razón social del albarán
 */
  async filterList(evt) {
    this.albaranes = this.albackup;
    const searchTerm = evt.srcElement.value;

    if (searchTerm || searchTerm.trim() != '') {
      this.albaranes = this.albaranes.filter(currentAlbaran => {
        if (currentAlbaran.RazonSocial && searchTerm) {
          return (currentAlbaran.RazonSocial.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    } else {
      this.ngOnInit();
    }

  }

  /*
     Método que abre el modal page para pasar los cambos del albarán
     Le pasa al modal page un objeto albarán
     */
  async presentModal2(myData: Albaranes) {
    const modal = await this.modalCtrl.create({
      component: InfoalbaranModalPage,
      componentProps: {
        'Albaran': myData
      }
    });
    return await modal.present();
  }

  /*
  Método para refrescar los datos manualmente deslizando el dedo de arriba a abajo
  Vuelve a cargar el array de albaranes.
  Llamando de nuevo al método getAlbaranes desde el Servicio.
  */
 public doRefresh(e: any) {
  this.myLoading.presentLoading();
  this.albaranes = [];
  console.log("Cargando albaranes...");
  this.svc.getAlbaranes().subscribe((listado) => {
    this.albaranes = listado;
    this.myLoading.hideLoading();

    e.target.complete()
  },
    error => {

      e.target.complete()
    });
}




  

}
