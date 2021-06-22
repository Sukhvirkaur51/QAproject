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
countLikes:number=0

  id:any;
  successalert:boolean=false;
  failalert:boolean=false

  ansresponse:any=[];
  answ:any=[];

  answerresponse:any=[];
  ans:any=[];
  catAnsw: any = [];

  credentialdata:any=[];
  cred:any=[];

  userdata:any=[];
  userinfo:any=[];

  imagedata:any=[];
  proimage:any=[];
  proimage1:any=[];
   result : any[] = [];

   likearray:any=[];
   likearray1:any=[];
   likearray2:any=[];
   totallikes!:number

  ngOnInit(): void {

    this.id=this.userserviceobj.getuserid();

    this.userserviceobj.display(this.id).subscribe((res)=>{  //with display method returns success,msg,data
      this.userdata=res;
      this.userinfo=this.userdata.data;
       console.log(this.userinfo);   //give userinfo on console without success and msg in backend format.
    })

this.userserviceobj.displayallans().subscribe((res)=>{
      this.ansresponse=res;
      this.answ=this.ansresponse.data;
      this.catAnsw = this.answ;
      console.log(this.answ);
      }
      ,(err)=>{
        console.log(err);
      })


      // display user image
    this.userserviceobj.displayuserimage(this.id).subscribe((res)=>{

      this.imagedata=res;
     this.proimage=this.imagedata.data;
    //  console.log(this.proimage);
      const imagelength=this.proimage.length;
    this.proimage1=this.proimage[imagelength-1]    //proimage1 is in object prototype

    this.result.push(this.proimage1);   //convert proto from object to string
    console.log(this.proimage1);



      }
      ,(err)=>{
        console.log(err);

      }
      )

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


incLikes(f:NgForm){

  this.userserviceobj.updatelike(f.value).subscribe((res)=>{
   console.log(res);

 },(err)=>{
  console.log(err);
})


  // this.userserviceobj.updateunlike(f.value).subscribe((res)=>{
  //   console.log(res);
  //  })


  this.userserviceobj.displayallans().subscribe((res)=>{
    this.ansresponse=res;
    this.answ=this.ansresponse.data;
    console.log(this.answ);
    }
    ,(err)=>{
      console.log(err);
    }
    )
}

disLikes(f:NgForm){

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

// getCategory(category: string) {
//   this.catAnsw = [];
//   if (category == 'Education') {
//     this.answ.forEach((dt: any) => {
//       dt.questionid.category == 'Education' ? this.catAnsw.push(dt) : '';
//     });
//   }
// }

// getCategory2(category: string) {
//   this.catAnsw = [];
//   if (category == 'Music') {
//     this.answ.forEach((dt: any) => {
//       dt.questionid.category == 'Music' ? this.catAnsw.push(dt) : '';
//     });
//   }
// }
// getCategory3(category: string) {
//   this.catAnsw = [];
//   if (category == 'Sports') {
//     this.answ.forEach((dt: any) => {
//       dt.questionid.category == 'Sports' ? this.catAnsw.push(dt) : '';
//     });
//   }
// }
// getCategory4(category: string) {
//   this.catAnsw = [];
//   if (category == 'Technical') {
//     this.answ.forEach((dt: any) => {
//       dt.questionid.category == 'Technical' ? this.catAnsw.push(dt) : '';
//     });
//   }
// }

}
