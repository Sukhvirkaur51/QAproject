import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { AddQueComponent } from '../add-que/add-que.component';
import { AddcredentialsComponent } from '../addcredentials/addcredentials.component';
import { AnswersComponent } from '../answers/answers.component';
import { EditCredentialsComponent } from '../edit-credentials/edit-credentials.component';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public userserviceobj:UserService , public router:Router,private dialog:MatDialog) { }

 count!:0;

  id:any;

  userdata:any=[];
  userinfo:any=[];

  quesresponse:any=[];
  que:any=[];

  answerresponse:any=[];
  ans:any=[];
  question:any=[];

  credentialdata:any=[];
  cred:any=[];

  imagedata:any=[];
  image:any=[];

  ngOnInit(){


  //  console.log(this.count);
   this.id=this.userserviceobj.getuserid();   //get userid and sent with api to get userinfo
      console.log(this.id);                   //gives id of user in normal form
    this.userserviceobj.display(this.id).subscribe((res)=>{  //with display method returns success,msg,data
      this.userdata=res;
      this.userinfo=this.userdata.data;
       console.log(this.userinfo);   //give userinfo on console without success and msg in backend format.
    })


    this.userserviceobj.displayques(this.id).subscribe((res)=>{
      this.quesresponse=res;
      this.que=this.quesresponse.data;
      console.log(this.que);
      // console.log(this.que[0]._id);
    }
    ,(err)=>{
      console.log(err);

    }
    )



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



    this.userserviceobj.displayanswer(this.id).subscribe((res)=>{
      console.log(this.id);
    this.answerresponse=res;
      this.ans=this.answerresponse.data;
      console.log(this.ans);

   //alert(JSON.stringify(this.ans))

    }
    ,(err)=>{
      console.log(err);

    }
    )

}

postans(f:NgForm){
  console.log(f.value);
 this.userserviceobj.addanswer(f.value).subscribe((res)=>{
   this.answerresponse=res;
   console.log(res);
   this.ans=this.answerresponse.data;
   console.log("answer added successfully");
 }
 ,(err)=>{
   console.log(err);
 })
}



onadd(f:NgForm){
  console.log(f.value);
  this.userserviceobj.userimage(f.value).subscribe((res)=>{

    // console.log(res);
    this.imagedata=res;
    this.image=this.imagedata.data;
    // console.log(this.image);
    alert('profile picture added successfully');
  },(err)=>{
    console.log(err);
  }
  )
}

askque(){
this.dialog.open(AddQueComponent ,{
  height: '800px',
  width: '800px'});
}

giveans(){
  this.dialog.open(AnswersComponent ,{
    height: '800px',
    width: '950px'});
}

addcred(){
  if(this.cred.length==0){
  const dialogRef= this.dialog.open(AddcredentialsComponent,{
    height: '800px',
    width: '800px'});
  }
  else{
    alert("credentials already added");
  }

}

editcred(){
  const dialogRef= this.dialog.open(EditCredentialsComponent,{
    height: '800px',
    width: '800px'});
}

 logout(){
  this.router.navigateByUrl('/logout');
 }
 editprofile(){
   this.dialog.open(EditprofileComponent ,{
    height: '700px',
    width: '800px'});
 }

}
