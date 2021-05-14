import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{User,Loginuser} from './user.model';
import{Question} from './question.model';
import{Addcredentials} from './addcredentials.model';
import{Answer} from './answer.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  credentialdata:any=[];
  cred:any=[];

//   quesresponse:any=[];
//   que:any=[];



  credentialsdata(){
  this.displaycredentials(this.getuserid()).subscribe((res)=>{
    this.credentialdata=res;
    this.cred=this.credentialdata.data;
    console.log(this.cred);
}
,(err)=>{
console.log(err);

})
  }


  // questionData(){
  //   this.displayques(this.getuserid).subscribe((res)=>{
  //     this.quesresponse=res;
  //     console.log(res);
  //     this.que=this.quesresponse.data;
  //     console.log(this.que[0]._id);
  //     console.log("question added successfully");
  //   }
  //   ,(err)=>{
  //     console.log(err);
  //   }
  //   )
  // }

  public regnew:User={
    firstname:'',
    lastname:'',
    email:'',
    contact:'',
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

public addcred:Addcredentials={
  location:this.cred.location,
  profile:this.cred.profile,
  education:this.cred.education,
  dateofbirth:this.cred.dateofbirth,
  workexperience:this.cred.workexperience,
  address:this.cred.address,
  user:this.getuserid()
};

public answers:Answer={
  answer:'',
  questionid:'',
  // questionid:this.que[0]._id,
  userid:this.getuserid()
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


// setquestionid(id:any){
//   localStorage.setItem('questionid',id);
// }

// getquestionid(){
//   localStorage.getItem('questionid');

// }

// deletequestionid(){
//   localStorage.removeItem('questionid');
// }

}
