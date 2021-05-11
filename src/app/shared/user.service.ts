import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{User,Loginuser} from './user.model';
import{Question} from './question.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public regnew:User={
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    confirmpassword:'',

  };

  public existinguser:Loginuser={
    email:'',
    password:''
  }

  public newquestion:Question={
    question:'',
    category:'',
    about:'',
    user:this.getuserid()


  };

  constructor(private http:HttpClient) { }

  register(user:User){
    return this.http.post('http://localhost:3200/newreg',user)

  }

  login(existuser:Loginuser){
    return this.http.post('http://localhost:3200/auth',existuser)
  }

 // to display selected user content
display(id:any){
  return this.http.get('http://localhost:3200/userinfo/'+id);   //returns success message and data

}

//add new questions
addques(question:Question){
  return this.http.post('http://localhost:3200/addques',question);

}

//display question of user

displayques(id:any){
  return this.http.get('http://localhost:3200/displayques/'+id);
}




//use localstorage to store token
setToken(token:string){
  localStorage.setItem('usertoken',token);

}

getToken(){
  return localStorage.getItem('usertoken');
}

deleteToken(){
  localStorage.removeItem('usertoken');
}

//decode token
getPayload(){
  var token = JSON.stringify(this.getToken());
  var userpayload= atob(token.split('.')[1]);
  if(userpayload){
    return JSON.parse(userpayload);
  }

  else{
    return null;
  }
}

isloggedIn(){
  var userpayload=this.getPayload();
  if(userpayload){
    return userpayload.exp>Date.now()/1000;
  }
  else{
    return null;
  }
}


//localstorage to store user id
setuserid(id:string){
  localStorage.setItem('userid',id);
}

getuserid(){
  return localStorage.getItem('userid');
}

deleteuserid(){
  localStorage.removeItem('userid');
}


}
