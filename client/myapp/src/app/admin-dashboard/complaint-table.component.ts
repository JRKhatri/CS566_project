import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint-table',
  template: `
    <table class="table table-striped" style="display:table">
      <thead>
        <tr>
            <th>Ticket Number</th>
            <th>Post Date</th>
            <th>Priority</th>
            <th>Category</th>
            <th>Created by</th>
        </tr>
      </thead>
      <tbody>
      <tr *ngFor="let data of tabledata">
            <td><button class="btn btn-success" (click) = "handleClick(data._id)">{{data.tiketno}}</button></td>
            <td>{{data.postdate | date}}</td>
            <td>{{data.priority}}</td>
            <td>{{data.type}}</td>
            <td>{{data.name}}</td>
        </tr>
        </tbody>
    </table>
  `,
})
export class ComplaintTableComponent implements OnInit {
  @Input() tabledata: any

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  handleClick(id: string) {
    console.log(id)
    this.router.navigate(['/admin', 'home', 'update', id])
  }

}
