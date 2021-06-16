import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQueComponent } from './add-que/add-que.component';
import { AddcredentialsComponent } from './addcredentials/addcredentials.component';
import { AnswersComponent } from './answers/answers.component';
import { ContactNowComponent } from './contact-now/contact-now.component';
import { EditCredentialsComponent } from './edit-credentials/edit-credentials.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionsComponent } from './questions/questions.component';
import { RegisterComponent } from './register/register.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
   {
    path:'',
     component:HomeComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'questions',
    component:QuestionsComponent
  },
  {
    path:'contact',
    component:ContactNowComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'answers',
    component:AnswersComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'addque',
    component:AddQueComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'editprofile',
    component:EditprofileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'logout',
    component:LogoutComponent
  },
  {
    path:'addcredentials',
    component:AddcredentialsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'editcredentials',
    component:EditCredentialsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'forgetpass',
    component:ForgetpassComponent
  },
  {
    path:'resetpass',
    component:ResetpassComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
