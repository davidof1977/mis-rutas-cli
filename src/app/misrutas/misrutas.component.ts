import { RutasService } from './../services/rutas.service';
import { Component, OnInit } from '@angular/core';
import { Ruta } from '../model/ruta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-misrutas',
  templateUrl: './misrutas.component.html',
  styleUrls: ['./misrutas.component.css']
})
export class MisrutasComponent implements OnInit {

  constructor(private service: RutasService, private router: Router) { }
  rutas: Ruta[];
  ngOnInit(): void {
    this.service.getRutasUsuario().subscribe( respuesta => {
      this.rutas = respuesta;
    });
  }

  navegar(id: string){
    this.router.navigate(['/mapa', id]);
  }

}
