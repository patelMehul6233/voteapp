import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthResolveService implements Resolve<any> {

  constructor(
    private userService: UserService,
     private jwt: JwtHelperService,
     private route: Router
     ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> | Promise<any> | any {
    // const obs = new Observable(observer => {
    //   observer.next('hello')
    // })
    // debugger;
    // const token = localStorage.getItem('save_auth')
    // if(!this.jwt.isTokenExpired(token)){
    //   this.route.navigate(['poll']);
    // }
    const token = localStorage.getItem('save_auth')
    if(token){
      this.route.navigate(['poll']);
    }
    return 'hello resolver';

  }
}
