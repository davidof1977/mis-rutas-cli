import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { MisrutasComponent } from './misrutas/misrutas.component';
import { CuerpoComponent } from './navegador/cuerpo/cuerpo.component';
import { PrincipalComponent } from './navegador/principal/principal.component';
import { MargenComponent } from './navegador/margen/margen.component';
import { MenuComponent } from './menu/menu.component';
import { NuevaRutaComponent } from './nueva-ruta/nueva-ruta.component';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    MisrutasComponent,
    PrincipalComponent,
    CuerpoComponent,
    MargenComponent,
    MenuComponent,
    NuevaRutaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
