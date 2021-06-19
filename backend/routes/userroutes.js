var express =require('express');
var myctrl=require('../controller/usercontroller');

var approute=express.Router();

approute.post('/newreg',myctrl.addnew);       //post firstname, lastname ,email,password...and register successfully
approute.post('/auth',myctrl.authenticate);   //  post email and password ....it gives response "token" and "user"
approute.get('/userinfo/:id',myctrl.selecteduser);   //get user details

approute.post('/addques',myctrl.addquestions);       //add question to db
approute.get('/displayques/:userid',myctrl.displayquestion); //get single user questions
approute.get('/displayallques',myctrl.allquestion); //get all questions

approute.post('/addcred',myctrl.addcredentials);       //add credentials to db
approute.get('/displaycred/:userid',myctrl.displaycredentials); //get credentials
// approute.get('/displayallcred',myctrl.allcredentials); //get all credentials


approute.post('/addans',myctrl.addanswers);       //add answer to db
approute.get('/displayans/:userid',myctrl.displayanswer); //get answers
approute.get('/displayallans',myctrl.allanswers); //get all answers

approute.put('/updateRecord/:id',myctrl.updatedData);  //for update
approute.put('/updateCredentials/:userid',myctrl.updatedCredentials);  //for update


approute.post('/imageupload',myctrl.uploadimage);
approute.get('/displayimage/:userid',myctrl.displayimage);

approute.put('/updatelikes',myctrl.likes);  //for update
approute.put('/updateunlikes',myctrl.unlikes);  //for update

approute.post('/forgetpass', myctrl.forgetpassword);
approute.post('/resetpassword/:token', myctrl.resetPass);

// approute.post('/likes', myctrl.addlikes);



module.exports=approute
