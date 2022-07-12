import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveComponent } from './Component/archive/archive.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './Component/forgot-password/forgot-password.component';
import { GetAllNotesComponent } from './Component/get-all-notes/get-all-notes.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { ResetPasswordComponent } from './Component/reset-password/reset-password.component';
import { TrashComponent } from './Component/trash/trash.component';

const routes: Routes = [
  // { path:'', component:RegisterComponent},
  { path:'register', component:RegisterComponent},
  { path:'login', component:LoginComponent},
  { path:'forgotpassword', component:ForgotPasswordComponent},
  { path:'resetpassword', component:ResetPasswordComponent},
  { path:'dashboard', component:DashboardComponent,
    children:[
      { path:'notes', component:GetAllNotesComponent},
      { path:'archive', component:ArchiveComponent},
      { path:'trash', component:TrashComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
