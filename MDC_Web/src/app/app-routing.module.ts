import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: 'generacion',
    loadChildren: () => import('./modules/entry-projects/generation/generacion.module').then(mod => mod.GeneracionModule)
  },
  {
    path: 'transmision',
    loadChildren: () => import('./modules/entry-projects/transmision/transmision.module').then(mod => mod.TransmisionModule)
  },
  {
    path: 'activos-generacion',
    loadChildren: () => import('./modules/activos/activos-generacion/activos-generacion.module').then(mod => mod.ActivosGeneracionModule)
  },
  {
    path: 'activos-transmision',
    loadChildren: () => import('./modules/activos/activos-transmision/activos-transmision.module').then(mod => mod.ActivosTransmisionModule)
  },
  {
    path: 'requirements',
    loadChildren: () => import('./modules/requirements/requirements.module').then(mod => mod.RequirementsModule)
  },
  {
    path: 'assets-operation',
    loadChildren: () => import('./modules/activos/assets-operation/assets-operation.module').then(mod => mod.AssetsOperationModule)
  },
  {
    path: 'config-elements',
    loadChildren: () => import('./modules/hidrometeorology/config-elements/config-elements.module').then(mod => mod.ConfigElementsModule)

  },
  {
    path: 'neptuno',
    loadChildren: () => import('./modules/neptuno/neptuno.module').then(mod => mod.NeptunoModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
