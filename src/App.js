import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/product/ProductDetail';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import ProtectedRoute from './components/route/ProtectedRoute'
import ProfileUpdate from './components/user/ProfileUpdate';
import Profile from './components/user/Profile';
import store from './store';
import { loadUser } from './actions/userActions';
import { useEffect, useState } from 'react';
import PasswordUpdate from './components/user/PasswordUpdate';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import axios from 'axios';
import { Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SuccessOrder from './components/cart/SuccessOrder';
import UserOrders from './components/order/UserOrders';
import OrderDetails from './components/order/OrderDetails';
import DashBoard from './components/admin/DashBoard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import ReviewList from './components/admin/ReviewList';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';

function App() {


  const [stripeApiKey, setStripeApiKey] = useState("")

  useEffect(()=>{
    store.dispatch(loadUser)
    async function getStripeApiKey(){

      const {data}=await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])

  return (
    <Router>
      <div className="App">
        <HelmetProvider>
            <Header/>
                <div className='container container-fluid'>
                  <ToastContainer theme='dark' />
                  <Routes>
                      <Route path='/' element={<Home/>} />
                      <Route path='/search/:keyword' element={<ProductSearch/>} />
                      <Route path='/products/:id' element={<ProductDetail/>} />
                      <Route path='/login' element={<Login/>} />
                      <Route path='/register' element={<Register/>} />
                      <Route path='/password/forgot' element={<ForgotPassword/>} />
                      <Route path='/password/reset/:token' element={<ResetPassword/>} />
                      <Route path='/myProfile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
                      <Route path='/myProfile/editProfile' element={<ProtectedRoute><ProfileUpdate/></ProtectedRoute>} />
                      <Route path='/myProfile/update/password' element={<ProtectedRoute><PasswordUpdate/></ProtectedRoute>} />
                      <Route path='/cart' element={<Cart/>} />
                      <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>
                      <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
                      <Route path='/order/success' element={<ProtectedRoute><SuccessOrder/></ProtectedRoute>}/>
                      <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute>}/>
                      <Route path='/order/:key' element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
                      {stripeApiKey &&   
                      <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute>}/>
                       } 

                      
                  </Routes>
                </div>
                <Routes>
                  <Route path='/admin/dashboard' element={<ProtectedRoute><DashBoard/></ProtectedRoute>}/>
                  <Route path='/admin/products' element={<ProtectedRoute><ProductList/></ProtectedRoute>}/>
                  <Route path='/admin/products/new' element={<ProtectedRoute><NewProduct/></ProtectedRoute>}/>
                  <Route path='/admin/product/:id' element={<ProtectedRoute><UpdateProduct/></ProtectedRoute>}/>
                  <Route path='/admin/orders' element={<ProtectedRoute><OrderList/></ProtectedRoute>}/>
                  <Route path='/admin/updateorder/:id' element={<ProtectedRoute><UpdateOrder/></ProtectedRoute>}/>
                  <Route path='/admin/reviews' element={<ProtectedRoute><ReviewList/></ProtectedRoute>}/>
                  <Route path='/admin/users' element={<ProtectedRoute><UsersList/></ProtectedRoute>}/>
                  <Route path='/admin/user/:id' element={<ProtectedRoute><UpdateUser/></ProtectedRoute>}/>
                </Routes>
            <Footer/>
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;