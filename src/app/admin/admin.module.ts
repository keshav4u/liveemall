import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminRouterModule } from './admin-router.module';
import { DeshboardComponent } from './components/deshboard/deshboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRouterModule
  ],
  declarations: [
    DeshboardComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class AdminModule { }
