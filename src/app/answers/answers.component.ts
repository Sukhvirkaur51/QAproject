import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  constructor(public userserviceobj:UserService,private dialog:MatDialog,private router:Router) { }

  id!:any;
  queid!:any;

  userdata:any=[];
  userinfo:any=[];

  quesresponse:any=[];
  que:any=[];

  ansresponse:any=[];
  ans:any=[];

  credentialdata:any=[];
  cred:any=[];

  ngOnInit(): void {

    this.id=this.userserviceobj.getuserid();   //get userid and sent with api to get userinfo
    console.log(this.id);      //gives id of user in normal form


  this.userserviceobj.display(this.id).subscribe((res)=>{  //with display method returns success,msg,data
    this.userdata=res;
    this.userinfo=this.userdata.data;
     console.log(this.userinfo);   //give userinfo on console without success and msg in backend format.
  })



this.userserviceobj.displayallques().subscribe((res)=>{
    this.quesresponse=res;
    // console.log(res);
    this.que=this.quesresponse.data;
    console.log(this.que);
    },(err)=>{
      console.log(err);
    })


    this.userserviceobj.displaycredentials(this.id).subscribe((res)=>{
      // console.log(res)
           this.credentialdata=res;
            console.log(this.credentialdata);
            this.cred=this.credentialdata.data;
            console.log(this.cred);
    }
    ,(err)=>{
      console.log(err);

    })


}

  postans(f:NgForm){
   console.log(f.value);
  this.userserviceobj.addanswer(f.value).subscribe((res)=>{
    this.ansresponse=res;
    console.log(res);
    this.ans=this.ansresponse.data;
    alert("answer added successfully");
    this.router.navigateByUrl('/profile');

  }
  ,(err)=>{
    console.log(err);
  })
}

close(){
  this.dialog.closeAll();
}





}
