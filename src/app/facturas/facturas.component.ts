import { Component, OnInit } from '@angular/core';
import {Factura} from './models/factura';
import {EquipoService} from '../equipos/equipo.service';
import {ActivatedRoute, Router} from '@angular/router';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, flatMap} from 'rxjs/operators';
import {FacturaService} from './services/factura.service';
import {Multa} from './models/multa';
import {ItemFactura} from './models/item-factura';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

import swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {

  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();

  autocompleteControl = new FormControl();
  multasFiltradas: Observable<Multa[]>;

  constructor(private equipoService: EquipoService,
    public facturaService: FacturaService,
    public router: Router,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params =>{
      let equipoId = +params.get('equipoId');
      this.equipoService.getEquipo(equipoId).subscribe(equipo => this.factura.equipo = equipo);
    });

    this.multasFiltradas = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string'? value: value.nombre),
        flatMap(value => value ? this._filter(value): [])
      );
  }

private _filter(value: string): Observable<Multa[]> {
  const filterValue = value.toLowerCase();

  return this.facturaService.filtrarMultas(filterValue);
}
mostrarNombre(multa?: Multa):string | undefined{
  return multa? multa.nombre: undefined;
}

seleccionarMulta(event: MatAutocompleteSelectedEvent): void{
  let multa = event.option.value as Multa;
  console.log(multa);

  if (this.existeItem(multa.id)){
    this.incrementaCantidad(multa.id);
  }else{
    let nuevoItem = new ItemFactura();
    nuevoItem.multa = multa;
    this.factura.items.push(nuevoItem);
  }

  this.autocompleteControl.setValue('');
  event.option.focus();
  event.option.deselect();

}

  actualizarCantidad(id:number, event:any): void{
    let cantidad:number = event.target.value as number;

    if(cantidad == 0){
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) =>{
      if(id === item.multa.id){
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id:number): boolean{
    let existe = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if(id === item.multa.id){
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id:number): void{
    this.factura.items = this.factura.items.map((item: ItemFactura) =>{
      if(id === item.multa.id){
        ++item.cantidad;
      }
      return item;
    });
  }
  eliminarItemFactura(id: number): void{
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.multa.id);
  }

  create(): void{
    this.facturaService.create(this.factura).subscribe(factura =>{
      swal.fire(this.titulo, `Factura ${factura.descripcion} Creada con exito!`, 'success');
      this.router.navigate(['/equipos']);
    });
  }
}
