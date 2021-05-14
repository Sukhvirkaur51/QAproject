import { Component, OnInit } from '@angular/core';
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
  id:any;
  userdata:any=[];
  userinfo:any=[];

  quesresponse:any=[];
  que:any=[];

  answerresponse:any=[];
  ans:any=[];

  credentialdata:any=[];
  cred:any=[];

  ngOnInit(): void {


  this.id=this.userserviceobj.getuserid();   //get userid and sent with api to get userinfo
      console.log(this.id);   //gives id of user in normal form
    this.userdata=this.userserviceobj.display(this.id).subscribe((res)=>{  //with display method returns success,msg,data
      this.userdata=res;
      this.userinfo=this.userdata.data;
       console.log(this.userinfo);   //give userinfo on console without success and msg in backend format.
    })

    this.userserviceobj.displayques(this.id).subscribe((res)=>{
      this.quesresponse=res;
      this.que=this.quesresponse.data;
      console.log(this.que);
    }
    ,(err)=>{
      console.log(err);

    }
    )

    this.userserviceobj.displaycredentials(this.id).subscribe((res)=>{
            this.credentialdata=res;
            console.log(res);
            this.cred=this.credentialdata.data;
            console.log(this.cred[0]);
    }
    ,(err)=>{
      console.log(err);

    }


    )
    // this.userserviceobj.credentialsdata();


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
   this.dialog.open(EditprofileComponent);
 }

}
