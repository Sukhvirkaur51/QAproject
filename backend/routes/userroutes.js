var express =require('express');
var myctrl=require('../controller/usercontroller');

var approute=express.Router();

approute.post('/newreg',myctrl.addnew);       //post firstname, lastname ,email,password...and register successfully
approute.post('/auth',myctrl.authenticate);   //  post email and password ....it gives response "token" and "user"
approute.get('/userinfo/:id',myctrl.selecteduser);
approute.post('/addques',myctrl.addquestions);
approute.get('/displayques/:userid',myctrl.displayquestion);


module.exports=approute
