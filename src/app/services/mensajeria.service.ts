import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  private id = new Subject<string>();

    sendIdRuta(id: string) {
      this.id.next(id);
    }

    clearMessages() {
        this.id.next();
    }

    getIdRuta(): Observable<string> {
        return this.id.asObservable();
    }
}
