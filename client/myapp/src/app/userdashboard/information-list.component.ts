import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogstatusService } from '../logstatus.service';
import { SigninService } from '../userlog-service/signin.service';
import {store} from '../admin-dashboard/store/store'
import { addDataAction } from '../admin-dashboard/store/action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-information-list',
  template: `
    <div style="margin-top: 2%">  
    <h2 style="clear:both" class="bold">IMPORTANT CONTACT LIST</h2>
    <div>
    <table class="table table-striped" style="display:table">
  <thead>
    <tr>
      <th scope="col">S.No#</th>
      <th scope="col">Department</th>
      <th scope="col">Name</th>
      <th scope="col">Position</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let data of tableData; let i= index" >
      <td scope="row">{{i+1}}</td>
      <!-- <td><button class="btn btn-success" p-0 m-0 >{{data.tiketno}}</button></td> -->
      <td>{{data.department}}</td>
      <td>{{data.name}}</td>
      <td>{{data.position}}</td>
      <td>{{data.email}}</td>
      <td>{{data.phone}}</td>
      <td>{{data.description}}</td>
    </tr>
  </tbody>
</table>
    </div>
    <hr/>
    <button #detail class="btn btn-success" p-0 m-0 (click)= "goBack()">Back</button>
  </div>
  `,
  styles: [
  ]
})
export class InformationListComponent implements OnInit, OnDestroy {
  tableData: any;
  subscription: Subscription[]=[]
  subsc:any

  constructor(private client: SigninService, private router: Router, private logstatus: LogstatusService) {
   this.subscription[0]= this.client.getAllContacts().subscribe((res:any) =>{
     console.log(res)
    this.tableData = res?.data 
   })
  }

  ngOnInit(): void {
    console.log("yes data")
    this.tableData = store.getState().data;
    store.subscribe(()=>{
    this.tableData = store.getState().data
    })
  
  }

  goBack(){
    this.router.navigate(['user/home'])
  }
  
  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe())
  }

  
}
