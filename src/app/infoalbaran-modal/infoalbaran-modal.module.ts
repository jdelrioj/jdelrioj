import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoalbaranModalPageRoutingModule } from './infoalbaran-modal-routing.module';

import { InfoalbaranModalPage } from './infoalbaran-modal.page';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SignaturePadModule,
    InfoalbaranModalPageRoutingModule
  ],
  declarations: [InfoalbaranModalPage]
})
export class InfoalbaranModalPageModule {}
