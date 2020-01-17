import { Component, OnInit } from '@angular/core';
import { DebugRenderer2 } from '@angular/core/src/view/services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from './admin.service';
import { from } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot,ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  submittedForm = false;
  adminCtrl: any = {};
  adminForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private jwt: JwtHelperService
  ) { }

  ngOnInit() {
    // this.adminService.getAdminLogin().subscribe((adminLogunData: any) => {
    // },error => {
  
    // })
    // const token =  localStorage.getItem('top_secret');
    // console.log('checkkss', this.jwt.isTokenExpired(token))
    // if(!this.jwt.isTokenExpired(token)){
    //   this.router.navigate(['admindata']);
    // }
    this.adminForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  get adminFrms (){ return  this.adminForm.controls; }
 
  adminData(data) {
    this.submittedForm = true;
    if(this.adminForm.invalid){
      return;
    }
    this.adminService.checkAdminLogin(data).subscribe((adminLogunData: any) => {
      debugger;
      localStorage.setItem('top_secret',adminLogunData.token)
      this.router.navigate(['admindata']);
    },error => {
      
    })

  }
  
  
 
}
