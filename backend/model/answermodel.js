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
  }


});

mongoose.model('answer',answerSchema);
