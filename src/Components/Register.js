import React, { useState } from "react";
import Layout from "../Components/Layout";
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router";

const Register = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phone,setPhone]=useState("");
  const [address,setAddress]=useState("");
  const [answer,setAnswer]=useState("");
  const navigate=useNavigate();

  //form
const handleSubmit= async (e)=>{
  e.preventDefault();
  try {
    const res=await axios.post(`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/auth/register`,{name,email,password,phone,address,answer});
    if(res.data.success){
      toast.success(res.data.message,{position: toast.POSITION.TOP_CENTER});
      navigate("/login")
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
    <Layout title={"Register"}>
      <div className="register">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label htmlFor="exampleInputEmail1" id='3' className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInputEmail1" id='4'className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInputEmail1" id='5' className="form-label">
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
          <div className="mb-1">
            <label htmlFor="exampleInputphone"id='6' className="form-label">
              Phone
            </label>
            <input
              type="phone"
              className="form-control"
              aria-describedby="emailHelp"
              value={phone}
              onChange={(e)=>{setPhone(e.target.value)}}
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInputEmail1" id='7' className="form-label">
              Address
            </label>
            <input
              type="address"
              className="form-control"
              aria-describedby="emailHelp"
              value={address}
              onChange={(e)=>{setAddress(e.target.value)}}
            />

          </div>
          <div className="mb-1">
            <label htmlFor="exampleInputEmail1" id='8' className="form-label">
              Favourite Sport
            </label>
            <input
              type="address"
              className="form-control"
              aria-describedby="emailHelp"
              value={answer}
              onChange={(e)=>{setAnswer(e.target.value)}}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
