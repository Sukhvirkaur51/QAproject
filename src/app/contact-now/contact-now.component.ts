import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-contact-now',
  templateUrl: './contact-now.component.html',
  styleUrls: ['./contact-now.component.css']
})
export class ContactNowComponent implements OnInit {

  constructor(public userserviceobj:UserService) { }

  ngOnInit(): void {
  console.log(this.userserviceobj.isloggedIn())
  }



}
