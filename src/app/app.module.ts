import { MensajeriaService } from './services/mensajeria.service';
import { RutasService } from 'src/app/services/rutas.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { UsuarioService } from './services/usuario.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderInterceptorService } from './services/header-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ToastComponent } from './utilidades/toast/toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    MisrutasComponent,
    PrincipalComponent,
    CuerpoComponent,
    MargenComponent,
    MenuComponent,
    NuevaRutaComponent,
    LoginComponent,
    RegistroComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [RutasService,
    MensajeriaService,
    UsuarioService,
    AuthGuardService,
    { provide: LOCALE_ID, useValue: 'es-ES' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true // Add this line when using multiple interceptors.
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true // Add this line when using multiple interceptors.
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
