import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ComprasComponent } from './compras/compras.component';
import { VentasComponent } from './ventas/ventas.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
        {path: 'dashboard', component: DashboardComponent },
        {path: 'vehiculos', component: VehiculosComponent},
        {path: 'clientes', component: ClientesComponent},
        {path: 'compras', component: ComprasComponent},
        {path: 'ventas', component: VentasComponent},
        {path: 'proveedores', component: ProveedoresComponent},
      {path: '**', redirectTo: 'dashboard'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
