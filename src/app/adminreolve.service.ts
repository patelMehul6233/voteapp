import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AdminreolveService implements Resolve<any> {

  constructor(
    private jwt: JwtHelperService,
    private route: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> | Promise<any> | any {
    const token = localStorage.getItem('top_secret');
    if(token) {
      this.route.navigate(['admindata']);
    }
    return 'hello Admin resolver';

  }
}
