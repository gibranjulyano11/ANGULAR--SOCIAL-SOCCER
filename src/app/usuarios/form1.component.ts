import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario'
import { UsuarioService } from './usuario.service'
import { Router, ActivatedRoute } from '@angular/router'
import  swal from 'sweetalert2'
import {Equipo} from '../equipos/equipo';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html'
})
export class Form1Component implements OnInit {

  public usuario: Usuario = new Usuario()
  equipos: Equipo[];
  public titulo: string = "Agregar Jugador"

  constructor(public usuarioService: UsuarioService,
  public router: Router,
  public activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.cargarUsuario()
    this.usuarioService.getEquipos().subscribe(equipos => this.equipos = equipos);
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.usuarioService.getUsuario(id).subscribe( (usuario) => this.usuario = usuario)
      }
    })
  }
  create(): void {
    this.usuarioService.create(this.usuario)
    .subscribe(json => {
      this.router.navigate(['/usuarios'])
      swal.fire('Nuevo Usuario',`${json.mensaje}: ${json.usuario.nombre} `,'success')
      }
    );
  }

  update(): void{
    console.log(this.usuario);
    this.usuarioService.update(this.usuario)
    .subscribe( json =>{
      this.router.navigate(['/usuarios'])
      swal.fire('Usuario Actualizado', `${json.mensaje}: ${json.usuario.nombre}`,'success')
    })
  }

  compararEquipo(o1: Equipo, o2:Equipo): boolean {
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined? false: o1.id === o2.id;
  }
}
