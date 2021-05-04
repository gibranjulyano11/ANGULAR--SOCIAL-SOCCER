import { Component, OnInit } from '@angular/core';
import { Equipo } from './equipo'
import { EquipoService } from './equipo.service'
import { Router, ActivatedRoute } from '@angular/router'
import  swal from 'sweetalert2'



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public equipo: Equipo = new Equipo()
  public titulo: string = "Agregar Equipos"

  constructor(public equipoService: EquipoService,
  public router: Router,
  public activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.cargarEquipo()
  }

  cargarEquipo(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.equipoService.getEquipo(id).subscribe( (equipo) => this.equipo = equipo)
      }
    })
  }
  create(): void {
    this.equipoService.create(this.equipo)
    .subscribe(json => {
      this.router.navigate(['/equipos'])
      swal.fire('Nuevo Equipo',`${json.mensaje}: ${json.equipo.nombre} `,'success')
      }
    );
  }

  update(): void{
    console.log(this.equipo);
    this.equipo.facturas = null;
    this.equipoService.update(this.equipo)
    .subscribe( json =>{
      this.router.navigate(['/equipo'])
      swal.fire('Equipo Actualizado', `${json.mensaje}: ${json.equipo.nombre}`,'success')
    })
  }
}
