import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { rootReducer } from './../redux/rootReducer';
import {  Modal, Select, Table, message } from 'antd';
import { render } from '@testing-library/react';
import { PlusOutlined, MinusCircleOutlined ,DeleteOutlined} from '@ant-design/icons';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch } from 'react-redux';
import { Button ,Form,Input} from 'antd';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
 const dispatch = useDispatch();
 const [Subtotal, setSubtotal] = useState(0);
 const [BillPopup,setBillPopup] = useState(false);
 const navigate = useNavigate();
    const {cartItems} =  useSelector(state => state.rootReducer);
    const handleIncrement = (record)=>{
           dispatch({
            type:"Update",
            payload: {...record, quantity: record.quantity + 1}
           })
    }

     
    const handleDecrement = (record)=>{
      if(record.quantity !== 1){
        dispatch({
         type:"Update",
         payload: {...record, quantity: record.quantity - 1}
        })
    }
  };
  

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
         
        },
        {
            title: "Image",
            dataIndex: "image",
        render:(image,record)=>(
           < img src={image} alt ={ record.name} height="60" width="60" />
        
          ),
        },
        {
          title: 'Price',
          dataIndex: 'price',
    
        },
        
        {
            title:"Quantity",
            dataIndex:"_id",
            render :(id,record)=>(
 <div>
<PlusOutlined  className = "mx-10" style={{cursor:"pointer"}} onClick={()=>handleIncrement(record)}/>
       <b style={{marginLeft:10, marginRight:10}}>{record.quantity}</b>
 <MinusCircleOutlined className = "mx-3" style={{cursor:"pointer"}}      onClick={()=>handleDecrement(record)}/>
 </div>
            ),       
        },{
            title:'Action',
            dataIndex:'_id',
            render :(id,record)=>
  <DeleteOutlined  onClick={()=>dispatch({
    type:"DeleteFromCart",
    payload:record,
   })} />



                   
        },
      ];

          useEffect(()=>{
            let temp = 0 ;
            cartItems.forEach((item) => 
              (temp = temp +  item.price * item.quantity)
               );
               setSubtotal(temp);
          },[cartItems]);


          const handleSubmit = async(value) =>{
            console.log(value);
              try{

                const newObj =  {
                  ...value,
                  cartItems,
                  Subtotal,
                  tax: Number(((Subtotal / 100) * 10).toFixed(2)),
                  totalAmount:Number( Number(Subtotal) + Number(((Subtotal / 100) * 10).toFixed(2))),
                  userId : JSON.parse(localStorage.getItem("auth"))._id,
                };
            await axios.post("/api/bills/add-bills",newObj);
            console.log(newObj);
            message.success("bill generated successfully");
            navigate("/bills");
              }catch(error){
                console.log(error);
                message.error("something went wrong");
              }
          };
          
      
        
  return (
    <div>
        <DefaultLayout>
            <h1>CartPage</h1>
        <Table dataSource={cartItems} columns={columns} bordered />
        <div className='d-flex'> 
          <h2>Subtotal :  <b>Rs {Subtotal}</b></h2>
         <Button type="primary" onClick={()=>setBillPopup(true)}>Create Invoice</Button>
        </div>
      
     
        <Modal visible = {BillPopup} onCancel={()=>setBillPopup(false)} footer={false} title="Create Invoice"
        >
        <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
      label="customer Name"
      name="customerName" >
      <Input />
    </Form.Item>

    <Form.Item
      label="Contact Number"
      name="customerPhoneNo" >
      <Input />
    </Form.Item>
    <Form.Item
      label="Payment Mode"
      name="paymentMode" >
   <Select>
    <Select.Option value="cash">cash</Select.Option>
    <Select.Option value="card">card</Select.Option>
   </Select>
    </Form.Item>

  
    <div className="bill-it">
      <h5>Subtotal : <b>{Subtotal}</b></h5>
      <h4>Tax : <b>
      {((Subtotal / 100) * 10).toFixed(2)}
        </b></h4>
      <h3>GrandTotal : <b>
      {Number(Subtotal) + Number(((Subtotal / 100) * 10).toFixed(2))}
        </b></h3>
    </div>
    <div className="d-flex justify-content-end">
      <Button type='primary' htmlType="submit">Generate Bill</Button>
    </div>
    </Form>
      </Modal>

        </DefaultLayout>
        
    </div>
  )
}
// {Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))}
//{Number(Subtotal) + Number(((Subtotal / 100) * 10)).toFixed(2)}

export default CartPage;

/*
  <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
      label="customer Name"
      name="customerName" >
      <Input />
    </Form.Item>

    <Form.Item
      label="Contact Number"
      name="customerPhoneNo" >
      <Input />
    </Form.Item>
    <Form.Item
      label="Payment Mode"
      name="paymentMode" >
   <Select>
    <Select.Option value="cash">cash</Select.Option>
    <Select.Option value="card">card</Select.Option>
   </Select>
    </Form.Item>

    </Form>
    <div className="bill-it">
      <h5>Subtotal : <b>{Subtotal}</b></h5>
      <h4>Tax : <b>
      {((Subtotal / 100) * 10).toFixed(2)}
        </b></h4>
      <h3>GrandTotal : <b>
      {Number(Subtotal) + Number(((Subtotal / 100) * 10).toFixed(2))}
        </b></h3>
    </div>
    <div className="d-flex justify-content-end">
      <Button type='primary' htmlType="submit">Generate Bill</Button>
    </div>
</Modal>









<Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerPhoneNo" label="Contact Number">
            <Input />
          </Form.Item>

          <Form.Item name="paymentMode" label="Payment Method">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-it">
            <h5>
              Sub Total : <b>{Subtotal}</b>
            </h5>
            <h4>
              TAX
              <b> {((Subtotal / 100) * 10).toFixed(2)}</b>
            </h4>
            <h3>
              GRAND TOTAL -{" "}
              <b>
                {Number(Subtotal) + Number(((Subtotal / 100) * 10).toFixed(2))}
              </b>
            </h3>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Generate Bill
            </Button>
          </div>
        </Form>
*/