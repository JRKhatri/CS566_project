import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from '../userlog-service/signin.service';

@Component({
  selector: 'app-complaint-dashboard',
  template: `
      <div class="unseen"><button class="btn btn-link" (click)="showInformationForm()"><h2> Important Contact</h2> </button>
       <hr/> 
      <h3><strong>LIST OF UNSEEN COMPLAINTS</strong></h3>
        <app-complaint-table [tabledata] = "unseenComplaints"></app-complaint-table>
      </div>
      
      <div class="inprogress">
      <h3><strong>LIST OF INPROGRESS COMPLAINT</strong></h3>
        <app-complaint-table [tabledata] = "inprogressComplaints"></app-complaint-table>
      </div>
      <div class="completed">
      <h3><strong>LIST OF COMPLETED COMPLAINT</strong></h3>
        <app-complaint-table [tabledata] = "completedComplaints"></app-complaint-table>
      </div>
      <div class="inappropriate">
      <h3><strong>LIST OF INAPPROPRIATE COMPLAINT</strong></h3>
        <app-complaint-table [tabledata] = "inappropriateComplaints" ></app-complaint-table>
      </div>
      <div class="card-footer pb-0 pt-3">
    </div>
      <div>  
</div>
      <router-outlet></router-outlet>
  `,
})
export class ComplaintDashboardComponent implements OnInit, OnDestroy {
  complaintData!: any[];
  unseenComplaints !: any[];
  inprogressComplaints !: any[];
  completedComplaints !: any[];
  inappropriateComplaints !: any[];
  subscription: any;

  constructor(private client: SigninService, private router: Router) {
    this.subscription = this.client.getAllComplaints().subscribe((resp: any) => {
      this.complaintData = resp?.data
      if (this.complaintData) {
        this.unseenComplaints = this.complaintData.filter(data => data.status === "UNSEEN");
        this.inprogressComplaints = this.complaintData.filter(data => data.status === "INPROGRESS");
        this.completedComplaints = this.complaintData.filter(data => data.status === "COMPLETED");
        this.inappropriateComplaints = this.complaintData.filter(data => data.status === "INAPPROPRIATE");
      }
    })
  }
  ngOnInit(): void {

  }
  showInformationForm() {
    this.router.navigate(['admin/home', 'contact'])

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
