
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';
import { SigninService } from './userlog-service/signin.service';
import { LogstatusService } from './logstatus.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login" style="display:flex; justify-content: space-around; margin-top: 5%">
    <div class="col-sm-6">
      <h2>Login</h2>
      
      <span [ngStyle]="{color:'red', fontSize:'18px'}">{{responseMsg}}</span>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class ="form-group">
          <label for="email">Email:</label>
        <input type="text" class="form-control" id="email" formControlName="email" placeholder="email "/>
        <div *ngIf="!loginForm.get('email')?.valid">
          Not valid
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" formControlName="password" placeholder="password">
        <ng-template #elseBlock>Valid</ng-template>
      </div>
      <button type="submit" class="btn btn-primary" [disabled]="!loginForm.valid">Submit</button> <br/>
    </form>
  <div>
</div>
  `,
})
export class LoginComponent implements OnDestroy {
  responseMsg: string = "";
  showSubmit = true;
  loginForm: FormGroup;
  courseId: string = "";
  courseName: string = "";
  courseCode: string = "";
  subscriptions: Subscription[] = []

  constructor(private logstatus: LogstatusService, private formBuilder: FormBuilder, private client: SigninService, private router: Router) {
    this.loginForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.email])],
      'password': ['', Validators.required]
    });
  }

  onSubmit() {
    this.subscriptions[0] = this.client.loginUser(this.loginForm.value).subscribe((response: any) => {

      if (response.success) {
        localStorage.setItem('token', response.token)
        this.logstatus.hideTab$.next(false)

        const validUser: any = this.client.getDecodeToken()

        if (validUser.role === "USER") {
          this.logstatus.role$.next('USER')
          this.router.navigate(['user/home'])
        }
        else if (validUser.role === "ADMIN") {
          this.logstatus.role$.next('ADMIN')
          this.router.navigate(['admin/home'])
        }
        else
          this.router.navigate(['login'])
      }
      else {
        this.responseMsg = response.msg
        this.loginForm.reset()
      }
    })
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe())
  }
}








