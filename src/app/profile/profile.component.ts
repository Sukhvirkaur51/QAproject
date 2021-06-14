import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddQueComponent } from '../add-que/add-que.component';
import { AddcredentialsComponent } from '../addcredentials/addcredentials.component';
import { AnswersComponent } from '../answers/answers.component';
import { EditCredentialsComponent } from '../edit-credentials/edit-credentials.component';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { UserService } from '../shared/user.service';
import {FormBuilder} from '@angular/forms'
import { analyzeAndValidateNgModules } from '@angular/compiler';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imageform!:FormGroup;



  constructor(public userserviceobj:UserService , public router:Router,private dialog:MatDialog, public fb:FormBuilder) {

    //Reactive form
    this.imageform = this.fb.group({
      userid:[this.userserviceobj.getuserid()],
      image:[null]

    })


   }


  id:any;

  successalert:boolean=false;
  failalert:boolean=false

  userdata:any=[];
  userinfo:any=[];

  quesresponse:any=[];
  que:any=[];
datafile:any
  answerresponse:any=[];
  ans:any=[];
localUrl:any

  answerresponse1:any=[];
  ans1:any=[];

  credentialdata:any=[];
  cred:any=[];

  imagedata:any=[];
  proimage:any=[];
  proimage1:any=[];
  imagelength!:any;
  result : any[] = [];



  ngOnInit(){



//user information
   this.id=this.userserviceobj.getuserid();   //get userid and sent with api to get userinfo
      console.log(this.id);                   //gives id of user in normal form
    this.userserviceobj.display(this.id).subscribe((res)=>{  //with display method returns success,msg,data
      this.userdata=res;
      this.userinfo=this.userdata.data;
       console.log(this.userinfo);   //give userinfo on console without success and msg in backend format.
    })


// display user image
    this.userserviceobj.displayuserimage(this.id).subscribe((res)=>{

    this.imagedata=res;
   this.proimage=this.imagedata.data;
   this.imagelength=this.proimage.length;
  this.proimage1=this.proimage[this.imagelength-1]

  // this.result.push(this.proimage1);   //convert proto from object to array
  // console.log(this.result);
  console.log(this.proimage1);

    }
    ,(err)=>{
      console.log(err);

    }
    )



 //display user's question
    this.userserviceobj.displayques(this.id).subscribe((res)=>{
      this.quesresponse=res;
      this.que=this.quesresponse.data;
      console.log(this.que);

    }
    ,(err)=>{
      console.log(err);

    }
    )


 // display user's credentials
    this.userserviceobj.displaycredentials(this.id).subscribe((res)=>{
           this.credentialdata=res;
            console.log(this.credentialdata);
            this.cred=this.credentialdata.data;
            console.log(this.cred);
    }
    ,(err)=>{
      console.log(err);

    })



    // display answers
    this.userserviceobj.displayanswer(this.id).subscribe((res)=>{
      console.log(this.id);
    this.answerresponse=res;
      this.ans=this.answerresponse.data;
      console.log(this.ans);

    }
    ,(err)=>{
      console.log(err);

    }
    )


}


// submit answers
postans(f:NgForm){
  console.log(f.value);
 this.userserviceobj.addanswer(f.value).subscribe((res)=>{
   this.answerresponse1=res;
   console.log(res);
   this.ans1=this.answerresponse1.data;
   this.successalert= true;
 }
 ,(err)=>{
   console.log(err);
   this.failalert= true;

 })
}


//bootstrap alert for success
successclosealert(){
  this.successalert=false;
  location.reload();
}

 //bootstrap alert for failure
failclosealert(){
  this.failalert=false;

}


// submit image data through form

showPreviewImage(event: any) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
        this.localUrl = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
const datafile=event.target.files[0];
console.log(datafile);
this.imageform.patchValue({
image:datafile
});

}
}

onadd(){

console.log(this.imageform.value);

this.userserviceobj.userimage(this.imageform.value.userid, this.imageform.value.image).subscribe((res)=>{
console.log(res);
location.reload();

}
,(err)=>{
  console.log(err);
  this.failalert= true;

})


}





// open mat dialogs
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
   this.dialog.open(AddcredentialsComponent,{
    height: '800px',
    width: '800px'});
  }
  else{
    alert("credentials already added");
  }

}

editcred(){
  if(this.cred.length==0){
    alert("To edit credentials, you have to add it first!...")
    this.dialog.open(AddcredentialsComponent,{
      height: '800px',
      width: '800px'});
  }
  else{
  this.dialog.open(EditCredentialsComponent,{
    height: '800px',
    width: '800px'});
}}

 logout(){
  this.router.navigateByUrl('/logout');
 }
 editprofile(){
   this.dialog.open(EditprofileComponent ,{
    height: '700px',
    width: '800px'});
 }

}
