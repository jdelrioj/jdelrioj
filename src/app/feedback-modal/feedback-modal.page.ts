import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.page.html',
  styleUrls: ['./feedback-modal.page.scss'],
})
export class FeedbackModalPage implements OnInit {

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  backToAlbaranes() {
    this.dismiss();
    this.router.navigate(['/albaranes']);
  }

  //Cierra el modal
  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
