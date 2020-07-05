import { RutasService } from './../services/rutas.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as L from 'leaflet';
import * as K from 'leaflet-gpx';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor(private ruta: ActivatedRoute, private servicio: RutasService) { }

  map;
  gpx: K.GPX;
  distancia = 0;
  id: string;
  latitud: number;
  longitud: number;
  ngOnInit(): void {
    this.ruta.paramMap.subscribe(params => this.id = params.get('id'));
    console.log(this.id);

    this.servicio.getRuta(this.id).subscribe(respuesta => {
      this.latitud = respuesta.latitud;
      this.longitud = respuesta.longitud;
      this.map = L.map('map').setView([this.latitud, this.longitud], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      this.addGpx(respuesta.gpxFile);
    });
  }

  addGpx(track: string){
    this.gpx = new K.GPX(track, {async: true}).on('loaded', function(e, d) {
      this.distancia = e.target.get_distance();
      d = this.distancia;
      console.log('d es ' + d);

    }).addTo(this.map);
  }
  removeGPX(){
    //this.map.removeLayer(this.gpx);
    this.distancia = this.gpx.get_distance();
  }
}
