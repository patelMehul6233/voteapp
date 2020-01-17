import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminService } from '../admin/admin.service';
@Injectable({
  providedIn: 'root'
})
export class PollresolveService implements Resolve<any> {

  constructor(
    private adminService: AdminService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log(route.params.pollId)
    const checkId = parseFloat(route.params.pollId);
    if (route.params.pollId === undefined) {
    return this.adminService.adminGetAllPoll().pipe(map((res: any) => res.data));
    } else {
      return this.adminService.addminGetByPollId(route.params.pollId).pipe(map((res: any) => res.data));
    }
  }

}
