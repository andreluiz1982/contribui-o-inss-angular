import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalariosComponent } from './view/salarios/salarios.component';
import { AliquotaComponent } from './view/aliquota/aliquota.component';
import { ContribuinteComponent } from './view/contribuinte/contribuinte.component';

const routes: Routes = [

  { component: SalariosComponent, path: 'salario'},
  { component: AliquotaComponent, path: 'aliquota'},
  { component: ContribuinteComponent, path: 'contribuinte'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
