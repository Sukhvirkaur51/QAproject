require('./usermodel');

const mongoose=require('mongoose');

var profileSchema=mongoose.Schema({

  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'register'
  },

  image:{
    type:String
  },

  date:{
    type:Date,
    default:Date.now()
  }
})

mongoose.model('profilepicture' ,profileSchema);
