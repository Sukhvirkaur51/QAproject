import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  constructor(public userserviceobj:UserService) { }

  id!:any;
  userdata:any=[];
  userinfo:any=[];

  quesresponse:any;
  que:any=[];

  ngOnInit(): void {

    this.id=this.userserviceobj.getuserid();   //get userid and sent with api to get userinfo
    console.log(this.id);   //gives id of user in normal form
  this.userdata=this.userserviceobj.display(this.id).subscribe((res)=>{  //with display method returns success,msg,data
    this.userdata=res;
    this.userinfo=this.userdata.data;
     console.log(this.userinfo);   //give userinfo on console without success and msg in backend format.
  })

  this.userserviceobj.displayques(this.userserviceobj.getuserid()).subscribe((res)=>{
    this.quesresponse=res;
    this.que=this.quesresponse.data;
  }
  ,(err)=>{
    console.log(err);


  }
  )



  }



}
