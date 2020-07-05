import { MensajeriaService } from './../../services/mensajeria.service';
import { Component, OnInit } from '@angular/core';
import { Ruta } from 'src/app/model/ruta';
import { RutasService } from 'src/app/services/rutas.service';

@Component({
  selector: 'app-margen',
  templateUrl: './margen.component.html',
  styleUrls: ['./margen.component.css']
})
export class MargenComponent implements OnInit {

  constructor(private service: RutasService, private mensajeria: MensajeriaService) { }
  rutas: Ruta[];
  ngOnInit(): void {
    this.service.getRutasUsuario('Davidof1977').subscribe( respuesta => {
      this.rutas = respuesta;
    });
  }

  notificaRuta(id: string){
    this.mensajeria.sendIdRuta(id);
  }
}
