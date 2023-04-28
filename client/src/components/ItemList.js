import React, { useState } from 'react'
import { Card } from 'antd';

import { Button, Space } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const { Meta } = Card;

const ItemList = ({item}) => {
  const navigate  = useNavigate();
  const dispatch = useDispatch();
 // const [selectedCart,setselectedCart] = useState(false);
  const handleAddToCart = () => {
  //  /*
   
      dispatch({
        type:"AddToCart",
        payload: {...item},
       });
    
  };
  return (
    <div>
        <Card className=".card"
    hoverable
 style={{ width: 230, marginBottom:20,marginRight:20 }}
    cover={<img alt={item.name} src={item.image}   style={{ height: 200 }}/>}
  >
    <Meta style={{textAlign:'center'}} title  ={item.name}  />
    <Button style={{marginTop:30,marginLeft:30}} type="primary"  onClick={() => 
     {handleAddToCart();
     // setselectedCart(true)
    }
  }
    
      
      >Add To Cart</Button>
  </Card>
    </div>
  )
}

export default ItemList