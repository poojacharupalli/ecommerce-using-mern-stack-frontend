import React from 'react'
import Layout from '../Components/Layout'
import { toast } from 'react-toastify'
import { useNavigate} from "react-router";
import { useState } from 'react'
import axios from 'axios';
const ForgotPassword = () => {
  const [email,setEmail]=useState("");
  const [password,newPassword]=useState("");
  const [answer,setAnswer]=useState(""); 
  const navigate=useNavigate()
  //form 
const handleSubmit= async (e)=>{
  e.preventDefault(); 
  try {
    const res=await axios.put('https://ecommerce-backend-ebon-iota.vercel.app/api/v1/auth/forgotpassword',{email,password,answer});
    if(res.data.success){
      toast.success(res.data.message );
      navigate("/Login")
    }
    // https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/product-category
    else{
      toast.error(res.data.message)
      // navigate("/login") 
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong")

  }
}

  return (
    <Layout title={"Forgot Password"}>
      <div className="register">
        <h1>Forgot Password</h1>
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
             New Password
            </label>
            <input
              type="password"
              className="form-control"
              aria-describedby="emailHelp"
              value={password}
              onChange={(e)=>{newPassword(e.target.value)}}
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" id='2' className="form-label">
             Favouite Sport
            </label>
            <input
              type="password"
              className="form-control"
              aria-describedby="emailHelp"
              value={answer}
              onChange={(e)=>{setAnswer(e.target.value)}}
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className='mb-3'>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
          </div>
          
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
