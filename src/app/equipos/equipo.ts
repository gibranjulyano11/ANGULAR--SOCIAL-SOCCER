import {Factura} from '../facturas/models/factura';

export class Equipo {
    id: number;
    nombre: string;
    categoria: string;
    createAt: string;
    dirigente: string;
    foto: string;
    facturas: Factura[]= [];
  }
