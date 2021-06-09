import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-addcredentials',
  templateUrl: './addcredentials.component.html',
  styleUrls: ['./addcredentials.component.css']
})
export class AddcredentialsComponent implements OnInit {

  constructor(public userserviceobj:UserService ,public router:Router,private dialog:MatDialog) { }

  successalert:boolean=false;
  failalert:boolean=false

  id:any;
  credentialdata:any=[];
  cred:any=[];



  ngOnInit(): void {

    this.id=this.userserviceobj.getuserid();
    console.log(this.id);

  }



  submitcred(f:NgForm){
    this.userserviceobj.addcredentials(f.value).subscribe((res)=>{
          //  console.log(res);
           this.credentialdata=res;
            this.cred=this.credentialdata.data;
            console.log(this.cred);

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
