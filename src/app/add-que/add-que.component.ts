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

  id:any;
  userdata:any=[];
  userinfo:any=[];

  ngOnInit(): void {

    this.id=this.userserviceobj.getuserid();   //get userid and sent with api to get userinfo
      console.log(this.id);   //gives id of user in normal form
    this.userdata=this.userserviceobj.display(this.id).subscribe((res)=>{  //with display method returns success,msg,data
      this.userdata=res;
      this.userinfo=this.userdata.data;
       console.log(this.userinfo);   //give userinfo on console without success and msg in backend format.
    })
  }

  onadd(f:NgForm){
    this.userserviceobj.addques(f.value).subscribe((res)=>{
      console.log(res);
      // this.router.navigateByUrl('/profile')
      this.dialog.closeAll();


    },(err)=>{
      console.log(err);
    }
    )

  }

  close(){
    this.dialog.closeAll();
  }

  }


