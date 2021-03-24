import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ToastComponent
  ],

  exports: [
    LoadingComponent,
    ToastComponent
  ],

  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
