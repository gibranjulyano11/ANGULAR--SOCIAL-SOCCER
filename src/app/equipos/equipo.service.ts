import { Injectable } from '@angular/core';
import { Equipo } from './equipo';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router} from '@angular/router';
import { AuthService} from '../usuarios/auth.service';

//import {URL_BACKEND} from '../config/config';

@Injectable()
export class EquipoService {
  public urlEndPoint:string = 'http://localhost:8080/api/equipos';

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(public http: HttpClient, public router: Router,
  private authService: AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;

    if(token !=null){
      return this.httpHeaders.append('Authorization', 'Bearer '+ token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean{
    if(e.status==401){

      if(this.authService.isAuthenticated()){
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if(e.status==403){
      swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/equipos']);
      return true;
    }
    return false;
  }

  getEquipos(page: number): Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) =>{

          console.log('EquipoService: tap 1');
            (response.content as Equipo[]).forEach(equipo =>{
              console.log(equipo.nombre);
            });
          }),
  map((response: any) =>{
    (response.content as Equipo[]).map(equipo =>{
      equipo.nombre = equipo.nombre.toUpperCase();
      return equipo;
    });
    return response;
  }),
  tap(response =>{
    console.log('EquipoService: tap 2');
    (response.content as Equipo[]).forEach(equipo =>{
      console.log(equipo.nombre);
    });
  })
);
}


  create(equipo: Equipo) : Observable<any>{
    return this.http.post<any>(this.urlEndPoint, equipo, {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => response.equipo as Equipo),
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getEquipo(id): Observable<Equipo>{
    return this.http.get<Equipo>(`${this.urlEndPoint}/${id}`,{headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>{

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        this.router.navigate(['/equipos']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  update(equipo: Equipo): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${equipo.id}`, equipo, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }
  delete(id: number): Observable<Equipo>{
    return this.http.delete<Equipo>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token =this.authService.token;
    if(token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

      const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
        reportProgress: true,
        headers: httpHeaders
      });

      return this.http.request(req).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError(e);
          }
        })
      );
  }
}
