import { Component, OnInit } from '@angular/core';
import { DebugRenderer2 } from '@angular/core/src/view/services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AdminService, PollData } from '../admin/admin.service';
import { from } from 'rxjs';
import * as io from 'socket.io-client';
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  showpollData: PollData;
  pollWiseCandidateDetail: any;
  timeSplase: any;
  showAdminData: any;
  jsonVariable = {};
  showfinalresult: boolean = false;
  finalResultData: any;
  url = 'http://localhost:3000';
  private socket;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private jwt: JwtHelperService
  ) { 
    this.socket = io(this.url);
  }

  ngOnInit() {
    const token =  localStorage.getItem('top_secret');
    if(token) {
      this.showAdminData = this.jwt.decodeToken(token).data;
    }
    this.adminService.adminGetAllPoll().subscribe((res: any) => {
        this.showpollData = res.data;
    },error => {

    })
    this.socket.on('arrived_message',(data) => {
      data.data.totalVotesBoth = this.totalVotes(data.data);
      this.pollWiseCandidateDetail = data.data;
     
      this.showfinalresult = true;
    })
  }
  selectPollResult(independentPollData) {
    console.log(independentPollData)
    this.showfinalresult = true;
    independentPollData.totalVotesBoth = this.totalVotes(independentPollData);
    this.pollWiseCandidateDetail = independentPollData;
    console.log('second version',  this.pollWiseCandidateDetail);
    const countDownDate = new Date(this.pollWiseCandidateDetail.dates+','+this.pollWiseCandidateDetail.timeEnds).getTime();
//console.log('countDownDate', countDownDate)
  const x = setInterval(() => {
  let now = new Date(this.pollWiseCandidateDetail.dates+','+this.pollWiseCandidateDetail.timeStart).getTime();
  const current = new Date().getTime();
  if(current >= now){
    now = current;
    let distance = countDownDate - now;
  // console.log('countDownDate', countDownDate,'now',now)
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
       this.timeSplase =  days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  this.jsonVariable['values'+ independentPollData.pollNum] = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  //console.log('countDownDate',this.jsonVariable)
  if (distance < 0) {
    clearInterval(x);
    this.finalResultData = this.pollWiseCandidateDetail.result;
    console.log('fffffffffffffffffffffffffff',this.finalResultData.numvote)
    // api created
    if(this.finalResultData.numvote == 0) {
      this.finalResultData = null;
    }
    this.timeSplase = "EXPIRED";
    this.jsonVariable['values'+ independentPollData.pollNum] = "EXPIRED";
    }
  } else {
    this.timeSplase = "not start now";
    this.finalResultData = undefined;
    this.jsonVariable['values'+ independentPollData.pollNum] = "Not start now";
  }
  
}, 1000);
    // this.adminService.addminGetByPollId(independentPollData.pollNum).subscribe((resp: any) =>{
    //       debugger;
    // }, error => {

    // });
  }
  getColor(i) {
    if (i % 2 === 0 && i != 0){i = 'odd';}
    switch (i) {
      case i = 0 : return 'orange !important';
      case i = 'odd' : return 'blue !important';
    }
    return 'red !important';
  }
adminlogout(){
localStorage.removeItem('top_secret');
    //this.router.navigate(['admin']);
}
  totalVotes (data) {
    data = data.candidateDetail.reduce((v,v1,len,arr) => {
          return v.numOFVote + v1.numOFVote;
    })
    return data;
  }

}
