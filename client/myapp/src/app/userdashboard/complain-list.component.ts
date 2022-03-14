import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LogstatusService } from '../logstatus.service';
import { SigninService } from '../userlog-service/signin.service';

@Component({
  selector: 'app-complain-list',
  template: `
  <div style="margin-top: 2%">  
    <h2 style="clear:both" class="bold">List of Complaints</h2>
    <div>
    <table class="table table-striped" style="display:table">
  <thead>
    <tr>
      <th scope="col">S.No#</th>
      <th scope="col">Ticket No</th>
      <th scope="col">Complaint</th>
      <th scope="col">Date Filed</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let data of tableData; let i= index" >
      <td scope="row">{{i+1}}</td>
      <td><button #detail class="btn btn-success" p-0 m-0 (click)= "showDetails(data._id)">{{data.tiketno}}</button></td>
      <td>{{data.type}}</td>
      <td>{{data.postdate| date}}</td>
    </tr>
  </tbody>
</table>
    </div>
   
  </div>
  `,
})

export class ComplainListComponent implements OnInit {
  @Input() tableData: any;
  @Output() complaintDetailData: EventEmitter<any> = new EventEmitter();
  subscription: any[] = []
  file: any;

  constructor(private client: SigninService, private router: Router, private logstatus: LogstatusService) {
    const id: any = this.client.getDecodeToken()
  }

  ngOnInit(): void {
  }

  showDetails(id: string) {
    this.complaintDetailData.emit(id);
  }


}
