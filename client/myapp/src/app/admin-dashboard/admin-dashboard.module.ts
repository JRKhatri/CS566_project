import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintDashboardComponent } from './complaint-dashboard.component';
import { ComplaintTableComponent } from './complaint-table.component';
import { RouterModule } from '@angular/router';
import { ComplaintUpdateComponent } from './complaint-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InformationFormComponent } from './information-form.component';
import { ContactListComponent } from './contact-list.component';

@NgModule({
  declarations: [
    ComplaintDashboardComponent,
    ComplaintTableComponent,
    ComplaintUpdateComponent,
    InformationFormComponent,
    ContactListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: ComplaintDashboardComponent, children: [
          {
            path: 'complainttable', component: ComplaintTableComponent
          },
        ]
      },
      { path: 'update/:id', component: ComplaintUpdateComponent },
      { path: 'contact', component: InformationFormComponent }
    ])

  ], exports: [
    ComplaintDashboardComponent
  ]
})
export class AdminDashboardModule { }
