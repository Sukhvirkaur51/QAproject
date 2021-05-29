import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddQueComponent } from '../add-que/add-que.component';
import { UserService } from '../shared/user.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(public dialog:MatDialog, public userserviceobj:UserService) { }

  ansresponse:any=[];
  answ:any=[];

  answerresponse:any=[];
  ans:any=[];

  ngOnInit(): void {

this.userserviceobj.displayallans().subscribe((res)=>{
      this.ansresponse=res;
      // console.log(res);
      this.answ=this.ansresponse.data;
      console.log(this.answ);
      // alert(this.answ)
      },(err)=>{
        console.log(err);
      })

  }

  postans(f:NgForm){
    console.log(f.value);
 this.userserviceobj.addanswer(f.value).subscribe((res)=>{
   this.answerresponse=res;
   console.log(res);
   this.ans=this.answerresponse.data;
  alert (" new answer added successfully");
 }
 ,(err)=>{
   console.log(err);
 })

  }
  openDialogue(){
    const dialogref = this.dialog.open(AddQueComponent,{
      height:'600px',
      width: '750px'});
  }


}
