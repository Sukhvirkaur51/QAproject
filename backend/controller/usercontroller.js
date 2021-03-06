const mongoose=require('mongoose');
const multer=require('multer');
const nodemailer = require('nodemailer');
const crypto= require('crypto');
const bcyrpt=require('bcrypt');


require('../config/passportconfig')
require('../model/usermodel');
require('../model/questionmodel');
require('../model/addcredmodel');
require('../model/answermodel');
require('../model/profilemodel');
require('../model/likemodel');

var regData=mongoose.model('register');
var queData=mongoose.model('question');
var credData=mongoose.model('addcredentials');
var ansData=mongoose.model('answer');
var proData=mongoose.model('profilepicture');
var likeData=mongoose.model('likes')

const passport = require('passport');
const jwt=require('jsonwebtoken');

module.exports.addnew=(req,res)=>{
    var reg=new regData({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        contact:req.body.contact,

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
    userid:req.body.userid,
    // answerid:req.body.answerid
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

//display questions of single user

module.exports.displayquestion=(req,res)=>{
  return queData.find({userid:req.params.userid}).populate('userid').exec().then((docs)=>{
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

//display questions of all users

var _id = mongoose.Types.ObjectId();
module.exports.allquestion=(req,res)=>{
  return queData.find({},{_id:1, userid:1}).populate('_id').populate('userid').then((docs)=>{
    return res.status(200).json({
      success:true,
      message:'list of all questions',
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

//display answers of all users

var _id = mongoose.Types.ObjectId();
module.exports.allanswers=(req,res)=>{
  return ansData.find({},{ sort: { 'date' : 1 } },{_id:1, userid:1,questionid:1,
     credentialid:1, pictureid:1, date:1}).populate('_id')
  .populate('questionid').populate('userid').populate('credentialid')
  .populate('pictureid').exec().then((docs)=>{
    return res.status(200).json({
      success:true,
      message:'list of all users answers',
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
    userid:req.body.userid
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
  return credData.find({userid:req.params.userid}).populate('userid').exec().then((docs)=>{
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


//display credentials of all users

// var _id = mongoose.Types.ObjectId();
// module.exports.allcredentials=(req,res)=>{
//   return credData.find({},{_id:1, userid:1}).populate('_id').populate('userid').exec().then((docs)=>{
//     return res.status(200).json({
//       success:true,
//       message:'list of all users credentials',
//       data:docs
//   })
// }).catch((err)=>{
//   return res.status(400).json({
//     success:false,
//     message:'error in displaying',
//     error:err.message
// })
// })
// }

//add answers
module.exports.addanswers=(req,res)=>{
  var myanswer=new ansData({
    answer:req.body.answer,
    date:req.body.date,
    questionid:req.body.questionid,
    userid:req.body.userid,
    credentialid:req.body.credentialid,
    pictureid:req.body.pictureid
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
  return ansData.find(
  // {questionid:req.params.questionid},
    {userid:req.params.userid}).populate('questionid').populate('userid').exec().then((docs)=>{
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

//update credentials by userid
module.exports.updatedCredentials=(req,res)=>{

  var updatedCred=req.body;

  credData.findOneAndUpdate({userid:req.params.userid},{$set:updatedCred},{new:true})
  .then((docs)=>{

      return res.status(200).json({
          success:true,
          message:'Credentials updated',
          data:docs
      })  })
      .catch((err)=>{
          return res.status(401).json({
              success:false,
              message:"error in updating credentials",
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



  var upload=multer({storage:storage}).single('image');

  module.exports.uploadimage=(req,res)=>{
    upload(req,res,(err)=>{
      if(err)
      console.log("error in uploading file" +err);

      else{
        //console.log(req.file.path);

        const url=req.protocol+ '://' + req.get("host");
        req.body.imageUrl=url+"/uploads/"+req.file.filename;
                console.log("file uploading successfully");

        var proimage=new proData({
          userid:req.body.userid,
          image:req.body.imageUrl
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


  module.exports.displayimage=(req,res)=>{
    return proData.find({userid:req.params.userid}).populate('userid').exec().then((docs)=>{
      return res.status(200).json({
        success:true,
        message:'display image',
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


  // like answers
  module.exports.likes=(req,res)=>{
    // likecount=0
    // likecount=likecount++

  ansData.findByIdAndUpdate({_id:req.body._id},
    {$push:{likes:req.body.likes}},{new:true})
  .then((docs)=>{

      return res.status(200).json({
          success:true,
          message:'likes increment',
          data:docs
      })  })
      .catch((err)=>{
          return res.status(401).json({
              success:false,
              message:"error while doing likes",
              error:err.message
          })
      })

  }



  // unlike answers
  module.exports.unlikes=(req,res)=>{
    ansData.findByIdAndUpdate({_id:req.body._id},{$pull:{likes:req.body.likes}},{new:true})
    .then((docs)=>{

        return res.status(200).json({
            success:true,
            message:'likes decrement',
            data:docs
        })  })
        .catch((err)=>{
            return res.status(401).json({
                success:false,
                message:"error occurs",
                error:err.message
            })
        })

    }

      //email sending

      let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,

        auth:{
          user:'qaforum2021@gmail.com',
          pass:'qa2021forum'
        }
      });




    //forget password

    module.exports.forgetpassword=(req,res)=>{
      if(!req.body.email){
       return res.status(500).json({
         msg:"Email is required"
       })
      }

      regData.findOne({email:req.body.email}).then(user =>{
        if(!user){
          res.status(500).json({
            error:"Email is not registered in database"
          })
        }

       const token=crypto.randomBytes(16).toString('hex');
       const link ='http://localhost:4200/resetpassword?token='+token;

       user.resettoken=token;
       user.expiretoken=Date.now()+3600000;
       user.save().then((result)=>{
         transporter.sendMail({
           from:'"QAForum " <qaforum2021@gmail.com>',
           to:user.email,
           subject:"Password Activated",
           text:"Please click on this link"+ " "+link+ " "+"to reset password"
         })
         res.status(200).json({
           msg:"please check your email to reset password"
         })

       })

      })
    }


    // reset password

    module.exports.resetPass=(req,res)=>{
      const getToken=req.params.token
      const password=req.body.password
      regData.findOne({resettoken:getToken,expiretoken:{$gt:Date.now()}}).then((user)=>{

        if(!user)
        {
          return res.status(500).json({
            msg:"Token time is expired now"
          })
        } else{
  // bcyrpt.hash(newpassword,10), function(err,hash){
  //   user.password=hash
    user.password=password
    user.resettoken=undefined
    user.expiretoken=undefined
    user.save().then((docs)=>{

        return res.status(200).json({
          success:true,
          message:'password updated successfully',
          data:docs
      })
      })
      .catch((err)=>{
        return res.status(401).json({
            success:false,
            message:"error occurs",
            error:err.message
        })
    })

  }
// }

      })
    }


//     module.exports.addlikes=(req,res)=>{
//       var like=new likeData({
//           answerid:req.body.answerid,
//           likes:req.body.likes,


//       });
// like.countlikes+=1;
//       like.save().then((docs)=>{
//           return res.status(200).json({
//               message:"likes increment",
//               success:true,
//               data:docs

//           })
//       }).catch((err)=>{
//           return res.status(401).json({
//               message:"error in increment",
//               success:false,
//               error:err.message
//           })
//       })
//   }

