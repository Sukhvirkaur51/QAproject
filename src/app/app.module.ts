import {NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderAreaComponent } from './slider-area/slider-area.component';
import { TeamProfileComponent } from './team-profile/team-profile.component';
import { TrustedAreaComponent } from './trusted-area/trusted-area.component';
import { RecentAreaComponent } from './recent-area/recent-area.component';
import { RequestComponent } from './request/request.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// forms

import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';

// material imports




import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { ContactNowComponent } from './contact-now/contact-now.component';
import { HelpComponent } from './help/help.component';
import { ProfileComponent } from './profile/profile.component';
import { AnswersComponent } from './answers/answers.component';
import { AddQueComponent } from './add-que/add-que.component';

import { MaterialModule} from './material.module';


import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SliderAreaComponent,
    TeamProfileComponent,
    TrustedAreaComponent,



    RecentAreaComponent,
    RequestComponent,
    RegisterComponent,
    LoginComponent,
    QuestionsComponent,
    ContactNowComponent,
    HelpComponent,
    ProfileComponent,
    AnswersComponent,
    AddQueComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
