import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-addcredentials',
  templateUrl: './addcredentials.component.html',
  styleUrls: ['./addcredentials.component.css']
})
export class AddcredentialsComponent implements OnInit {

  constructor(public userserviceobj:UserService ,public router:Router,private dialog:MatDialog) { }

  id:any;
  credentialdata:any=[];
  cred:any=[];



  ngOnInit(): void {

    this.id=this.userserviceobj.getuserid();
    console.log(this.id);

  }



  submitcred(f:NgForm){
    this.userserviceobj.addcredentials(f.value).subscribe((res)=>{
          //  console.log(res);
           this.credentialdata=res;
            this.cred=this.credentialdata.data;
            console.log(this.cred);

      //  location.reload();
       this.router.navigateByUrl('/profile')
      this.dialog.closeAll();

    },(err)=>{
      console.log(err);
    }
    )

  }

  close(){
    this.dialog.closeAll();
  }

}
