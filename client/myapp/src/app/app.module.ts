import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

import { AttachTokenInterceptor } from './attach-token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', redirectTo: '' },
      { path: 'signup', component: SignupComponent },
      { path: 'logout', redirectTo: 'login' },

      { path: 'user/home', loadChildren: () => import('./userdashboard/userdashboard.module').then(module => module.UserdashboardModule), canActivate: [AuthGuard] },
      { path: 'admin/home', loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(module => module.AdminDashboardModule), canActivate: [AuthGuard] },
      { path: '**', redirectTo: '' },
    ]),
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AttachTokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
