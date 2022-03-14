import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from './userlog-service/signin.service';
import { LogstatusService } from './logstatus.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  template: `
    <div class="col-sm-6">
      <h2>SignUP </h2>
    <span>{{responseMsg}}</span>
<br/>
<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
<div class="form-group">
    <label for="studentId">Student_Id #:</label>
    <input type="text" class="form-control" id="studentId" formControlName="studentId" placeholder="Enter your student id number"/>
    <div *ngIf="!signupForm.get('studentId')?.valid">Required [6 digit]</div>
</div>
  <div class="form-group">
    <label for="fullname">Fullname:</label>
    <input type="text" class="form-control" id="fullname" formControlName="fullname" placeholder="Enter your fullname"/>
    <div *ngIf="!signupForm.get('fullname')?.valid">Required </div>
</div>
<div class="form-group">
  <label for="password">Password:</label>
  <input type="password" class="form-control" id="password" formControlName="password" placeholder="Enter password"/>
  <div *ngIf="!signupForm.get('password')?.valid">Password must be minimun 6 characters </div>
</div>
<div class="form-group">
  <label for="email" > Email Id: </label>
  <input type="text" class="form-control" id="email" formControlName="email" placeholder="Enter email"/>
  <div *ngIf="!signupForm.get('email')?.valid"> Enter valid email id </div>
</div>
<div class="form-group">
  <label for="phone" > Phone: </label>
  <input type="number" class="form-control" id="phone" formControlName="phone" placeholder="Enter Phone"/>
  <div *ngIf="!signupForm.get('phone')?.valid"> Required + Valid Phone No</div>
</div>

<div class="form-group">
  <label for="memberType">Member Type</label>
  <div class="radio" *ngFor="let m of memType">
    <label>
      <input type="radio" formControlName="type" [value]="m"> {{m}}
    </label>
  </div>
</div>
  <button type="submit" class="btn btn-primary" [disabled]="!signupForm.valid">Submit</button>
</form> 

  `,
})
export class SignupComponent implements OnInit, OnDestroy {
  responseMsg: string = ""
  signupForm: FormGroup;
  memDate: Number = Date.now()
  memType: string[] = [
    'Student',
    'Emplyoee'
  ];
  subscription!: Subscription

  constructor(private log: LogstatusService, private fb: FormBuilder, private httpClient: SigninService, private router: Router) {

    this.signupForm = fb.group({
      'studentId': ['', Validators.compose([Validators.maxLength(6), Validators.minLength(6)])],
      'fullname': ['', Validators.required],
      'password': ['', Validators.compose([Validators.minLength(6)])],
      'email': ['', Validators.compose([Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required])],
      'phone': ['', Validators.compose([Validators.required])],
      'type': ['', Validators.required]
    })
  }
ngOnInit(){

}
  onSubmit() {
    let user = { ...this.signupForm.value, signupdate: this.memDate }
    this.subscription = this.httpClient.signUpUser(user).subscribe((response: any) => {
      if (response.success) {
        localStorage.setItem('token', response.token)
        this.log.hideTab$.next(false)
        this.log.role$.next('USER')
        this.router.navigate(['user/home'])
      } else {
        this.responseMsg = response.error.message
        this.signupForm.reset()
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
