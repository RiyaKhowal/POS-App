import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  ShoppingCartOutlined
  

} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Navigate } from 'react-router-dom';

import './DefaultLayout.css'
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { rootReducer } from './../redux/rootReducer';
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({children}) => {
  const {cartItems} = useSelector(state=> state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
  },[cartItems]);

  const toggle =() =>{
    setCollapsed(
      !collapsed
    );
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();
 
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
            <h1  style={{textAlign : 'center', color : 'white',marginTop:"3"}}>POS</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
          
  
        <Menu.Item key="/" icon={<UserOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/bills" icon={<CopyOutlined />}>
              <Link to="/bills">Bills</Link>
            </Menu.Item>
            <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
              <Link to="/items">Items</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserOutlined />}>
              <Link to="/customers">Cutomers</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined />} 
            /*
            onClick= {()=>{
           localStorage.removeItem("auth"),
           navigate("/login")
            } }>
            */
            onClick={() => {
              localStorage.removeItem("auth");
              //navigate("/login");
              <Navigate to ="/login"/>
            }}
           >
              Logout
            </Menu.Item>
            </Menu>
      </Sider>
      <Layout className="site-layout">
      
        <Header style={{ padding: 0, background: colorBgContainer }}>
       
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}

       <div className="cartItems" onClick={() => navigate("/cart")}>
       <p ><b>{cartItems.length}</b></p>
       <ShoppingCartOutlined style={{size:950}} /> 
       </div>
          
        </Header>
       
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
         
          {children} 
        </Content>
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;