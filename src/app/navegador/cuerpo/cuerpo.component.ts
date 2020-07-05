import { MensajeriaService } from './../../services/mensajeria.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as L from 'leaflet';
import * as K from 'leaflet-gpx';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RutasService } from 'src/app/services/rutas.service';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent implements OnInit {

  constructor(private ruta: ActivatedRoute, private servicio: RutasService,
              private mensajeria: MensajeriaService) { }

  map;
  gpx: K.GPX;
  distancia = 0;
  id: string;
  latitud: number;
  longitud: number;
  suscripcionIdRuta: Subscription;
  titulo: string;
  desc: string;
  velocidadMedia: number;
  tiempoMovimiento: number;
  elevacionGanada: number;
  mostrar = false;
  mostrarBoton = false;

  ngOnInit(): void {
    this.suscripcionIdRuta = this.mensajeria.getIdRuta().subscribe( id => {
      this.id = id;
      console.log(this.id);

      this.servicio.getRuta(this.id).subscribe(respuesta => {
        this.mostrarBoton = true;
        this.latitud = respuesta.latitud;
        this.longitud = respuesta.longitud;
        this.titulo = respuesta.titulo;
        this.desc = respuesta.desc;
        if (this.map === undefined) {
          this.map = L.map('map').setView([this.latitud, this.longitud], 11);
        }else{
          this.map.remove();
          this.map = L.map('map').setView([this.latitud, this.longitud], 11);
        }

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        if (this.gpx !== undefined){
          this.map.removeLayer(this.gpx);
        }
        this.addGpx(respuesta.gpxFile);
      });
    });


  }

  addGpx(track: string){
    this.mostrar = false;
    this.gpx = new K.GPX(track, {
      async: true,
      marker_options: {
        startIconUrl: '/assets/images/pin-icon-start.png',
        endIconUrl: '/assets/images/pin-icon-end.png',
        shadowUrl: '/assets/images/pin-shadow.png',
        wptIconUrls: '/assets/images/pin-shadow.png'
      }
    }).on('loaded', function(e, d) {
      this.distancia = e.target.get_distance();
      d = this.distancia;
      console.log('d es ' + d);
    }).addTo(this.map);
  }
  descargarGPX(){
    this.servicio.donwloadGPX(this.id).subscribe(res => {
      this.downloadFile(res);
    });
  }

  mostrarEstadisticas(){
    this.distancia = this.gpx.get_distance();
    this.velocidadMedia = this.gpx.get_moving_speed();
    this.tiempoMovimiento = this.gpx.get_moving_time();
    this.elevacionGanada = this.gpx.get_elevation_gain();
    this.mostrar = true;
    this.mostrarBoton = false;
  }

  downloadFile(data: any) {
    const fileName = 'ruta.gpx';
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const objectUrl = window.URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  }

}
