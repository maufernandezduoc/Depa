import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'patente',
        pathMatch: 'full'
      },
      {
        path: 'patente',
        loadChildren: () => import('../patente/patente.module').then(m => m.PatentePageModule)
      },
      {
        path: 'estacionamiento',
        loadChildren: () => import('../estacionamiento/estacionamiento.module').then(m => m.EstacionamientoPageModule)
      },
      {
        path: 'visita',
        loadChildren: () => import('../visita/visita.module').then(m => m.VisitaPageModule)
      },
      {
        path: 'paquete',
        loadChildren: () => import('../paquete/paquete.module').then(m => m.PaquetePageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/patente',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
