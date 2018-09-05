
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router,  CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';

@Injectable()

export class AuthGuard2Service implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('token') != null)
      return true;
    this.router.navigate(['/login']);
    return false;
  }
}

