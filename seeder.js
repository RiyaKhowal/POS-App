 //add data in mongoDB through seeder file
 const mongoose = require("mongoose");
 const Items = require('./models/itemModel');
 const dotenv = require("dotenv");
 const connectDb = require('./config/config');
 const items = require('./utils/data');
 dotenv.config();
 connectDb();

 const  importData = async () => {
    try{
      await Items.deleteMany();
      const itemsData =  await Items.insertMany(items);
      console.log("Items added in db");
      process.exit();
    }
      catch(error){
     console.log(error);
     process.exit(1);
      }
 };

 importData();