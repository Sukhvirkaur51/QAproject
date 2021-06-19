const mongoose=require('mongoose')
require('./questionmodel');
require('./usermodel');
require('./answermodel')

var addlikesSchema= mongoose.Schema({

  answerid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'answer'
  },


userid:[{type:mongoose.Schema.Types.ObjectId,
    ref:'register'}],

    like:{
      type:Number,
      default:0
    },
    dislike:{
      type:Number,
      default:0
    }



})

mongoose.model('likes', addlikesSchema)
