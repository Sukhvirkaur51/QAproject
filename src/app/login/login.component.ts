import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userserviceobj:UserService,private router:Router) { }

  ngOnInit(): void {


  }


  successalert:boolean=false;
  failalert:boolean=false
  userdata:any=[];

   logindata(f:NgForm){
    this.userserviceobj.login(f.value).subscribe((res)=>{
      this.userdata=res;
      console.log(this.userdata.token);     //returns token in normal form

      this.userserviceobj.setToken(this.userdata.token); //store token which is in res.
      this.userserviceobj.setuserid(this.userdata.user._id); //store user id presnt in response
      console.log(res);      // res is "token" and "user".... backend response
      // alert('login successfully');

      // this.router.navigateByUrl('/profile');
      // setTimeout(()=>{
        this.successalert=true
      // }, 2000)




    },(err)=>{
      console.log(err);
      this.failalert=true
      // alert('login first');


    }

    )
   }


   successclosealert(){
     this.successalert=false;
     this.router.navigateByUrl('/profile');

   }

   failclosealert(){
    this.failalert=false;

}


sendmail(){

}
}
