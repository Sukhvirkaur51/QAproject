const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/QAregisterDB",{useNewUrlParser:true,
useUnifiedTopology:true}).then(()=>{
    console.log(" database connect successfully")
}).catch((err)=>{
    console.log("error in connection"+err);
})
