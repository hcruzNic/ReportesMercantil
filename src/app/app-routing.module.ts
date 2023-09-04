import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SociedadesInscritasComponent } from "src/app/modules/sociedades-inscritas/sociedades-inscritas.component";
import { SucursalesComponent } from './modules/sucursales/sucursales.component';
import { ComerciantesComponent } from './modules/comerciantes/comerciantes.component';

const routes: Routes = [
  {path:'sociedadesInscritas',component:SociedadesInscritasComponent},
  {path:'sucursales',component:SucursalesComponent},
  {path:'comerciantes',component:ComerciantesComponent}  
];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
