import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddQueComponent } from '../add-que/add-que.component';
import { AddcredentialsComponent } from '../addcredentials/addcredentials.component';
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
  dispid:any;

  userdata:any=[];
  userinfo:any=[];

  quesresponse:any=[];
  que:any=[];

  answerresponse:any=[];
  ans:any=[];

  credentialdata:any=[];
  cred:any=[];

  imagedata:any=[];
  image:any=[];

  ngOnInit(){

    // this.dispid=this.que._id;

  //  console.log(this.count);
   this.id=this.userserviceobj.getuserid();   //get userid and sent with api to get userinfo
      console.log(this.id);   //gives id of user in normal form
    this.userserviceobj.display(this.id).subscribe((res)=>{  //with display method returns success,msg,data
      this.userdata=res;
      this.userinfo=this.userdata.data;
       console.log(this.userinfo);   //give userinfo on console without success and msg in backend format.
    })

  // this.userserviceobj.display().subscribe((res)=>{
  //   console.log(res);
  // })
  // console.log(this.userserviceobj.previousinfo())

    this.userserviceobj.displayques(this.id).subscribe((res)=>{
      this.quesresponse=res;
      this.que=this.quesresponse.data;
      console.log(this.que);
      console.log(this.que[0]._id);
    }
    ,(err)=>{
      console.log(err);

    }
    )



    this.userserviceobj.displaycredentials(this.id).subscribe((res)=>{
      console.log(res)
           this.credentialdata=res;
            //console.log(this.credentialdata);
            this.cred=this.credentialdata.data;
            console.log(this.cred);
    }
    ,(err)=>{
      console.log(err);

    })

    // console.log(this.dispid);

    this.userserviceobj.displayanswer(this.id).subscribe((res)=>{
      console.log(res)
    this.answerresponse=res;
      this.ans=this.answerresponse.data;
      console.log(this.ans);
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
  this.userserviceobj.userimage(f.value).subscribe((res)=>{
    console.log(f.value);
    console.log(res);
    this.imagedata=res;
    this.image=this.imagedata.data;
    console.log(this.image);
    alert('profile picture added successfully');
  },(err)=>{
    console.log(err);
  }
  )
}

askque(){
this.dialog.open(AddQueComponent);
}

addcred(){
  const dialogRef= this.dialog.open(AddcredentialsComponent,{
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
