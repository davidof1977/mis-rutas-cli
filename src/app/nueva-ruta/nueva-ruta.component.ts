import { RutasService } from './../services/rutas.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Ruta } from '../model/ruta';

@Component({
  selector: 'app-nueva-ruta',
  templateUrl: './nueva-ruta.component.html',
  styleUrls: ['./nueva-ruta.component.css']
})
export class NuevaRutaComponent implements OnInit {
  fileToUpload: File = null;
  formGrupo: FormGroup;
  constructor(private service: RutasService) {
    this.formGrupo = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      gpx: new FormControl('', [Validators.required]),
      desc: new FormControl('')
    });
  }

  ngOnInit(): void {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  guardar(event: Event){
    event.preventDefault();
    if (!this.formGrupo.invalid){
      this.service.postGPX(this.fileToUpload, 'Davidof1977', this.formGrupo.get('titulo').value,
      this.formGrupo.get('desc').value).subscribe(data => {
        alert('Ruta subida correctamente');
        }, error => {
          alert(error);
        });
    }else{
      this.formGrupo.markAllAsTouched();
    }
  }
}
