import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {UsuarioComponent} from '../../usuario.component';
import { Usuario } from '../../usuario';
import { IUclm } from './ICard-user';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit {

  @Input() sizes: IUclm = { xs: 12};
  @HostBinding('clas') class = '';

  usuarios: Usuario[];
  usuarioSeleccionado: Usuario;
  constructor(public usuarioComponent: UsuarioComponent) { }

  ngOnInit(): void {
    this.class = this.getSizes(this.sizes);
  }

  getSizes(sizes: IUclm): string {
    let fclass = '';
    for (const k in sizes){
      if (Object.prototype.hasOwnProperty.call(sizes, k)){
        const element = Object[k];
        fclass += ` col-${k}-${sizes[k]}`;
      }
    }
    return fclass;
  }
}
