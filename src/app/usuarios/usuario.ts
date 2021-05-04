import {Equipo} from '../equipos/equipo';
export class Usuario {
  id: number;
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  email: string;
  dni: string ;
  foto: String;
  createAt: string;
  equipo: Equipo;
  roles: String[] = [];
}
