import { Component, OnInit } from '@angular/core';
import {FacturaService} from './services/factura.service';
import {Factura} from './models/factura';
 import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html'

})
export class DetalleFacturaComponent implements OnInit {

  factura: Factura;
  titulo: string = 'Factura';


  constructor(public facturaService: FacturaService,
  public activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.facturaService.getFactura(id).subscribe(factura => this.factura = factura);
    });
  }
}
