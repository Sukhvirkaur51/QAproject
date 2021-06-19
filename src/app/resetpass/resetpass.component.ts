import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {

  hide = true;
  hide1= true;
  id:any;

  constructor(public userserviceobj:UserService ) { }

  ngOnInit(): void {

    //  this.id =this.userserviceobj.getresetToken();
    //  console.log(this.id);
  }



  setpass(f:NgForm){
    this.userserviceobj.resetpassword(f.value).subscribe((res)=>{
      console.log(f.value);
      console.log(res)
      alert("password updated successfully");
    })

  }
}
