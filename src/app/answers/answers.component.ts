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

  // showdiv=false;
  indexHidden:number=-1

  constructor(public userserviceobj:UserService,private dialog:MatDialog,private router:Router) { }

  // togglediv(id:number){
  //   this.showdiv=!this.showdiv

  // }


  successalert:boolean=false;
  failalert:boolean=false

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


  imagedata:any=[];
  proimage:any=[];
  proimage1:any=[];
  imagelength!:any;

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


    // display user image
    this.userserviceobj.displayuserimage(this.id).subscribe((res)=>{

      this.imagedata=res;
     this.proimage=this.imagedata.data;
     this.imagelength=this.proimage.length;
    this.proimage1=this.proimage[this.imagelength-1]

    // console.log(this.proimage);
    console.log(this.proimage1);

      }
      ,(err)=>{
        console.log(err);

      }
      )


}

  postans(f:NgForm){
  //  console.log(f.value);
  this.userserviceobj.addanswer(f.value).subscribe((res)=>{
    this.ansresponse=res;
    console.log(res);
    this.ans=this.ansresponse.data;

    this.successalert=true;



  }
  ,(err)=>{
    console.log(err);
    this.failalert=true;

  })
}

// close(){
//   this.dialog.closeAll();
// }

successclosealert(){
  this.successalert=false;
  this.indexHidden=1
  this.router.navigateByUrl('/profile')
}


failclosealert(){
  this.failalert=false;

}



}
