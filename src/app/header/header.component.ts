import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router , public userserviceobj:UserService) { }

  id:any;
  userdata:any=[];
  userinfo:any=[];

  imagedata:any=[];
  proimage:any=[];
  proimage1:any=[];
  imagelength!:any;


  ngOnInit(): void {
    this.id=this.userserviceobj.getuserid();   //get userid and sent with api to get userinfo
      console.log(this.id);   //gives id of user in normal form
    this.userdata=this.userserviceobj.display(this.id).subscribe((res)=>{  //with display method returns success,msg,data
      this.userdata=res;
      this.userinfo=this.userdata.data;
       console.log(this.userinfo);   //give userinfo on console without success and msg in backend format.



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
      })
  }


  profileop(){
    this.router.navigateByUrl('/profile');
  }
}
