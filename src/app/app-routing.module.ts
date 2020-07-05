import { NuevaRutaComponent } from './nueva-ruta/nueva-ruta.component';
import { PrincipalComponent } from './navegador/principal/principal.component';
import { MisrutasComponent } from './misrutas/misrutas.component';
import { MapaComponent } from './mapa/mapa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'nuevaRuta', component: NuevaRutaComponent},
  {path: 'listaRutas', component: PrincipalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
