import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  private id = new Subject<string>();
  private usuario = new Subject<string>();

    sendIdRuta(id: string) {
      this.id.next(id);
    }

    sendUsuario(nombre: string) {
      this.usuario.next(nombre);
      this.usuario.next();
    }

    clearMessages() {
        this.id.next();
    }

    getIdRuta(): Observable<string> {
        return this.id.asObservable();
    }

    getUsuario(): Observable<string> {
      return this.usuario.asObservable();
    }
}
