import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{User,Loginuser} from './user.model';
import{Question} from './question.model';
import{Addcredentials} from './addcredentials.model';
import{Answer} from './answer.model'
import { Observable } from 'rxjs';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  credentialdata:any=[];
  cred:any=[];


id:any;
  userdata:any=[];
  userinfo:any=[];



  // previousinfo(){
  // this.id=this.getuserid();
    // console.log(this.id);
    // this.display(this.id).subscribe((res)=>{
      // with display method returns success,msg,data

      // console.log(res);
      // this.userdata=res;
      // this.userinfo=this.userdata.data;
      // console.log(this.userinfo);

    //  })
    // }


  public regnew:User={
    firstname:this.userinfo.firstname,
    lastname:this.userinfo.lastname,
    email:this.userinfo.email,
    contact:this.userinfo.contact,
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
    userid:this.getuserid()
  };

public addcred:Addcredentials={
  location:this.cred.location,
  profile:this.cred.profile,
  education:this.cred.education,
  dateofbirth:this.cred.dateofbirth,
  workexperience:this.cred.workexperience,
  address:this.cred.address,
  userid:this.getuserid()
};

public answers:Answer={
  answer:'',
  questionid:'',
  userid:this.getuserid()
};

public profileimage:Profile={
  userid:this.getuserid(),
  image:'',
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

addcredentials(credentials:Addcredentials){
  return this.http.post('http://localhost:3200/addcred', credentials);
}

displaycredentials(id:any){
  return this.http.get('http://localhost:3200/displaycred/'+id);
}

addanswer(answers:Answer){
  return this.http.post('http://localhost:3200/addans',answers);
};

displayanswer(id:any){
  return this.http.get('http://localhost:3200/displayans/'+id);
 // return this.http.get('http://localhost:3200/displayans/609cbbe9c3122255c4899ca4');
}

updateuser(selected:User){
  return this.http.put(`${'http://localhost:3200/updateRecord'}/${this.getuserid()}`,selected);
}

updatecredentials(selectedcred:Addcredentials){
  return this.http.put(`${'http://localhost:3200/updateCredentials'}/${this.getuserid()}`,selectedcred);
}

userimage(profilepic:Profile){
  return this.http.post('http://localhost:3200/imageupload',profilepic);
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
