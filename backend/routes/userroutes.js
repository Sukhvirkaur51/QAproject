var express =require('express');
var myctrl=require('../controller/usercontroller');

var approute=express.Router();

approute.post('/newreg',myctrl.addnew);       //post firstname, lastname ,email,password...and register successfully
approute.post('/auth',myctrl.authenticate);   //  post email and password ....it gives response "token" and "user"
approute.get('/userinfo/:id',myctrl.selecteduser);   //get user details

approute.post('/addques',myctrl.addquestions);       //add question to db
approute.get('/displayques/:userid',myctrl.displayquestion); //get questions

approute.post('/addcred',myctrl.addcredentials);       //add credentials to db
approute.get('/displaycred/:userid',myctrl.displaycredentials); //get credentials

approute.post('/addans',myctrl.addanswers);       //add answer to db
approute.get('/displayans/:userid',myctrl.displayanswer); //get answers

approute.put('/updateRecord/:id',myctrl.updatedData);  //for update
approute.put('/updateCredentials/:userid',myctrl.updatedCredentials);  //for update


approute.post('/imageupload/:user',myctrl.uploadimage);


module.exports=approute
