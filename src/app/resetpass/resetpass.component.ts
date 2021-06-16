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

  constructor(public userserviceobj:UserService ) { }

  ngOnInit(): void {
  }



  setpass(f:NgForm){

  }
}
