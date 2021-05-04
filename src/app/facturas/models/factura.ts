import {ItemFactura} from './item-factura';
import {Equipo} from '../../equipos/equipo';

export class Factura {
    id: number;
    descripcion: string;
    observacion: string;
    items: Array<ItemFactura>=[];
    equipo: Equipo;
    total: number;
    createAt: string;

    calcularGranTotal(): number{
      this.total = 0;
      this.items.forEach((item:ItemFactura) => {
        this.total += item.calcularImporte();
      });
      return this.total;
    }
}
