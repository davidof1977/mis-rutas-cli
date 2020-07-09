import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ruta } from '../model/ruta';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor(private http: HttpClient) { }

  //url = 'http://localhost:9081/misrutas/api';
  url = 'https://mis-rutas-davidof1977.herokuapp.com/misrutas/api';

  getRutasUsuario(usuario: string){
    const api = 'rutas';
    return this.http.get<Ruta[]>(this.url + '/' + api + '/' + usuario);
  }

  getRuta(id: string){
    const api = 'ruta';
    return this.http.get<Ruta>(this.url + '/' + api + '/' + id);
  }

  postGPX(fileToUpload: File, usuario: string, titulo: string, desc: string){
    const api = 'rutas/uploadfile';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('titulo', titulo);
    formData.append('usuario', usuario);
    formData.append('desc', desc);
    return this.http.post(this.url + '/' + api, formData);
  }

  donwloadGPX(id: string){
    const api = 'rutas/downloadgpx';
    return this.http.get(this.url + '/' + api + '/' + id, { responseType: 'blob' });
  }
}
