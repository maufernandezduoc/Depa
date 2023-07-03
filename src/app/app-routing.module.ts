import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'patente',
    loadChildren: () => import('./patente/patente.module').then(m => m.PatentePageModule)
  },
  {
    path: 'estacionamiento',
    loadChildren: () => import('./estacionamiento/estacionamiento.module').then(m => m.EstacionamientoPageModule)
  },
  {
    path: 'visita',
    loadChildren: () => import('./visita/visita.module').then(m => m.VisitaPageModule)
  },
  {
    path: 'paquete',
    loadChildren: () => import('./paquete/paquete.module').then(m => m.PaquetePageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
