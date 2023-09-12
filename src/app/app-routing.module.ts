import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', // Ruta vacía (raíz) redirecciona a 'pages'
    redirectTo: 'pages',
    pathMatch: 'full' // Asegura una redirección completa
  },
  {
    path: 'pages',
    loadChildren: () => import('./componentes/pages/pages.module').then(x => x.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
