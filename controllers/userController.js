
const json = require ('body-parser');

 const userData = require('./../models/userModel');
/*
 const loginController = async(req,res) =>{
    try{
        const {userId,password} = req.body;//destructed name id pass from body
        //we are finding the data coming from body in db and sending result acc.to that
       const user = await userData.findOne({userId,password,verified :true});
        if(user){
            res.status(201).send(user); 
        }else{
            res.json({
                message: "login fail",
                 user,
            });
        }
  

    }catch(error){
        console.log(error);
    }
 };

const registerController = async(req,res) =>{
    try{
        const newUser =  userData({...req.body,verified :true});
        await  newUser.save();
        res.send("new user added Successfully");
    }
    catch(error){
        res.send(error);
        console.log(error);
    }
}
*/
const loginController = async (req, res) => {
    try {
      const { userId, password } = req.body;
      const user = await userData.findOne({ userId, password, verified: true });
      if (user) {
        res.status(200).send(user);
       // console.log(user);
      } else {
        res.json({
          message: "Login Fail",
          user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  //register
  const registerController = async (req, res) => {
    try {
      const newUser = new userData({ ...req.body, verified: true });
      await newUser.save();
      res.status(201).send("new User added Successfully!");
    } catch (error) {
      res.status(400).send("error", error);
      console.log(error);
    }
  };
  
module.exports = {registerController,loginController};