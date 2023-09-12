import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { PagesComponent } from './pages.component';
import { ReusableModule } from '../reutilizable/reutilizable.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
    declarations: [
        NavegacionComponent,
        PagesComponent
    ],
    imports:[
        CommonModule,
        ReusableModule,
        PagesRoutingModule
    ],
    providers:[]
})
export class PagesModule{}