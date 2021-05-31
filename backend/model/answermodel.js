const mongoose=require('mongoose');
require('./questionmodel');
require('./usermodel');

var answerSchema=mongoose.Schema({
  answer:{
    type:String,
  },

  questionid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'question'
  },

  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'register'
  },

  credentialid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'addcredentials'
  },
  date:{
    type:Date,
    default:Date.now()
  }


});

mongoose.model('answer',answerSchema);
