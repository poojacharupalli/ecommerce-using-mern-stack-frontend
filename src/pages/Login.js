import React from 'react'
import Layout from '../Components/Layout'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate,useLocation} from "react-router";
import { useState } from 'react'
import { useAuth } from '../context/Auth';

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate()
  const location=useLocation()
  const [auth,setAuth]=useAuth()
  //form
const handleSubmit= async (e)=>{
  e.preventDefault();
  try {
    const res=await axios.post(`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/auth/login`,{email,password});
    if(res.data.success){
      toast.success(res.data.message, {position: toast.POSITION.TOP_CENTER} );
      setAuth({
        ...auth,
        user:res.data.user,
        token:res.data.token,
      });
      localStorage.setItem('auth',JSON.stringify(res.data))
      navigate(location.state || "/")
    }
    else{
      toast.error(res.data.message,{position: toast.POSITION.TOP_CENTER})
      // navigate("/login")
    }
  } catch (error) {
    console.log(error);

  }
}

  return (
    <Layout title={"Login"}>
      <div className="register">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" id='1' className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" id='2' className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              aria-describedby="emailHelp"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <button type="submit" className="btn btn-primary mb-3" >
            Login
          </button>
          <div className='mb-3'>
          <button type="button" className="btn btn-primary" onClick={()=>navigate('/forgotpassword')}>
            Forgot Password?
          </button>
          </div>
          
        </form>
      </div>
    </Layout>
  )
}

export default Login
