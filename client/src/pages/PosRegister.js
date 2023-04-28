import {React,useEffect} from 'react';
import {  Button,Form,Input,message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';


const PosRegister = () => {
    const navigate = useNavigate();
    useEffect(()=>{
      if(localStorage.getItem("auth")){
       localStorage.getItem("auth");
       navigate("/");
      }
   },[navigate]);
    const handleSubmit = async(value)=>{
       console.log(value);
       try{
       await axios.post("/api/users/register",value);
       message.success("Registered Successfully");
       navigate('/login');
    }catch(error){
        console.log(error);
        message.error("Something went wrong");
    }

    }
  return (
    <div  className="register">
       
        <div className="register-form">
        <h1>POS App</h1>
        
        <Form layout="vertical" onFinish={handleSubmit}  >
        <Form.Item
      label="Name"
      name="name" >
      <Input />
    </Form.Item>

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
            <h3>Already Registered ! <Link to='/Login'>Login</Link></h3></p>
              <Button type="primary" htmlType="submit">
               Register
              </Button></div>
        </Form>
        </div>
    </div>
  )
}

export default PosRegister