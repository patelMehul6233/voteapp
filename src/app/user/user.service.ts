import { Injectable, Optional, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, Subject, throwError, timer, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {
  Store
} from '@ngrx/store';
export interface Register {
  name: string;
  GovermentId: {
    idType: string,
    number: string
  };
  birthDate: Date;
}
export interface Users{
  name: string;
  pssword: string;
}
export interface PollCandy {
  pollNum: number;
  candidateName: any[];
}
export interface UserInfo {
  description: string;
  img: string;
  profession: string;
  skill: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  subject: any = new Subject<any>();
  env = environment;
  reisterUrl = `${environment.url}create-register`;
  getReisterUrl = `${environment.url}register`;
  postselectVote = `${environment.url}give-vote`;
  logoutUser = `${environment.url}logout`;
  // registerData = [];
  // uId: any = uuid();
  constructor(
    private http: HttpClient,
    private route: Router,
    private store: Store<any>
  ) { }
  ngOnInit() {
  }
  getAllState() {
    return this.store.select('appReducer');
  }
  updatestate(obj) {
    this.store.dispatch({
      type: obj.action,
      user: obj.user,
      login: obj.login
    });
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Promise<void> {
    const obs: any = new Observable((obsever: any) => {
      setTimeout(() => {
        obsever.next('welcome to rxjs library');
        obsever.complete('complete rxjs lib');
      }, 1000);
    });
    if (route.params.pollname === undefined) {
      // return this.getRegisterData().pipe(map((res: any) => res.userData));
    } else {
      return this.selectPollBasedDAta(route.params.pollname).pipe(map((res: any) => res));
    }
    return obs;

  }
  setHeaders() {
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
    httpHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    httpHeaders.append('Access-Control-Allow-Credentials', 'true');
    const options = {
      headers: httpHeaders,
      withCredentials: true
    };
    return options;
  }

  public registerData(data: Register): Observable<Register[]> {
    const option = this.setHeaders();
    return this.http.post<Register[]>(this.reisterUrl, data, option);
  }
  public getRegisterData(): Observable<Register[]> {
    const option = this.setHeaders();
    return this.http.get<Register[]>(this.getReisterUrl, option);
  }

  public checkAuthentication(): Observable<Register[]> {
    const option = this.setHeaders();
    return this.http.get<Register[]>('http://localhost:3000/authenticateds', option);
  }

  selectPollBasedDAta(polls: PollCandy): Observable<PollCandy[]> {
    const option = this.setHeaders();
    return this.http.get<PollCandy[]>(`${this.env.url}get-byPoll/${polls}`, option);
  }

  logoutUserApi(): Observable<any[]> {
    return this.http.get<any[]>(`${this.logoutUser}`, this.setHeaders());
  }
  sendVote(userInfo: UserInfo): Observable<UserInfo[]> {
    return this.http.put<UserInfo[]>(this.postselectVote, userInfo, this.setHeaders());
  }

  sendEvent(catchEvent) {
    this.subject.next(catchEvent);
  }
  get catchEvent() {
    return this.subject.asObservable();
  }


  authUserDetailApi() {
    const obs: any = new Observable((obsever: any) => {
      setTimeout(() => {
        obsever.next([1, 2, 3, 4, 5]);
        obsever.complete('complete rxjs lib');
      }, 1000);
    });
    return obs;
  }
}
