import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from '../usuarios/auth.service';
import { ModalService } from './detalleu/modal1.service';
import { IUclm } from './cards/card-user/ICard-user';
import { CardUserComponent } from './cards/card-user/card-user.component';
//import {URL_BACKEND} from '../config/config';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  public sizes: IUclm = { xs: 12};

  usuarios: Usuario[];
  paginador: any;
  usuarioSeleccionado: Usuario;
  //urlBackend: string = URL_BACKEND;

  constructor(public usuarioService: UsuarioService,
    public modalService: ModalService,
    public authService: AuthService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }

    this.usuarioService.getUsuarios(page)
      .pipe(
        tap(response =>{
          console.log('UsuarioComponent: tap 3');
          (response.content as Usuario[]).forEach(usuario => console.log(usuario.nombre));
        })
      ).subscribe (response => {
        this.usuarios = response.content as Usuario[];
        this.paginador = response;
      });
    });

    this.modalService.notificarUpload.subscribe(usuario =>{
      this.usuarios = this.usuarios.map(usuarioOriginal =>{
        if(usuario.id == usuarioOriginal.id){
          usuarioOriginal.foto = usuario.foto;
        }
        return usuarioOriginal;
      })
    })
  }

  delete(usuario: Usuario): void {
    swal.fire({
  title: 'Estas seguro?',
  text: `¿ Seguro que deseas eliminar al Usuario ${usuario.nombre} ${usuario.apellido}?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, eliminar!'
}).then((result) => {
  if (result.value) {

    this.usuarioService.delete(usuario.id).subscribe(
      response => {
          this.usuarios = this.usuarios.filter(cli => cli !== usuario)
        swal.fire(
          'Usuario Eliminado!',
          `Usuario ${usuario.nombre} eliminado con éxito.`,
          'success'
        )
      }
    )
}
});
}

abrirModal1(usuario: Usuario){
  this.usuarioSeleccionado = usuario;
  this.modalService.abrirModal1();
}

}
