import { Component, OnInit } from '@angular/core';
import { Equipo } from './equipo';
import { EquipoService } from './equipo.service';
import { ModalService } from './detalle/modal.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from '../usuarios/auth.service';
import {URL_BACKEND} from '../config/config';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html'
})
export class EquiposComponent implements OnInit {

equipos: Equipo[];
paginador: any;
equipoSeleccionado: Equipo;
urlBackend: string = URL_BACKEND;

  constructor(public equipoService: EquipoService,
    public modalService: ModalService,
    public authService: AuthService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit(){

    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }

    this.equipoService.getEquipos(page)
      .pipe(
        tap(response =>{
          console.log('EquipoComponent: tap 3');
          (response.content as Equipo[]).forEach(equipo => console.log(equipo.nombre));
        })
      ).subscribe (response => {
        this.equipos = response.content as Equipo[];
        this.paginador = response;
      });
    });

    this.modalService.notificarUpload.subscribe(equipo =>{
      this.equipos = this.equipos.map(equipoOriginal =>{
        if(equipo.id == equipoOriginal.id){
          equipoOriginal.foto = equipo.foto;
        }
        return equipoOriginal;
      })
    })
  }



  delete(equipo: Equipo): void {
    swal.fire({
  title: 'Estas seguro?',
  text: `¿ Seguro que deseas eliminar al Equipo ${equipo.nombre} ${equipo.categoria}?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, eliminar!'
}).then((result) => {
  if (result.value) {

    this.equipoService.delete(equipo.id).subscribe(
      response => {
          this.equipos = this.equipos.filter(cli => cli !== equipo)
        swal.fire(
          'Equipo Eliminado!',
          `Equipo ${equipo.nombre} eliminado con éxito.`,
          'success'
        )
      }
    )
}
});
}

  abrirModal(equipo: Equipo){
    this.equipoSeleccionado = equipo;
    this.modalService.abrirModal();
  }

}
