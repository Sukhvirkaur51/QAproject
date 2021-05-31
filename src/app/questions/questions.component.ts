import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddQueComponent } from '../add-que/add-que.component';
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

  ansresponse:any=[];
  answ:any=[];

  answerresponse:any=[];
  ans:any=[];

  credentialdata:any=[];
  cred:any=[];

  ngOnInit(): void {

    this.id=this.userserviceobj.getuserid();


    // this.userserviceobj.displayallcred().subscribe((res)=>{
    //   // console.log(res)
    //        this.credentialdata=res;
    //         console.log(this.credentialdata);
    //         this.cred=this.credentialdata.data;
    //         console.log(this.cred);
    // }
    // ,(err)=>{
    //   console.log(err);

    // })

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
  this.router.navigateByUrl('/profile');
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



askque(){
  const dialogref = this.dialog.open(AddQueComponent,{
    height:'600px',
    width: '750px'});
}

}
