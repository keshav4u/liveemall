import { RouterModule, Routes, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { DeshboardComponent } from './components/deshboard/deshboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

const router: Routes = [
  {
    path: '',
    component: DeshboardComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})

export class AdminRouterModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/admin']); // or redirect to default route
    }
  }
}

