const mongoose=require('mongoose');
const multer=require('multer');

require('../config/passportconfig')
require('../model/usermodel');
require('../model/questionmodel');
require('../model/addcredmodel');
require('../model/answermodel');
require('../model/profilemodel');

var regData=mongoose.model('register');
var queData=mongoose.model('question');
var credData=mongoose.model('addcredentials');
var ansData=mongoose.model('answer');
var proData=mongoose.model('profilepicture');

const passport = require('passport');
const jwt=require('jsonwebtoken');

module.exports.addnew=(req,res)=>{
    var reg=new regData({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        contact:req.body.contact,
        // location:req.body.location,
        // workexperience:req.body.workexperience,
        // education:req.body.education,
        // address:req.body.address,
        // dateofbirth:req.body.dateofbirth,
        // profile:req.body.profile
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

//display questions

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

//add credentials
module.exports.addcredentials=(req,res)=>{
  var credentials=new credData({
    location:req.body.location,
    dateofbirth:req.body.dateofbirth,
    education:req.body.education,
    address:req.body.address,
    profile:req.body.profile,
    workexperience:req.body.workexperience,
    user:req.body.user
  });
  credentials.save().then((docs)=>{
 return res.status(200).json({
  success:true,
  message:'credentials added successfully',
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

//display credentials

module.exports.displaycredentials=(req,res)=>{
  return credData.find({user:req.params.userid}).populate('user').exec().then((docs)=>{
    return res.status(200).json({
      success:true,
      message:'display credentials',
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

// module.exports.displaycredentials=(req,res)=>{
//   credData.findById({user:req.params.id}).then
//   ((docs)=>{
//     console.log(docs);
//     return res.status(200).json({
//       success:true,
//       message:'credentials found',
//       data:docs
//     })
//   }).catch((err)=>{
//     return res.status(400).json({
//       success:false,
//       message:'credentials not found',
//       error:err.message
//     })
//   })
// }

//add answers
module.exports.addanswers=(req,res)=>{
  var myanswer=new ansData({
    answer:req.body.answer,
    questionid:req.body.questionid,
    userid:req.body.userid
  });
  myanswer.save().then((docs)=>{
 return res.status(200).json({
  success:true,
  message:'new answer added',
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

//display answer

module.exports.displayanswer=(req,res)=>{
  return ansData.find({questionid:req.params.questionid},{userid:req.params.userid}).populate('questionid').populate('userid').exec().then((docs)=>{
    return res.status(200).json({
      success:true,
      message:'list of answers',
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

//update data by id
module.exports.updatedData=(req,res)=>{

  var updatedData=req.body;

  regData.findByIdAndUpdate({_id:req.params.id},{$set:updatedData},{new:true})
  .then((docs)=>{
      return res.status(200).json({
          success:true,
          message:'Data updated',
          data:docs
      })  })
      .catch((err)=>{
          return res.status(401).json({
              success:false,
              message:"error in updating data",
              error:err.message
          })
      })

}

//for uploading profilepicture

var storage=multer.diskStorage({

  destination:(req,file,cb)=>{
    cb(null,'./uploads');
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname);
  }

  })



  var upload=multer({storage:storage}).single('file');

  module.exports.uploadimage=(req,res)=>{
    upload(req,res,(err)=>{
      if(err)
      console.log("error in uploading file" +err);

      else{
        console.log("file uploading successfully");

        var proimage=new proData({
          user:req.params.user,
          image:req.file.path
        });

        proimage.save().then((docs)=>{
          return res.status(200).json({
            success:true,
            message:"image saved successfully",
            data:docs
          })
        })
             .catch((err)=>{
             return res.status(404).json({
               success:false,
               message:"error in uploading file",
               error:err.message
             })
             })

             console.log(req.file);

      }
    })
  }

