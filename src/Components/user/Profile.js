import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import UserMenu from './UserMenu'
import { useAuth } from '../../context/Auth'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {
  const [auth,setAuth]=useAuth()
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phone,setPhone]=useState("");
  const [address,setAddress]=useState("");

//get user data
useEffect(()=>{
  if(auth?.user){
  const {email,name,phone,address,password}=auth?.user
  setName(name)
  setPhone(phone)
  setAddress(address)
  setEmail(email) 
  setPassword(password) 
  }
},[])

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.put(`http://localhost:8080/api/v1/auth/profile`,{name,email,password,phone,address});
      if(data?.error){
        toast.error(data?.error)
      }
      else{
        setAuth({...auth,user:data?.updatedUser})
        let ls=localStorage.getItem('auth')
        ls=JSON.parse(ls);
        ls.user=data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls));
        toast.success("Profile Updated Successfully",{position: toast.POSITION.TOP_CENTER})
      }
    } catch (error) {
      console.log(error);
  
    }
  }
  
  return (
<Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
          <div className="register">
        <h1>User Profile</h1>
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
              disabled
              
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
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
