import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public userserviceobj:UserService) { }

  ngOnInit(): void {
    // console.log(this.userserviceobj.isloggedIn())
  }

}
