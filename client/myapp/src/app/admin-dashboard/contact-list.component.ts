import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LogstatusService } from '../logstatus.service';
import { SigninService } from '../userlog-service/signin.service';
import { addDataAction, deleteItem } from './store/action';
import { store } from './store/store';
import { initialState } from './store/reducer';


@Component({
  selector: 'app-contact-list',
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
      <td><button class="btn btn-warning" (click)="editContact(data._id)">Edit</button></td>
      <td><button class="btn btn-danger"(click)= "deleteContact(data._id)">Delete</button></td>
      
    </tr>
  </tbody>
</table>
    </div>
  </div>
  `,
})
export class ContactListComponent implements OnInit, OnDestroy {
  @Output() editData: EventEmitter<any> = new EventEmitter()
  tableData: any;
  subscription: any[] = [];

  constructor(private client: SigninService, private router: Router, private logstatus: LogstatusService) {
    this.subscription[0] = this.client.getAllContacts().subscribe((res: any) => {
      this.tableData = res.data
      initialState.data = this.tableData
    })
  }

  ngOnInit(): void {
    this.tableData = store.getState().data
    store.subscribe(() => {
      this.tableData = store.getState().data
    })
  }

  deleteContact(id: string) {
    this.subscription[1] = this.client.deleteContactById(id).subscribe((res: any) => {
    })
    store.dispatch(deleteItem(id))
  }

  editContact(id: string) {
    const edit = { id, action: "edit" }
    this.editData.emit(edit)
  }
  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe())
  }


}




