import { HttpStatusCode } from '@angular/common/http';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-complaint-detail',
  template: `
    <div class="col-sm-8 mt-3 mb-3 pt-4 pb-4" style="box-shadow: 1px 4px 33px 0px; border-radius: 10px 0" id="detail">
      <h2>DETAILS OF COMPLAINT TICKET NO# {{data.tiketno}}</h2>
      <h3>Date: {{data.postdate | date}}</h3> 
      <h3>Status: {{data.status}}</h3> 
      <h3>Category: {{data.type}}</h3> 
      <h3>Priority: {{data.priority}}</h3> 
      <h3>Complaint Details: {{data.complaint}}</h3> 
      <button *ngIf="data.s3location !== 'NONE' " #detail class="btn btn-success"> <a (click) = "showFile(data.s3location)">File </a></button>
        <h2> Complaint Updated by Admin</h2>
     <div class="content">
       <ol>
       <li *ngFor=" let comment of data.comments">{{comment.date |date}} {{comment.message}}</li>
         </ol>
     </div>
    </div>
  `,
  styles: [
  ]
})
export class ComplaintDetailComponent{
  complaintId !: string
  complaintDetail: any
  subscription: any
  @Input() data: any

  constructor() {

  }
  showFile(url:string){
   window.open(url, '_blank')
    console.log(url)

  }

}
