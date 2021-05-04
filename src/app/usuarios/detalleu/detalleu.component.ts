import { Component, OnInit, Input } from '@angular/core';
import { Usuario} from '../usuario';
import  {UsuarioService} from '../usuario.service';
import swal from 'sweetalert2';
import {HttpEventType} from '@angular/common/http';
import {AuthService} from '../../usuarios/auth.service';



@Component({
  selector: 'detalleu-usuario',
  templateUrl: './detalleu.component.html',
  //styleUrls: ['./detalleu.component.css']
})
export class DetalleuComponent implements OnInit {

  @Input() usuario: Usuario;

  titulo: string = "Perfil del Usuario";
  public fotoSeleccionada: File;
  progreso: number = 0;

  constructor(public usuarioService: UsuarioService,
    public authService: AuthService,
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
    this.usuarioService.subirFoto(this.fotoSeleccionada, this.usuario.id)
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100)
      }else if(event.type === HttpEventType.Response){
        let response:any = event.body;
        this.usuario = response.equipo as Usuario;
        swal.fire('La foto se ha cargado con éxito!', response.mensaje, 'success');
      }
      //this.equipo = equipo;
    });
    }
  }


}
