import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ApiService } from './services/api.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'infoalbaran-modal',
    loadChildren: () => import('./infoalbaran-modal/infoalbaran-modal.module').then( m => m.InfoalbaranModalPageModule)

  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'mainmenu',
    loadChildren: () => import('./pages/main-menu/main-menu.module').then( m=> m.MainMenuPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m=> m.ProfilePageModule)
  },
  {
    path: 'albaranes',
    loadChildren: () => import('./albaranes/albaranes.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'feedback-modal',
    loadChildren: () => import('./feedback-modal/feedback-modal.module').then( m => m.FeedbackModalPageModule)
  },
  {
    path: 'main-menu',
    loadChildren: () => import('./pages/main-menu/main-menu.module').then( m => m.MainMenuPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
