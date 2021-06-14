import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-add-que',
  templateUrl: './add-que.component.html',
  styleUrls: ['./add-que.component.css']
})
export class AddQueComponent implements OnInit {

  constructor(public userserviceobj:UserService, public router:Router,private dialog:MatDialog) { }

  successalert:boolean=false;
  failalert:boolean=false

  id:any;
  userdata:any=[];
  userinfo:any=[];

  imagedata:any=[];
  proimage:any=[];
  proimage1:any=[];
  imagelength!:any;
  result : any[] = [];

  ngOnInit(): void {

    this.id=this.userserviceobj.getuserid();   //get userid and sent with api to get userinfo
      console.log(this.id);                   //gives id of user in normal form
    this.userdata=this.userserviceobj.display(this.id).subscribe((res)=>{  //with display method returns success,msg,data
      this.userdata=res;
      this.userinfo=this.userdata.data;
       console.log(this.userinfo);   //give userinfo on console without success and msg in backend format.
    })


    // display user image
    this.userserviceobj.displayuserimage(this.id).subscribe((res)=>{

      this.imagedata=res;
     this.proimage=this.imagedata.data;
     this.imagelength=this.proimage.length;
    this.proimage1=this.proimage[this.imagelength-1]

    // this.result.push(this.proimage1);   //convert proto from object to array
    // console.log(this.result);
    console.log(this.proimage1);

      }
      ,(err)=>{
        console.log(err);

      }
      )
  }

  onadd(f:NgForm){
    this.userserviceobj.addques(f.value).subscribe((res)=>{
      console.log(res);
      this.successalert=true


    },(err)=>{
      console.log(err);
      this.failalert=true
    }
    )

  }

  close(){
    this.dialog.closeAll();
  }


  successclosealert(){
    this.successalert=false;
    this.dialog.closeAll();
    this.router.navigateByUrl('/profile');


  }

  failclosealert(){
    this.failalert=false;

  }
  }


