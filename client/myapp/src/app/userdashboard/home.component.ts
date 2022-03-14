import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogstatusService } from '../logstatus.service';
import { SigninService } from '../userlog-service/signin.service';

@Component({
  selector: 'app-home',
  template: `
    <div>
      <h2 class="title">Welcome Complaint and FeedBack System <button class="btn btn-link" (click) = "showInformation()">Important Contacts</button></h2>
      <app-complain-form (formData)="getformData($event)"></app-complain-form>
      <div style="clear: both; margin-top: 2%; border-top: 1px solid gray"></div>
      <app-complain-list [tableData]="allComplaints" (complaintDetailData)="getComplaintData($event)"></app-complain-list>
      <app-complaint-detail [data]="complaintData" [hidden]="hidden" detail></app-complaint-detail>
      <br/>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .horizontal-line{
      border-top: 1px solid gray; margin: 2% 0
    }
  `
  ]
})

export class HomeComponent implements OnInit, OnDestroy {
  complaintData: any = {};
  subscription: any;
  allComplaints: any;
  hidden: boolean = true

  constructor(private client: SigninService, private logstatus: LogstatusService, private router: Router, private tkn: SigninService) {

    const id: any = this.client.getDecodeToken()
    this.subscription = this.client.getComplaintById(id.studentId).subscribe((response: any) => {
      if (response.success) {
        this.allComplaints = response.data;
      }
    })
  }

  ngOnInit(): void {
    
  }

  //function for accessing the upload data and append the user properties
  getformData(data: any) {
    let formData = new FormData();
    if (data.file) {
      formData.append("file", data.file, data.file.name);
    }
    formData.append("studentId", data.studentId)
    formData.append("type", data.type);
    formData.append("priority", data.priority);
    formData.append("name", data.name);
    formData.append("complaint", data.complaint);
    formData.append("status", data.status)
    formData.append("postdate", data.postdate)

    this.client.postComplaint(formData).subscribe((result: any) => {
      if (result.success) {
        this.allComplaints = [...this.allComplaints, result.payload]
      }
      else {
        console.log("unsuccess")
      }
    })
  }

  //function for accessing the details of a single complaints by user id
  getComplaintData(id: any) {
    this.client.getComplaintDetailById(id).subscribe((res: any) => {
      if (res.success) {
        this.hidden = false
        this.complaintData = res.data;
      }
    })
  }
  showInformation(){
    this.router.navigate(['user/home','contact'])
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
