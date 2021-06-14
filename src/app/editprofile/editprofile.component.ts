import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  contactNumberPattern="^[6-9][0-9]{9}$";


  id:any;
  userdata:any=[];
  userinfo:any=[];

  edituser:any=[];
  edit:any=[];


  successalert:boolean=false;
  failalert:boolean=false

  constructor(public userserviceobj:UserService, private dialog:MatDialog, private router:Router) { }

  ngOnInit(): void {

    this.id=this.userserviceobj.getuserid();
    console.log(this.id);
    this.userdata=this.userserviceobj.display(this.id).subscribe((res)=>{    // with display method returns success,msg,data

      console.log(res);
      this.userdata=res;
      this.userinfo=this.userdata.data;
      console.log(this.userinfo);



     })

    }



    OnSubmit(f:NgForm){
       console.log(f.value);
      this.userserviceobj.updateuser(f.value).subscribe((res)=>{
        // console.log(res);
        this.edituser=res;
        this.edit=this.edituser.data;
        console.log(this.edit);

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
    location.reload();
  }


  failclosealert(){
    this.failalert=false;

  }
  }





