
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from './userlog-service/signin.service';
import { LogstatusService } from './logstatus.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <nav class="p-4 bg-dark" style="color:white">
      <ul>
        <a *ngIf="showHideTab"  [routerLink]="['/']">Login </a> |
        <a *ngIf="showHideTab"  [routerLink]="['/', 'signup']" > SignUp </a> 
        <a *ngIf="!showHideTab && role==='USER'; else adminHome " [routerLink]="['/', 'user', 'home']">Home </a> |
        <ng-template #adminHome><a *ngIf="!showHideTab && role==='ADMIN' " [routerLink]="['/', 'admin', 'home']">Home </a></ng-template> |
        <a *ngIf="!showHideTab; else elseBlock"  [routerLink]="['/', 'logout']" (click)="logOut()">LogOut </a>|
       <ng-template #elseBlock> Already a member? Login | Already a New to system? Signup </ng-template>
       <a *ngIf="!showHideTab && role==='USER'; else adminUser "> User : {{name}} </a> |
      <ng-template #adminUser> <a *ngIf="!showHideTab && role==='ADMIN' ">Admin User :{{name}} </a></ng-template>
       <a *ngIf="!showHideTab "> Date : {{date | date}} </a>
      </ul>
    </nav>
    <router-outlet class="body"></router-outlet>
  `,
})
export class AppComponent implements OnInit, OnDestroy{
  showHideTab !:boolean;
  role!: string;
  subscription:Subscription[]=[]
  name !: string;
  date = new Date();

  constructor(private client:SigninService, private router: Router, private logstatus: LogstatusService) {
    const validUser:any = this.client.getDecodeToken()
    console.log(validUser)
    console.log(validUser)
    if(validUser){
      this.logstatus.hideTab$.next(false)
      this.logstatus.role$.next(this.role)
      this.role= validUser.role
      this.name = validUser.fullname
    }else{
      console.log('no token')
      this.showHideTab=true
      this.logstatus.hideTab$.next(true)
    }
   
  }

  ngOnInit(): void {
    console.log('ngoninit -app'+this.showHideTab)
     this.subscription[0]=this.logstatus.hideTab$.subscribe(data => this.showHideTab = data)
    this.subscription[1]= this.logstatus.role$.subscribe(data=> this.role = data)
    
  }

  logOut() {
    const token = localStorage.removeItem('token');
    this.logstatus.hideTab$.next(true)
    this.router.navigate(['login'])
  }

  ngOnDestroy(){
    this.subscription.forEach((subs:any) => {
      subs.unsubscribe()
    });

  }
}
