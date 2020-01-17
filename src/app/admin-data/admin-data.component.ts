import { Component, OnInit } from '@angular/core';
import { DebugRenderer2 } from '@angular/core/src/view/services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Resolve, ActivatedRouteSnapshot,ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin/admin.service';
import { from } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.css']
})
export class AdminDataComponent implements OnInit {
  pollGroup: FormGroup;
  fileUploaded: File;
  pollCandsubmittedForm = false;
  storeData: any;
  pollCtrl: any = {};
  showAdminData: any;
  pollNumList = [1,2,3,4,5,6,7,8,9,10];
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private jwt: JwtHelperService
  ) { }

  ngOnInit() {
    const token =  localStorage.getItem('top_secret');
    if(token) {
      this.showAdminData = this.jwt.decodeToken(token).data;
    }
    this.pollGroup = this.formBuilder.group({
      pollnum: ['', Validators.required],
      pollcandetail: ['', Validators.required]
    })
  }
  get pollCandFrms (){ return  this.pollGroup.controls; }
  adminlogout() {
    // this.adminService.adminLogout().subscribe((res: any) => {
    //     this.router.navigate(['admin']);
    // });
    localStorage.removeItem('top_secret');
    this.router.navigate(['admin']);
  }
  addPollData(adminData) {
    this.pollCandsubmittedForm = true;
    if(this.pollGroup.invalid){
      return true;
    }
    adminData.candidateDetail = this.storeData;
    adminData.timeStart = this.storeData[0].pollStarts;
    adminData.timeEnds = this.storeData[0].pollEnd;
    adminData.dates = this.storeData[0].date;
    adminData.authAdmin = true;
    this.adminService.adminAddPoll(adminData).subscribe((getPollData: any) =>{
      adminData = null;
    },error => {

    })
  }
  uploadedFile(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      this.storeData = jsonData.Sheet1;
      // console.log('dddddddddddddd', this.storeData)
      this.storeData = this.storeData.map((v,k,arr) => {
        v.pollStarts  = v.pollStarts!== undefined ? v.pollStarts.replace(/\s/g, '').replace('pm',''):v.pollStarts;
       v.pollEnd = v.pollEnd !== undefined ? v.pollEnd.replace(/\s/g, '').replace('pm',''): v.pollEnd;
       return v;
       })
       console.log('dddddddddddddd', this.storeData)
      // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
    }
    reader.readAsBinaryString(file);
  }

}
