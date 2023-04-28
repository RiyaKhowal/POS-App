import React, { useEffect, useState,useRef } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {EyeOutlined} from '@ant-design/icons';
import axios from 'axios';
import {   Table,Modal } from 'antd';
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { Button } from 'antd';
import "../styles/InvoiceStyles.css";
import { useDispatch } from 'react-redux';

const PageBill = () => {
  const componentRef = useRef();
  const [Billdata,setBilldata] = useState([]);
  //DeleteCartItems
  const dispatch  = useDispatch();
  const [invoicePopup,setinvoicePopup]  =  useState(false);
  const [selectedBill,setselectedBill] = useState({});
    const columns = [
        {
          title: "ID",
          dataIndex: "_id",
         
        },
        {
          title: "Customer Name",
          dataIndex: "customerName",
         
        },
        {
          title: "Contact No",
          dataIndex: "customerPhoneNo",
         
        },
        {
          title: "Subtotal",
          dataIndex: "Subtotal",
         
        },
        {
          title: "Tax",
          dataIndex: "tax",
         
        },
        {
          title: "Total Amount",
          dataIndex: "totalAmount",
         
        },
        {
            title:'Action',
            dataIndex:'_id',
            render :(id,record)=>(
              <div>
             <EyeOutlined
             onClick={() => {
              setselectedBill(record);
              setinvoicePopup(true);
            }}
             
             />  
             </div>),
                   
        },
      ];
   
    
   const getBills = async () =>{
     try{
      //check why i am getting billsarray by  writing variable name data only?
        const {data} = await axios.get("/api/bills/get-bills");
    setBilldata(data);
     //console.log(billdata); 

    
     }catch(error){
     console.log(error);
     }
   };
 
   useEffect(()=>{
    getBills();
    
   },[]);

   const handlePrint = useReactToPrint({
    content: () => componentRef.current,

  },
  dispatch({
    type:"DeleteCartItems",
  })
  );

   console.log(selectedBill);
   console.log(selectedBill.cartItems);
  return (
    <DefaultLayout>
      <h1>Invoice List</h1>
      <div  style={{width:200}}>
        <Table dataSource={Billdata} columns={columns} bordered  pagination={false} size="small" />
        </div>
        <Modal visible = {invoicePopup} onCancel={()=> {setinvoicePopup(false)
          //setselectedBill(null)
        }}
           footer={false} title="Invoice Detail" pagination ={false}>
             <div id="invoice-POS" ref={componentRef}>
       <h1 style={{marginLeft:150}}>POS APP</h1>
       <h3 style={{marginLeft:70,color:'grey'}}>Contact : 12345 || New Delhi,Delhi</h3>

       <hr/>

       <div>
       <div>Contact Name :{selectedBill.customerName} </div>
        <div>Contact No:{selectedBill.customerPhoneNo} </div>
       </div>


       

      {/*
        selectedBill.cartItems.map((item)=>{

        })
        */
      }
      <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours">
                        <h2>Qty</h2>
                      </td>
                      <td className="Rate">
                        <h2>Price</h2>
                      </td>
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    
                    { 
                     selectedBill.cartItems?.map((it) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{it.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{it.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{it.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {it.quantity * it.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))
                 
                    }

                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>tax</h2>
                      </td>
                      <td className="payment">
                        <h2>${selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Grand Total</h2>
                      </td>
                      <td className="payment">
                        <h2>
                          <b>${selectedBill.totalAmount}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
     
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong> 10% GST application
                  on total amount.Please note that this is non refundable amount
                  for any assistance please write email
                  <b> help@mydomain.com</b>
                </p>
              </div>
          
            {/*End InvoiceBot*/}
        
          {/*End Invoice*/}
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
          </div>
          </Modal>
    </DefaultLayout>
  )
}

export default PageBill;
/*  <div>Contact Name :{selectedBill.customerName} </div>
        <div>Contact No:{selectedBill.customerPhoneNo} </div>
        <div>Date : <b>{selectedBill.date.toString().substring(0, 10)}</b></div>
        */