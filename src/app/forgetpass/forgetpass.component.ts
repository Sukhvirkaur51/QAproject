import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {

  constructor(public userserviceobj:UserService, private router:Router) { }

  ngOnInit(): void {
  }


  sendemail(f:NgForm){
    console.log(f.value);
  this.userserviceobj.forgetpassword(f.value).subscribe((res)=>{
    console.log(res);
    alert("Please check your email to reset password")
  })

  }
}
