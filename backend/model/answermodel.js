const mongoose=require('mongoose');
require('./questionmodel');
require('./usermodel');

var answerSchema=mongoose.Schema({
  answer:{
    type:String,
    required:[true,"answer is required"]
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
    default:Date()
    // default:date.format(Date.now(), 'DD-[MM]-YYYY')
  },

  pictureid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'profilepicture'
  },

  likes:[{type:mongoose.Schema.Types.ObjectId,
    ref:'register'}]

});

mongoose.model('answer',answerSchema);
