const mongoose=require('mongoose');

require('../config/passportconfig')
require('../model/usermodel');
require('../model/questionmodel');

var regData=mongoose.model('register');
var queData=mongoose.model('question');

const passport = require('passport');
const jwt=require('jsonwebtoken');

module.exports.addnew=(req,res)=>{
    var reg=new regData({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    });
    reg.save().then((docs)=>{
        return res.status(200).json({
            message:"new user register successfully",
            success:true,
            data:docs

        })
    }).catch((err)=>{
        return res.status(401).json({
            message:"error in adding",
            success:false,
            error:err.message
        })
    })
}


// authentication....  generate token if user is verified
module.exports.authenticate=(req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{
      if(err) return res.status(404).json(err);
      if (user) return res.status(200).json({
          "token":jwt.sign({_id:user._id},"SecretToken",{expiresIn:'2000m'}),
          "user":user
      });
      if(info) return res.status(401).json(info)
  })(req,res,next)
}

//selectedUser

module.exports.selecteduser=(req,res)=>{
  regData.findById({_id:req.params.id}).then
  ((docs)=>{
    return res.status(200).json({
      success:true,
      message:'user found',
      data:docs
    })
  }).catch((err)=>{
    return res.status(400).json({
      success:false,
      message:'User not found',
      error:err.message
    })
  })
}


//add questions
module.exports.addquestions=(req,res)=>{
  var myquestion=new queData({
    question:req.body.question,
    category:req.body.category,
    about:req.body.about,
    user:req.body.user
  });
  myquestion.save().then((docs)=>{
 return res.status(200).json({
  success:true,
  message:'new question added',
  data:docs

 })
  }).catch((err)=>{
    return res.status(400).json({
      success:false,
      message:'error in adding',
      error:err.message
  })
})
}

//display display questions

module.exports.displayquestion=(req,res)=>{
  return queData.find({user:req.params.userid}).populate('user').exec().then((docs)=>{
    return res.status(200).json({
      success:true,
      message:'list of questions',
      data:docs
  })
}).catch((err)=>{
  return res.status(400).json({
    success:false,
    message:'error in displaying',
    error:err.message
})
})
}
