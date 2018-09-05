import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ProfileComponent } from './frontend/components/profile/profile.component';
import { AuthGuardService } from './frontend/guard/auth-guard.service';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['']); // or redirect to default route
    }
  }
}