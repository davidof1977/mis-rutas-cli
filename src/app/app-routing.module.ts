import { NuevaRutaComponent } from './nueva-ruta/nueva-ruta.component';
import { PrincipalComponent } from './navegador/principal/principal.component';
import { MisrutasComponent } from './misrutas/misrutas.component';
import { MapaComponent } from './mapa/mapa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';


const routes: Routes = [
  {path: 'nuevaRuta', component: NuevaRutaComponent, canActivate: [AuthGuardService]},
  {path: '', component: PrincipalComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
