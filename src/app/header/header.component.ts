import{Component} from '@angular/core';
import {AuthService} from '../usuarios/auth.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
 title: string = 'Social Soccer'

 constructor(public authService: AuthService, private router: Router){}
 logout():void{
   let username = this.authService.usuario.username;
   this.authService.logout();
   swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxto!`,'success');
   this.router.navigate(['/login']);
 }
}
