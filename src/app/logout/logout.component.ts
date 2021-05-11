import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public userserviceobj:UserService , public router:Router) { }

  ngOnInit(): void {
this.userserviceobj.deleteToken();
this.userserviceobj.deleteuserid();
this.router.navigateByUrl('/login');
console.log("token deleted successfully");
  }

}
