import {Multa} from './multa';

export class ItemFactura {
  multa: Multa;
  cantidad: number = 1;
  importe: number;

  public calcularImporte(): number{
    return this.cantidad * this.multa.precio;
  }
}
