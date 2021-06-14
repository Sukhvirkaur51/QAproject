const nodemailer= require('nodemailer');

let transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:465,
  secure:true,

  auth:{
    user:'randomale393@gmail.com',
    pass:'randomac.@393'
  }
});

let mail={
          from:'"Random " <randomale393@gmail.com>',
           to:'eswa6603@gmail.com',
           subject:"email testing",

}

transporter.sendMail(mail, function(error,info){
  if(error){
    console.log(error);


  }
  else{
    console.log("message sent")

  }
})
