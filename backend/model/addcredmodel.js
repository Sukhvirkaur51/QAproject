const mongoose=require('mongoose');

var addcredSchema=mongoose.Schema({
   location:{
     type:String
   },
   dateofbirth:{
     type:Date
   },
   address:{
     type:String
   },
   education:{
     type:String
   },
   profile:{
     type:String
   },
   workexperience:{
     type:String
   },
   userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'register'
  }



});

mongoose.model('addcredentials',addcredSchema);
