const mongoose=require("mongoose")
require('dotenv').config();


mongoose.connect(process.env.MONGOURL,{useNewUrlParser:true,useUnifiedTopology:false})
.then(()=>{
   console.log("connected..........");
})
.catch((err)=>{
   console.log("not connected",err);
})