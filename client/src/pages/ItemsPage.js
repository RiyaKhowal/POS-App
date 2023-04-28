import React, { useEffect,useState } from 'react'
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import {  Table,Button, Modal ,Form,Input,Select, message} from 'antd';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const { Option } = Select;
 
const ItemsPage = () => {
  const dispatch = useDispatch();
  const [PopupModal , setPopupModal] = useState(false);
  const [itemsData,setItemsData] = useState([]);
  const [EditItem , setEditItem] = useState(null); 

  const getItems =  async() =>{
    try{
 const {data} = await axios.get("/api/items/get-items");
 setItemsData (data);
 //console.log(data);
    }catch(error){
     console.log(error.message);
    }
   };

  useEffect(()=>{
      
      getItems();
  },[]);

   
//record is one object value
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
    
   ,{
        title:'Action',
        dataIndex:'_id',
        render :(id,record)=>
        <div>
          <EditOutlined style ={{marginRight:15,cursor:"pointer"}}  
          onClick={()=>{
            setEditItem(record);
          setPopupModal(true);
          }} />
<DeleteOutlined style ={{cursor:"pointer"}}  onClick={()=> handleDelete(record)}/>
        </div>
        






               
    },
  ];
/*

  const handleSubmit =  async(value) =>{
    try{
 const res = await axios.post("/api/items/add-item",value);
 message.success("item added successfully");
 getItems();
 setPopupModal(false);
 //console.log(data);
    }catch(error){
      message.error("something went wrong");
     console.log(error.message);
    }
   };
   */
  
  const handleDelete = async(value)=>{
        try{
        axios.post("/api/items/delete-item",{itemId: value._id});
        getItems();
        }catch(error){
 console.log(error);
        }
  };


   const handleSubmit = async (value) => {
    console.log(value);
     if(EditItem === null){
    try {
      console.log(value);
      const res =  await axios.post("/api/items/add-item", value);
      
      message.success("Item Added Succesfully");
      getItems();
      setPopupModal(false);
    
    } catch (error) {
     
      message.error("Something Went Wrong");
      console.log(error);
    };
  }else{
    
    try {
      console.log(EditItem);
      
      await axios.put("/api/items/edit-item", {...value,itemId:EditItem._id});//sending value and id to edit
      console.log("try block");
     message.success("Item Updated Succesfully");
     getItems();
     setEditItem(null);
     setPopupModal(false);
     
   } catch (error) {
     
     message.error("Something Went Wrong");
     console.log(error);
   };
   
   
 
}
   };


   return (
    <div>
        <DefaultLayout>
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <h1><b>ItemPage</b></h1>
          <Button type="primary"  style={{marginBottom:10}} onClick={()=> setPopupModal(true)}>Add Item</Button>
           
          </div>
       
            
        <Table dataSource={itemsData} columns={columns} bordered />
 
      {PopupModal && (
        <Modal  title= {`${EditItem !== null ? "Edit item" : "Add new item"}`} 
      
         visible={PopupModal}  
         
         onCancel={()=>{
           setEditItem(null) ;
         setPopupModal(false);
        } }
          footer={false} >
        <Form layout="vertical" onFinish={handleSubmit}  initialValues={EditItem }>
        <Form.Item
      label="Name"
      name="name" >
      <Input />
    </Form.Item>

    <Form.Item
      label="Price"
      name="price" >
      <Input  type='number'/>
    </Form.Item>

    <Form.Item
      label="Quantity"
      name="quantity" >
      <Input  type='number'/>
    </Form.Item>


    <Form.Item
      label="Image"
      name="image" >
      <Input />
    </Form.Item>
    <Form.Item  name="category" label="Category">
      <Select>
        <Option value= "drinks">drinks</Option>
        <Option value= "Noodles">Noodles</Option>
        <Option value= "Rice">Rice</Option>
      </Select>
      
    </Form.Item>
    <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button></div>
        </Form>
      </Modal>
      
      )}
          </DefaultLayout>
        
    </div>
  
  );
}

export default ItemsPage