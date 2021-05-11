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

  submitted=false
  hide = true;
  hide1= true;


  ngOnInit(): void{}



  adduser(f:NgForm){
    console.log(f.value);
    this.userserviceobj.register(f.value).subscribe((res)=>{
      console.log(res);
      alert('Register Successfully');
      this.router.navigateByUrl('/login');

    },(err)=>{
      console.log(err);
      alert('Register first');
    }
    )

  }




  }



