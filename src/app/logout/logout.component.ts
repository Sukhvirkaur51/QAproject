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
localStorage.removeItem('credentialid');
this.router.navigateByUrl('/login');
// location.reload();
console.log("token deleted successfully");
console.log("credentials id deleted successfully");
  }

}
