const  mongoose  = require("mongoose");

   
    const userDataSchema = mongoose.Schema({
     name: {
       type:String,
      required:true
    },
    userId: {
        type:String,
       required:true
     },
     password:{
        type:String,
        required : true
     },
     verified:{
        type:Boolean
     }
    },{
        timeStamp:true
     });


  const userData =   mongoose.model("userData",userDataSchema);
  module.exports = userData;