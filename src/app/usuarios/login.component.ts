import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Iniciar Sesión!';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
  this.usuario = new Usuario();
}

  ngOnInit(){
    if(this.authService.isAuthenticated()){
      swal.fire('Login', `Hola ${this.authService.usuario.username} Ya iniciaste sesión!`, 'info');
      this.router.navigate(['/home']);
    }
  }

  login():void{
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      swal.fire('Error Login', 'Usuario o claves vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response =>{
      console.log(response);


      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/home']);
      swal.fire('Login', `Hola ${usuario.username}, Haz iniciado sesión con éxito!`, 'success');
    },err => {
      if(err.status == 400){
        swal.fire('Error Login', 'Usuario o claves incorrectas!', 'error');
      }
    }
  );
  }
}
