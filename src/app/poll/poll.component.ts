import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { UserService, Users } from '../user/user.service';
import { Observable, Subject, throwError, timer, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot,ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import * as io from 'socket.io-client';
import { ACTION_LOGIN, ACTION_LOGOUT } from '../reducers/appActions';
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  showUserData: any;
  showPollData: any;
  timeSplase: any;
  showCandiddateData: boolean = false;
  pollId: any;
  checkExpButton:boolean = true;
  thanksmsg: boolean = false;
  timing: any;
  url = 'http://localhost:3000';
  private socket;
  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private jwtHelperService: JwtHelperService
  ) {
    this.socket = io(this.url);
   }

  ngOnInit() {
    // this.userService.getRegisterData().subscribe((resp: any) => {
    //   debugger;
    //   const red: any = {};
    //   red.action = ACTION_LOGIN;
    //   red.login = true;
    //   red.user = resp.userData;
    //   this.userService.updatestate(red)
    // })
    const token  = localStorage.getItem('save_auth');
    if(token) { 
      this.showUserData = this.jwtHelperService.decodeToken(token).data;
    }
    this.activeRoute.params.subscribe((num: any) => {
     const checkId = parseFloat(num.pollId);
      this.pollId = num.pollId;
      this.showCandiddateData = this.pollId === undefined  ? false : true;
    })
      // this.showUserData = this.activeRoute.snapshot.data.userDatas;
       this.showPollData = this.activeRoute.snapshot.data.pollData;
    const countDownDate = new Date(this.showPollData[0].dates+','+this.showPollData[0].timeEnds).getTime();

const x = setInterval(() => {
  
  let now = new Date(this.showPollData[0].dates+','+this.showPollData[0].timeStart).getTime();
  // let remainNow = new Date().getTime();
  const current = new Date().getTime();
  // console.log(now, current)
  if(current >= now){
    now = current;
    let distance = countDownDate - now;
  // console.log('countDownDate', countDownDate,'now',now)
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
       this.timing = 'Start';
       this.timeSplase =  days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  if (distance < 0) {
    clearInterval(x);
    // this.userService.logoutUserApi().subscribe(() => {
    //   //localStorage.clear();
    //   this.route.navigate['user'];
    // })
   // localStorage.removeItem('save_auth')
    this.checkExpButton = false;
    this.timeSplase = "EXPIRED";
    this.timing = '';
    }
  } else {
    const remainCountdown = new Date(this.showPollData[0].dates+','+this.showPollData[0].timeStart).getTime();
    let distance = remainCountdown - current;
    console.log('countDownDate', current, remainCountdown);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.timing = 'Remain time';
    this.checkExpButton = false;
         this.timeSplase =  days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    if (distance < 0) {
      clearInterval(x);
      this.timeSplase = "EXPIRED";
      this.checkExpButton = false;
      this.timing = '';
      }
    // this.timeSplase = "not start now";
  }
  
}, 1000);

  }
  selectionOfId(pollData) {
    this.showCandiddateData = this.pollId === undefined ? false : true;
    this.route.navigate(['/poll', pollData]);
  }
  addVote(pollDetail,allPollDetail) {
    // console.log('dddddddddddd', pollDetail);
    // console.log('eeeeeeeeeeee', allPollDetail)
    const data: any = new Object();
    data.mainId = allPollDetail[0]._id;
    data._id = pollDetail._id;
    data.nums = allPollDetail[0].pollNum;
    if(pollDetail.numOFVote === undefined) {
      pollDetail.numOFVote = 0;
    } else {
      pollDetail.numOFVote++;
    }
    data.numOFVote = pollDetail.numOFVote;
    this.userService.sendVote(data).subscribe((catchData: any) => {
        this.socket.emit('new-message',catchData.updateData);
        localStorage.removeItem('save_auth')
        // this.logout()
       // const token = localStorage.getItem('save_auth');
       // localStorage.setItem('save_auth','dddddddddd');
       // console.log('after voting catch data', catchData)
    }, error => {

    })
   }
   logout() {
    this.userService.logoutUserApi().subscribe((data: any) => {
      //localStorage.clear();
      localStorage.setItem('save_auth', data.token)
      this.thanksmsg = true;
      setTimeout(() =>{
        this.route.navigate(['/poll']);
      },1000)
      
      
    })
   }
  }


