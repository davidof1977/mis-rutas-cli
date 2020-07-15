import { Usuario } from './../model/usuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'protractor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  url = environment.baseUrl;

  validarUsuario(usuario: Usuario): Observable<HttpResponse<Config>>{
    const api = 'login';
    return this.http.post(this.url + '/' + api , usuario, { observe: 'response' });
  }

  registrarUsuario(usuario: Usuario){
    const api = 'registro';
    return this.http.post<Usuario>(this.url + '/' + api, usuario);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt');
    localStorage.removeItem('Expiration');
    localStorage.removeItem('usuario');
  }

  loggin(authResult, nombre) {
    const timetologin = authResult.headers.get('Expiration');
    localStorage.setItem('jwt', authResult.headers.get('Authorization'));
    localStorage.setItem('Expiration', JSON.stringify(timetologin) );
    localStorage.setItem('usuario', nombre);
  }

  public isTokenNotExpired() {
    return Date.now() > this.getExpiration();
  }

  isTokenExpired() {
    return !this.isTokenNotExpired();
  }

  getExpiration() {
    const expiration = localStorage.getItem('Expiration');
    const expiresAt = JSON.parse(expiration);
    return expiresAt;
  }
}
