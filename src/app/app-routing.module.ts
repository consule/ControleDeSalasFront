import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalasComponent } from './salas/salas.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: "salas",
    component: SalasComponent
  },
  {
    path: "dashboard", component: DashboardComponent
  },
  {
    path: "", component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
