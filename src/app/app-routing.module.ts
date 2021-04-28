import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQueComponent } from './add-que/add-que.component';
import { AnswersComponent } from './answers/answers.component';
import { ContactNowComponent } from './contact-now/contact-now.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionsComponent } from './questions/questions.component';
import { RegisterComponent } from './register/register.component';

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
    component:ContactNowComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'answers',
    component:AnswersComponent
  },
  {
    path:'addque',
    component:AddQueComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
