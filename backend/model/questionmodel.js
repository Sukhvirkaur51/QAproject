require('./usermodel');
const mongoose=require('mongoose');
var questionSchema=mongoose.Schema({
  question:{
    type:String
  },
  category:{
    type:String
  },
  about:{
    type:String
  },
  date:{
    type:Date,
    default:Date.now()
  },
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'register'
  }
})

mongoose.model('question',questionSchema);
