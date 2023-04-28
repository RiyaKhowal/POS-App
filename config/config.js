//use mongodb from here
const mongoose = require("mongoose");

/*
const connectDb = async () => {
    try{
        const conn =  await mongoose.connect(process.env.MONGO_URL);
        console.log(`connection established with mongo ${conn.connection.host}`);
    
    }catch(error){
          console.log(error);
          process.exit(1);
    }
   
}
*/
const connectDb = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected ${conn.connection.host}`);
    } catch (error) {
      console.log(`Error : ${error.message}`);
      process.exit(1);
    }
  };

module.exports = connectDb;