import React ,{useState,useEffect}from 'react'
import DefaultLayout from './../components/DefaultLayout';
import axios from 'axios';
import { Col, Row } from 'antd';
import '.././index.css';

import ItemList from './../components/ItemList';
import { rootReducer } from './../redux/rootReducer';

const HomePage = () => {
  const [itemData,setitemData]= useState([]);
  const [selectedCategory,setSelectedCategory] = useState("drinks");
  const category = [
    {
 name :"drinks",
 image_url:"https://img.delicious.com.au/6tS9cdjX/del/2020/02/watermelon-and-gin-slushies-126036-2.jpg"
    },
    {
      name :"noodles",
      image_url:"https://www.cookwithmanali.com/wp-content/uploads/2021/08/Schezwan-Noodles.jpg"
    },
    {
      name :"rice",
      image_url:"https://www.indianveggiedelight.com/wp-content/uploads/2023/01/veg-fried-rice.jpg"
    },
    
  ];
  
  useEffect(()=>{
    const getItems = async ()=>{
      try{
        const {data} = await axios.get("/api/items/get-items");  
        setitemData(data);
        console.log(data);
      } catch(error){
        console.log(error);
      }
           
    };
    getItems()
  },[]
  
  
  );

  
  return (

    <>
<DefaultLayout>
  <div className="category">
   {category.map((category) => (
    
      <div key = {category.name}
      className={`itemCategory ${selectedCategory === category.name  && "itemCategory-active"}`} 
      onClick={()=>setSelectedCategory(category.name)}>
        <h2>{category.name}</h2>
      <img src={category.image_url} alt={category.name} height="60" width="60"/> 
       
      
      </div>
     
    ))
    
   }
  </div>

  








<Row>
  {
           
        itemData.filter((categoryItem)=> selectedCategory === categoryItem.category).map(item =>(
          <Col xs={24} sm={6} lg={6} md={12}>
                <ItemList item = {item}/>
        
        </Col>   
        ))
      
}
    </Row>
</DefaultLayout>

    
    </>
  )
}

export default HomePage