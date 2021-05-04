import { Component, OnInit, Input } from '@angular/core';
import { Equipo} from '../equipo';
import  {EquipoService} from '../equipo.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import {HttpEventType} from '@angular/common/http';
import {AuthService} from '../../usuarios/auth.service';
import {FacturaService} from '../../facturas/services/factura.service';
import {Factura} from '../../facturas/models/factura';

@Component({
  selector: 'detalle-equipo',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() equipo: Equipo;

  titulo: string = "Detalle del Equipo";
  public fotoSeleccionada: File;
  progreso: number = 0;

  constructor(public equipoService: EquipoService,
    public facturaService: FacturaService,
    public authService: AuthService,
    public modalService: ModalService
    ) { }

  ngOnInit() {

  }
  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      swal.fire('Error seleccionar una imagen: ','El archivo debe ser del tipo imagen', 'error');
        this.fotoSeleccionada = null;
    }
  }

  subirFoto(){

    if(!this.fotoSeleccionada){
      swal.fire('Error: ','Debe seleccionar una foto', 'error');
    }else{
    this.equipoService.subirFoto(this.fotoSeleccionada, this.equipo.id)
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100)
      }else if(event.type === HttpEventType.Response){
        let response:any = event.body;
        this.equipo = response.equipo as Equipo;
        swal.fire('la foto se ha subido completamente!', response.mensaje, 'success');
      }
      //this.equipo = equipo;

      this.modalService.notificarUpload.emit(this.equipo);
    });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
  }

  delete(factura: Factura): void{
    swal.fire({
  title: 'Estas seguro?',
  text: `¿ Seguro que deseas eliminar la factura ${factura.descripcion}?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, eliminar!'
}).then((result) => {
  if (result.value) {

    this.facturaService.delete(factura.id).subscribe(
      response => {
          this.equipo.facturas = this.equipo.facturas.filter(f => f !== factura)
        swal.fire(
          'Factura Eliminada!',
          `Factura ${factura.descripcion} eliminada con éxito.`,
          'success'
        )
      }
    )
}
});
  }
}
