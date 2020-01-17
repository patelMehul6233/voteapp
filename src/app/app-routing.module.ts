import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { PollComponent } from './poll/poll.component';
import { AdminComponent } from './admin/admin.component';
import { ResultComponent } from './result/result.component';
import { ErrorComponent } from './error/error.component';
import { PollListComponent } from './poll/poll-list/poll-list.component';
import { AuthResolveService } from './user/auth-resolve.service';
import { AuthenticationGuard } from './authentication.guard';
import { UserService, Users } from './user/user.service';
import { PollresolveService } from './poll/pollresolve.service';
import { AdminguardGuard } from './admin/adminguard.guard'
import { from } from 'rxjs';
import { AdminDataComponent } from './admin-data/admin-data.component';
import { AdminreolveService } from './adminreolve.service';
const routes: Routes = [
  { path: 'user', component: UserComponent, resolve: {
    authResolveService: AuthResolveService
  } },
  { path: 'home', component: AppComponent, canActivate:[AuthenticationGuard] },
  { path: 'admin', component: AdminComponent, resolve: {
    authResolveService: AdminreolveService
  }},
  { path: 'admindata', component: AdminDataComponent, canActivate:[AdminguardGuard]}, 
  { path: 'result', component: ResultComponent, canActivate:[AdminguardGuard]},     
  { path: 'poll', component: PollComponent, canActivate:[AuthenticationGuard],
    resolve: {userDatas: UserService, pollData: PollresolveService}  
},
  { path: 'poll/:pollId', component: PollComponent, canActivate:[AuthenticationGuard],
  resolve: {userDatas: UserService, pollData: PollresolveService}  
},
  // children:[
  //   {path: 'pollList', component: PollListComponent},
  //   { path: '', redirectTo: 'pollList', pathMatch: 'full' }
  // ] 
 
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
