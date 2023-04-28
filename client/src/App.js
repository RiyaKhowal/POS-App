
import './App.css';
import 'antd/dist/reset.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
 import { Navigate } from 'react-router-dom';
 import ItemsPage from './pages/ItemsPage';
import HomePage from './pages/Homepage';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import PosRegister from './pages/PosRegister';
import PageBill from './pages/PageBill';
import CustomerPage from './pages/CustomerPage';



function App() {

  return (
    <>
    
      <BrowserRouter>
      <Routes>
       <Route path="/" element={
          < ProtectedRoute> 
       < HomePage/>
       </ ProtectedRoute> 
       } />
    
        <Route path="/items" element={
            < ProtectedRoute> 
        < ItemsPage/>
        </ ProtectedRoute> 
      } />
        <Route path = "/cart" element = {
            < ProtectedRoute> 
        <CartPage/>
        </ ProtectedRoute> 
        }/>
        <Route path = "/login"  element = {
          
        <Login/>
     
        } />
        <Route path = "/register"  element = {
            
        <PosRegister/>
      
        } />

          <Route path = "/bills"  element = {
            < ProtectedRoute> 
        <PageBill/>
        </ ProtectedRoute> 
        } />
        <Route path = "/customers"  element = {
            < ProtectedRoute> 
        <CustomerPage/>
        </ ProtectedRoute> 
        } />
      </Routes>
      </BrowserRouter>
    </>
  );
}
//CustomerPage
export function ProtectedRoute({children}){
    if(localStorage.getItem("auth")){
      return children;
    }else {
    return  <Navigate to ="/login"/>;
    //return <Navigate to="/login" />;
    }
}

export default App;
