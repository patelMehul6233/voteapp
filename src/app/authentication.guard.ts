import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements  CanActivate{
  constructor(
    private _router: Router,
    private jwtHelperService: JwtHelperService
    ) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    const token = localStorage.getItem('save_auth');
    // if (!this.jwtHelperService.isTokenExpired(token)) {
    if (token !== null) {
      // if(state.url === '/user') {
      //   this._router.navigate(['poll'])
      // } 
      return true;
      }

  // navigate to login page
  this._router.navigate(['/user']);
  // you can save redirect url so after authing we can move them back to the page they requested
  return false;
  }
}
