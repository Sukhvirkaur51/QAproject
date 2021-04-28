import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helpVal/mustmatch.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Registerform!:FormGroup

  constructor(private formbuilder:FormBuilder ,private router:Router) { }

  submitted=false
  hide = true;
  hide1= true;

  ngOnInit(): void {
    this.Registerform=this.formbuilder.group({

      fname: ['',Validators.required],
      lname: ['',Validators.required],
      email:['',[Validators.required,Validators.email]] ,
      profile:['',Validators.required] ,
      password:['',[Validators.required,Validators.minLength(5)]],
      confirmpassword:['',Validators.required],


    },
    {
      validator: MustMatch('password','confirmpassword')

    });
    }
    get fun(){            //inbuilt get method to get form values
  return this.Registerform.controls;
    }
  onSubmit(){
    this.submitted=true;
    if(this.Registerform.invalid)
    return;

    this.router.navigateByUrl('/login');


  }
  }


