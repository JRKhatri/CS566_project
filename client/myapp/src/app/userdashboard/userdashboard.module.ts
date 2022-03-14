import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ComplainFormComponent } from './complain-form.component';
import { ComplainListComponent } from './complain-list.component';
import { ComplaintDetailComponent } from './complaint-detail.component';
import { InformationListComponent } from './information-list.component';




@NgModule({
  declarations: [

    HomeComponent,
    ComplainFormComponent,
    ComplainListComponent,
    ComplaintDetailComponent,
    InformationListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
       {path:'/detail', component:HomeComponent},
       {path:'contact', component:InformationListComponent},
      { path: '**', redirectTo: '' }
    ])
  ],
  exports: [
    HomeComponent,
    ComplainFormComponent,
  
  ]
})
export class UserdashboardModule { }
