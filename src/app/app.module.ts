import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { EquiposComponent } from './equipos/equipos.component';
import { EquipoService } from './equipos/equipo.service';
import { UsuarioService } from './usuarios/usuario.service';
import { DetalleuComponent } from './usuarios/detalleu/detalleu.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { FormComponent } from './equipos/form.component';
import { Form1Component } from './usuarios/form1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatMomentDateModule} from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DetalleComponent } from './equipos/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component'
import { AuthGuard} from './usuarios/guards/auth.guard';
import { RoleGuard} from './usuarios/guards/role.guard';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';
import { UsuarioComponent} from './usuarios/usuario.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SliderComponent } from './slider/slider.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { CardUserComponent } from './usuarios/cards/card-user/card-user.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'equipos', component: EquiposComponent},
  {path: 'equipos/page/:page', component: EquiposComponent},
  {path: 'equipos/form', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'equipos/form/:id', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'usuario/detalleu/:usuarioId', component: DetalleuComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_USER'}},
  //{path: 'usuario/page/:page', component: UsuarioComponent},
  {path: 'usuario/form1', component: Form1Component, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'usuario/form1/:id', component: Form1Component, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'login', component: LoginComponent},
  {path: 'facturas/:id', component: DetalleFacturaComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_USER'}},
  {path: 'facturas/form/:equipoId', component: FacturasComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EquiposComponent,
    UsuarioComponent,
    DetalleuComponent,
    FormComponent,
    Form1Component,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent,
    SliderComponent,
    CardUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, MatDatepickerModule, MatMomentDateModule,
    ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, NgbModule,
    NgbPaginationModule, NgbAlertModule
  ],
  providers: [EquipoService, UsuarioService],
  bootstrap: [AppComponent]
})

export class AppModule { }
