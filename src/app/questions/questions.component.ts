import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddQueComponent } from '../add-que/add-que.component';
import { AnswersComponent } from '../answers/answers.component';
import { UserService } from '../shared/user.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(public dialog:MatDialog, public userserviceobj:UserService, private router:Router) { }


  id:any;
  successalert:boolean=false;
  failalert:boolean=false

  ansresponse:any=[];
  answ:any=[];

  answerresponse:any=[];
  ans:any=[];

  credentialdata:any=[];
  cred:any=[];

  ngOnInit(): void {

    this.id=this.userserviceobj.getuserid();

this.userserviceobj.displayallans().subscribe((res)=>{
      this.ansresponse=res;
      this.answ=this.ansresponse.data;
      console.log(this.answ);
      },(err)=>{
        console.log(err);
      })

  }

  postans(f:NgForm){
    // console.log(f.value);
 this.userserviceobj.addanswer(f.value).subscribe((res)=>{
   this.answerresponse=res;
   console.log(res);
   this.ans=this.answerresponse.data;

   this.successalert=true;
 }
 ,(err)=>{
   console.log(err);
   this.failalert=true;
 })

  }


incLikes(){
//   this.userserviceobj.updatelike().subscribe(()=>{

//   })

}

decLikes(){

}



  openDialogue(){
    const dialogref = this.dialog.open(AddQueComponent,{
      height:'600px',
      width: '750px'});
    // this.router.navigateByUrl('/addque')
  }



  giveans(){
  // const dialogref = this.dialog.open(AnswersComponent,{
  //   height:'600px',
  //   width: '750px'});
  this.router.navigateByUrl('/answers')
}

alertbox(){
  alert("Please login first to give an answer");
  this.router.navigateByUrl('/login');
}


successclosealert(){
  this.successalert=false;
  this.router.navigateByUrl('/profile')
}


failclosealert(){
  this.failalert=false;

}
}
