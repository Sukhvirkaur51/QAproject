import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  constructor(public userserviceobj:UserService) { }

  id!:any;
  queid!:any;

  userdata:any=[];
  userinfo:any=[];

  quesresponse:any=[];
  que:any=[];

  ansresponse:any=[];
  ans:any=[];

  ngOnInit(): void {

    this.id=this.userserviceobj.getuserid();   //get userid and sent with api to get userinfo
    console.log(this.id);               //gives id of user in normal form

    // this.queid=this.userserviceobj.getquestionid();
    // console.log(this.queid);

  this.userdata=this.userserviceobj.display(this.id).subscribe((res)=>{  //with display method returns success,msg,data
    this.userdata=res;
    this.userinfo=this.userdata.data;
     console.log(this.userinfo);   //give userinfo on console without success and msg in backend format.
  })

  this.userserviceobj.displayques(this.id).subscribe((res)=>{
    this.quesresponse=res;
    console.log(res);
    this.que=this.quesresponse.data;
    console.log(this.que[0]._id);
    console.log("question added successfully");
  }
  ,(err)=>{
    console.log(err);
  }
  )
}

  postans(f:NgForm){
   console.log(f.value);
  this.userserviceobj.addanswer(this.id).subscribe((res)=>{
    this.ansresponse=res;
    console.log(res);
    this.ans=this.ansresponse.data;
    console.log("answer added successfully");
  }
  ,(err)=>{
    console.log(err);
  })
}







}
