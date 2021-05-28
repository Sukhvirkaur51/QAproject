import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-edit-credentials',
  templateUrl: './edit-credentials.component.html',
  styleUrls: ['./edit-credentials.component.css']
})
export class EditCredentialsComponent implements OnInit {

  constructor(public userserviceobj:UserService, private dialog:MatDialog) { }

  editcred:any=[];
  edit:any=[];

  id:any;
  credentialdata:any=[];
  cred:any=[];

  ngOnInit(): void {

    this.id=this.userserviceobj.getuserid();
    console.log(this.id);

    this.userserviceobj.displaycredentials(this.id).subscribe((res)=>{
      // console.log(res)
           this.credentialdata=res;
            console.log(this.credentialdata);
            this.cred=this.credentialdata.data[0];
            console.log(this.cred);
    }
    ,(err)=>{
      console.log(err);

    })
  }




  OnSubmit(f:NgForm){
    console.log(f.value);
   this.userserviceobj.updatecredentials(f.value).subscribe((res)=>{
     console.log(res);
     this.editcred=res;
     this.edit=this.editcred.data;
     console.log(this.edit);
     this.dialog.closeAll();


   })


}

  close(){
    this.dialog.closeAll();
  }
}
