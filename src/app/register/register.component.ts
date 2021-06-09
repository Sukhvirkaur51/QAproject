import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(public userserviceobj:UserService ,private router:Router) { }

  contactNumberPattern="^[6-9][0-9]{9}$";

  successalert:boolean=false;
  failalert:boolean=false


  ngOnInit(): void{}



  adduser(f:NgForm){
    console.log(f.value);
    this.userserviceobj.register(f.value).subscribe((res)=>{
      console.log(res);
      // alert('Register Successfully');
      // this.router.navigateByUrl('/login');
      this.successalert=true

    },(err)=>{
      console.log(err);
      // alert('Register first');
      this.failalert=true
    }
    )

  }

  successclosealert(){
    this.successalert=false;
    this.router.navigateByUrl('/login');

  }

  failclosealert(){
    this.failalert=false;
  }


  }



