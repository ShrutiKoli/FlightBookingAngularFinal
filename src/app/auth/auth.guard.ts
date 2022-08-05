import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if(localStorage.getItem('user_token')!= null)
      {
        return this.checkUserLoggedIn(route,state)
    //return true;
      }
  this._router.navigate(['/login'])
    return false
  }
  checkUserLoggedIn(route: ActivatedRouteSnapshot,
    url: any){
      if(localStorage.getItem('user_token')!= null)
      {
       const userRole=localStorage.getItem('role');
       if(route.data['role'] &&route.data['role'].indexOf(userRole)===-1)
       {
          this._router.navigate(['/home']);
          return false;
       }
       return true;
      }
      this._router.navigate(['/home']);
      return false;
  }
}
