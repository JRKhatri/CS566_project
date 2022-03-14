import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SigninService } from '../userlog-service/signin.service';

@Component({
  selector: 'app-complaint-update',
  template: `
     <div style="box-shadow: 1px 4px 33px 0px; border-radius: 10px 0;" class="m-3 p-5 container">
     <h2><strong>DETAILS OF COMPLAINT TICKET NO# {{complaintDetail.tiketno}}</strong></h2>
      <div style="display:flex; padding-top: 1%; border-top: 1px solid gray; margin-bottom: 2%;">
        <div class="col-sm-2">
          <p><strong>Date:</strong></p>
          <p><strong>Created by:</strong></p>
          <p><strong>Status:</strong></p>
          <p><strong>Category:</strong></p>
          <p><strong>Priority:</strong></p>
          <p><strong>Complaint Details:</strong></p>
          <p><strong>File(if any):</strong></p>
          
        </div>
        <div class="col-sm-10">
          <p>{{complaintDetail.postdate | date}}</p>
          <p>{{complaintDetail.name || 'N/A'}}</p>
          <p>{{complaintDetail.status}}</p>
          <p>{{complaintDetail.type}}</p>
          <p>{{complaintDetail.priority}}</p>
          <p>{{complaintDetail.complaint}}</p>
          <button *ngIf="complaintDetail.s3location !== 'NONE' " #detail class="btn btn-success"> <a (click) = "showFile(complaintDetail.s3location)">File </a></button>
        </div>
      </div>
        <h2><strong>Complaint Updated by Admin</strong></h2>
     <div class="content" style="border-top: 1px solid gray;">
         <table class="table table-striped table-bordered">
          <tr>
            <th>Reponse Date</th>
            <th>Response Description</th>
          </tr>
          <tr *ngFor=" let comment of complaintDetail.comments">
            <td>{{comment.date |date}}</td>
            <td>{{comment.message}}</td>
          </tr>
         </table>
     </div>
     <form [formGroup]="complaintForm" (ngSubmit)="onSubmit()">
     <div class="status" class="form-group">
        <label>Status:</label>
        <select formControlName="status" class="form-control">
        <option value="">Status</option>
          <option value="UNSEEN">Unseen</option>
          <option value="INPROGRESS">In-progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="INAPPROPRIATE">In appropriate</option>
      </select>
      <div *ngIf="!complaintForm.get('status')?.valid"> Required</div>
      </div>

<div class="form-group">  
      <label>Comment: </label>
      <textarea class="form-control" rows="3" cols="30" formControlName="comment"></textarea>
      <div *ngIf="!complaintForm.get('comment')?.valid">Required</div>
</div>
      <button class="btn btn-success" [disabled]="!complaintForm.valid"type="submit">Update</button>
      <button class="btn btn-primary" (click)="goBack()">Back</button>
</form>
    </div>
  `,

})
export class ComplaintUpdateComponent implements OnInit, OnDestroy {
  complaintId !: string
  complaintDetail: any
  subscription: Subscription[] = []
  complaintForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private client: SigninService, private router: Router) {
    this.complaintForm = fb.group({
      'status': ['', Validators.required],
      'comment': ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.complaintId = this.route.snapshot.paramMap.get('id') as string
    this.subscription[0] = this.client.getComplaintDetailById(this.complaintId).subscribe((response: any) => {
      this.complaintDetail = response?.data;
    }
    )
  }

  onSubmit(): void {
    const id: any = this.client.getDecodeToken()

    const formData = { ...this.complaintForm.value, id: this.complaintId }
    this.subscription[1] = this.client.updateComplaints(formData).subscribe((result: any) => {
      if (result.success) {
        this.ngOnInit();
        this.complaintForm.reset();
      } else {
        console.log(result.msg)
      }
    })
  }

  showFile(url: string) {
    window.open(url, '_blank')
  }

  goBack() {
    this.router.navigate(['admin/home'])
  }
  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe())
  }

}


