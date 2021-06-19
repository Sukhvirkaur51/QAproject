import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{User,Loginuser} from './user.model';
import{Question} from './question.model';
import{Addcredentials} from './addcredentials.model';
import{Answer} from './answer.model'
import { Likes } from './likes.model';

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
    userid:this.getuserid(),
    // answerid:''
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
  _id:'',
  answer:'',
  questionid:'',
  userid:this.getuserid(),
  credentialid:'',
  pictureid:'',
  date:'',
  likes:this.getuserid()
};

// public like:Likes={
//   answerid:'',
//   likes:this.getuserid()
// }


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

//display question of  single user

displayques(id:any){
  return this.http.get('http://localhost:3200/displayques/'+id);
}

//display questions of all users
displayallques(){
  return this.http.get('http://localhost:3200/displayallques');
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
//  return this.http.get('http://localhost:3200/displayans/60a51dde93004a54700869cb');
}

displayallans(){
  return this.http.get('http://localhost:3200/displayallans');
}




updateuser(selected:User){
  return this.http.put(`${'http://localhost:3200/updateRecord'}/${this.getuserid()}`,selected);
}

updatecredentials(selectedcred:Addcredentials){
  return this.http.put(`${'http://localhost:3200/updateCredentials'}/${this.getuserid()}`,selectedcred);
}



userimage(userid:any, image:any){
  const formdata:any=new FormData();
  formdata.append('userid', userid)
  formdata.append('image',image)
  return this.http.post('http://localhost:3200/imageupload',formdata);
}
displayuserimage(id:any){
  return this.http.get('http://localhost:3200/displayimage/'+id);
}



updatelike(data:any){
  return this.http.put('http://localhost:3200/updatelikes',data);
}

updateunlike(data:any){
  return this.http.put('http://localhost:3200/updateunlikes',data);
}


//email sending for forget password
forgetpassword(user:User){
  return this.http.post('http://localhost:3200/forgetpass',user);
}

//resetpassword
resetpassword(password:User){
  return this.http.post('http://localhost:3200/resetpassword/:token',password);

}

// addlikes(like:Likes){
//   return this.http.post('http://localhost:3200/likes',like);
// }


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
