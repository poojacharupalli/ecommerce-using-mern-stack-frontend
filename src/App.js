
import { Routes,Route} from "react-router-dom";
import Home from './pages/Home.js'
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import PageNotFound from "./pages/PageNotFound.js";
import Login from "./pages/Login.js";
import './App.css'
import Dashboard from "./pages/dashboard.js";
import Register from "./Components/Register.js";
import Privacypolicy from './pages/Privacypolicy';
import PrivateRoute from "./Components/Routes/Private.js";
import ForgotPassword from "./pages/forgotPassword.js";
import AdminDashboard from './pages/Admin/AdminDashboard.js'
import AdminRoute from './Components/Routes/AdminRoute.js'
import CreateCategory from "./pages/Admin/CreateCategory.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";
import Users from "./pages/Admin/Users.js";
import Orders from "./Components/user/Orders.js";
import Profile from "./Components/user/Profile.js";
import Products from "./pages/Admin/Products.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import Search from "./Components/Search.js";
import ProductDetails from "./Components/ProductDetails.js";
import Categories from "./pages/Categories.js";
import CategoryProduct from "./pages/CategoryProduct.js";
import CartPage from "./pages/CartPage.js";
import AdminOrders from "./pages/Admin/AdminOrders.js";
// import 'antd/dist/reset.css';
function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/Cart' element={<CartPage/>}/>
          <Route path='/category/:slug' element={<CategoryProduct/>}/>
          <Route path='/product/:slug' element={<ProductDetails/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/search/product/:slug' element={<ProductDetails/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard/>}/>
          <Route path="user/orders" element={<Orders/>}/>
          <Route path="user/profile" element={<Profile/>}/>
          </Route>
          <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard/>}/>
          <Route path="admin/create-category" element={<CreateCategory/>}/>
          <Route path="admin/create-product" element={<CreateProduct/>}/>
          <Route path="admin/products" element={<Products/>}/>
          <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
          <Route path="admin/users" element={<Users/>}/>
          <Route path="admin/orders" element={<AdminOrders/>}/>
          </Route>  
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path='/privacypolicy' element={<Privacypolicy/>}/>
          <Route path='*' element={<PageNotFound/>}></Route>
      </Routes>
    </>
  );
}

export default App;
