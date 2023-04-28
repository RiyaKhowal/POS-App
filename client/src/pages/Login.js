import React, { useEffect } from 'react';
import { Form,Input ,Button,message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  
    const navigate = useNavigate();
    useEffect(()=>{
      if(localStorage.getItem("auth") ){
    
          localStorage.getItem("auth");
       navigate("/");
       console.log("heyyy");
      }
   },[navigate]);
   
   /*
    const handleSubmit = async(value)=>{
     
      
      try{
   const res =  await axios.post("/api/users/login",value);
        
        message.success("login successfully");

        if(res.data !== null){
     localStorage.setItem("auth",JSON.stringify(res.data));
         navigate("/");
        }
      }catch(error){
        console.log(error);
        message.error("Something went wrong");
    }
     };
*/


    
      const handleSubmit = async (value) => {
        try {
         
          const res = await axios.post("/api/users/login", value);
          
        
          if(res.data.user !== null){
            message.success("user login Succesfully");
          localStorage.setItem("auth", JSON.stringify(res.data));
        
          navigate("/");
          }else{
            message.success(" login fail");
            navigate("/register")

          }
        } catch (error) {
         
          message.error("Something Went Wrong");
          console.log(error);
        }
      };
      
   return (
     <div  className="register">
        
         <div className="register-form">
         <h1> POS App</h1>
         <h2>Login Page</h2>
         <Form layout="vertical" onFinish={handleSubmit}  >
         
 
     <Form.Item
       label="User ID"
       name="userId" >
       <Input  />
     </Form.Item>
 
     <Form.Item
       label="Password"
       name="password" >
       <Input  type="password"/>
     </Form.Item>
     
     <div className="d-flex justify-content-end">
         <p>
             <h3>Not a user Please  <Link to='/register'>Register here </Link> !</h3></p>
               <Button type="primary" htmlType="submit">
            Login
               </Button></div>
         </Form>
         </div>
     </div>
   )
 }

export default Login