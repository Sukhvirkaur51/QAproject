import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-add-que',
  templateUrl: './add-que.component.html',
  styleUrls: ['./add-que.component.css']
})
export class AddQueComponent implements OnInit {

  constructor(public userserviceobj:UserService, public router:Router) { }

  ngOnInit(): void {
  }

  onadd(f:NgForm){
    this.userserviceobj.addques(f.value).subscribe((res)=>{
      console.log(res);
      this.router.navigateByUrl('/profile')



    },(err)=>{
      console.log(err);
    }
    )

  }

  }


