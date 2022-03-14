import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogstatusService } from '../logstatus.service';
import { SigninService } from '../userlog-service/signin.service';
// import { SigninService } from './userlog-service/signin.service';
// import { InteractiveService } from './interactive.service';


@Component({
  selector: 'app-complain-form',
  template: `
  <div class="col-sm-8 mt-3 mb-3" style="box-shadow: 1px 4px 33px 0px; border-radius: 10px 0; margin-bottom: 2%">
    <h2>Complaint Description Form </h2>
    <div>
      <h3> Please provide us the required information for filling the compalint</h3>
      <span>{{responseMsg}}</span>
      <form [formGroup]="complaintForm" (ngSubmit)="onSubmit()">
  
        <div class="form-group">
          <label style="margin-right:1% !important">Complaint Type: </label>
          <select class="form-control" formControlName="type">
            <option value="">Select Complaint Type</option>
            <option value="Housing">Housing</option>
            <option value="Academic">Academic</option>
            <option value="Food">Food</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div class="form-group">
          <label style="margin-right:1% !important">Complaint Priority</label>
          <select class="form-select form-control form-select-lg mb-3" aria-label=".form-select-lg example" formControlName="priority">
            <option value="">Complaint Priority</option>
            <option value="Urgent">Urgent</option>
            <option value="Important">Important</option>
            <option value="Inform">Inform</option>
          </select>
        </div>
        <div class="form-group">
          <label for="name">Name :</label>
          <input class="form-control" id="name" formControlName="name" placeholder="Your Name"/>
          <div *ngIf="!complaintForm.get('password')?.valid"> 
          </div>
        </div>
        <div class="form-group">
          <label for="complaint">Complaint Description :</label>
          <textarea type="textarea" class="form-control" id="complaint" formControlName="complaint" placeholder="Describe complain"></textarea>
        </div>
        <div class="file form-group">
            Upload Complaint file(if any)
            <input type="file" formControlname='file' (change)="handleFileUpload($event)"/>
          </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary" [disabled]="!complaintForm.valid">Submit</button> 
          <button type="reset"  class="btn btn-warning">Reset</button>
        </div>
      </form> 
     
    </div>
  </div>
<span>{{this.responseMsg}}</span>
  `,
  styles: [`
    .btn-warning{
      margin-left: 1%
    }
  `
  ]
})
export class ComplainFormComponent implements OnInit {

  @Output() formData: EventEmitter<any> = new EventEmitter()

  responseMsg: string = ""
  complaintForm: FormGroup;
  complaintDate: Number = Date.now()
  file: any;

  constructor(private fb: FormBuilder, private router: Router, private client: SigninService, private logstatus: LogstatusService) {

    this.complaintForm = fb.group({
      'type': ['', Validators.required],
      'priority': ['', Validators.required],
      'name': ['', Validators.required],
      // 'signupdate':['', Validators.compose([Validators.required])],
      'complaint': ['', Validators.compose([Validators.maxLength(300), Validators.required])],
      'file':['']
    })

  }
  onSubmit() {
    const id: any = this.client.getDecodeToken()
    let user = { ...this.complaintForm.value, studentId: id.studentId, postdate: this.complaintDate, status: "UNSEEN" }
    console.log(user)
    if (this.file) {
      user.file = this.file;
    }
    
    this.formData.emit(user);
    this.complaintForm.reset();

  }

  ngOnInit(): void {

  }
  

  handleFileUpload(event: any) {
    this.file = event.target.files.item(0);
   // console.log(this.file)

  }

}

