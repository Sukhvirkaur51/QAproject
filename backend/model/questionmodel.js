require('./usermodel');
const mongoose=require('mongoose');
var questionSchema=mongoose.Schema({
  question:{
    type:String,
    required:[true,"question is required"]
  },
  category:{
    type:String,
    required:[true,"category is required"]
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
  },
  // answerid:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:'answer'
  // },

})

mongoose.model('question',questionSchema);
