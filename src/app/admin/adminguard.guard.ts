import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements  CanActivate{
  constructor(
    private _router: Router,
    private jwtHelperService: JwtHelperService
    ) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    const token = localStorage.getItem('top_secret');
    if (token !== null) {
      // if(state.url === '/user') {
      //   this._router.navigate(['poll'])
      // } 
      return true;
      }

  // navigate to login page
  this._router.navigate(['/admin']);
  // you can save redirect url so after authing we can move them back to the page they requested
  return false;
  }
}
