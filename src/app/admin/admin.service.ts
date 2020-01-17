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
export interface AdminLogin {
  name: string;
  password: string;
}
export interface PollData{
  pollNum: number;
  result: {
    name: string;
    numvote: string;
  };
  candidateDetail:[{
    id: string;
    voteLength: number,
    numOFVote: number,
    name: string,
    img: string,
    profession: string,
    skill: string,
    description: string,
    publicOpinion: string
  }]
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  env = environment;
  adminLoginUrl = `${environment.url}login-admin`;
  getAdminLoginUrl = `${environment.url}get-login-admin`;
  adminAddPollUrl = `${environment.url}add-poll-data`;
  addminGetByPollIdUrl = `${environment.url}get-byPoll`;
  adminGetAllPollUrl = `${environment.url}get-byPoll-only`;
  checkAdminUrl = `${environment.url}check-login-admin`;
  adminLogoutUrl = `${environment.url}admin-logout`;
  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

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
  setHeadersLogin() {
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'checkAdmin': 'yes' });
    httpHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    httpHeaders.append('Access-Control-Allow-Credentials', 'true');
    const options = {
      headers: httpHeaders,
      withCredentials: true
    };
    return options;
  }
  adminLogin(admin: AdminLogin): Observable<AdminLogin[]> {
    return this.http.post<AdminLogin[]>(this.adminLoginUrl, admin, this.setHeaders());
  };
  checkAdminLogin(admin: AdminLogin): Observable<AdminLogin[]> {
   
    return this.http.post<AdminLogin[]>(this.checkAdminUrl, admin, this.setHeadersLogin());
  };
  getAdminLogin(): Observable<AdminLogin[]> {
    return this.http.get<AdminLogin[]>(this.getAdminLoginUrl, this.setHeadersLogin());
  };
  adminAddPoll(pollData: PollData): Observable<PollData[]> {
    return this.http.post<PollData[]>(this.adminAddPollUrl, pollData, this.setHeadersLogin());
  };
  adminGetAllPoll(): Observable<PollData[]> {
    return this.http.get<PollData[]>(this.adminGetAllPollUrl, this.setHeaders());
  }
  adminLogout(): Observable<any> {
    return this.http.get<any>(this.adminLogoutUrl, this.setHeadersLogin());
  }
  
  addminGetByPollId(pollnum: any): Observable<PollData[]> {
    console.log(this.addminGetByPollIdUrl+'/'+pollnum)
    return this.http.get<PollData[]>(this.addminGetByPollIdUrl+'/'+pollnum, this.setHeaders());
  }
}
