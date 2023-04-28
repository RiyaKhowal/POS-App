import React , { useEffect, useState }from 'react'
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import {   Table } from 'antd';

const CustomerPage = () => {
    const [AllBills,setAllBills] = useState([]);
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

      ];

      const getBills = async () =>{
        try{
         //check why i am getting billsarray by  writing variable name data only?
           const {data} = await axios.get("/api/bills/get-bills");
        setAllBills(data);
        //console.log(billdata); 
   
       
        }catch(error){
        console.log(error);
        }
      };
    
      useEffect(()=>{
       getBills();
       
      },[]);
   
  return (
    <DefaultLayout>
      <div >
 <Table dataSource={AllBills} columns={columns} bordered pagination= {false} />
 </div>
    </DefaultLayout>
  )
}

export default CustomerPage