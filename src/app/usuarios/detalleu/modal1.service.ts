import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;

  public _notificarUpload = new EventEmitter<any>();


  constructor() { }

  get notificarUpload(): EventEmitter<any>{
    return this._notificarUpload;
  }

  abrirModal1(){
    this.modal = true;
  }

  cerrarModal1(){
    this.modal = false;
  }
}
