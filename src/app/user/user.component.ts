import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ACTION_LOGIN, ACTION_LOGOUT } from '../reducers/appActions';
import {
  Resolve,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
  } from '@angular/router';
import { UserService } from './user.service';
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  events: string[] = [];
  submitted: boolean = false;
  touchSubmitted: boolean = false;
  userForm:FormGroup;
  userFormDetail:any = {};
  idtype =  new FormControl; 
  // idtype = new FormControl('', [Validators.required]);
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    public jwtHelper: JwtHelperService,
    private route: Router
  ) { }
  ngOnInit() {
    // const newTokenData = localStorage.getItem('save_auth');
   // console.log(this.jwtHelper.isTokenExpired(newTokenData));
    console.log('aaaaaaaaaaaaaaaaa',this.activeRoute.snapshot.data.authResolveService)
    // this.activeRoute.data.subscribe(data => {
    //   console.log('Check route resolver data')
    //   console.log(data)
    // })
    this.userForm = this.formBuilder.group({
        name : ['', [Validators.required]],
        dob : ['', [Validators.required]],
        selection: ['', [Validators.required]],
        // idType: ['', [Validators.required]]
    })
  }
  get frms() {return this.userForm.controls; }
  userData(data) {
    this.submitted = true;
    if(this.userForm.invalid || this.idtype.invalid) {
      return;
    }
    data.birthDate = this.events[this.events.length-1];
    data.GovermentId = {
      idType: data.idType,
      number: data.number
    }
    this.userService.registerData(data).subscribe((resp: any) => {
      const red: any = {};
      red.action = ACTION_LOGIN;
      red.login = true;
      red.user = resp.data;
      this.userService.updatestate(red)
      localStorage.setItem('save_auth',resp.token);
      // this.userService.getAllState()
      this.route.navigate(['/poll']);
    }, error => {

    })
  }
  selectionOfGovId(selectedData) {
    if(selectedData === 'AC'){
      this.touchSubmitted = true;
      this.idtype = new FormControl('', [Validators.required])
      this.idtype.markAsTouched();
    } else {
      this.idtype = new FormControl('', null)
    }
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if(type === 'input') {
      this.events.push(`${type}: ${event.value}`);
    }
  }

}
