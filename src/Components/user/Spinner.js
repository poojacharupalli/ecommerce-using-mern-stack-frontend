import React from "react";
import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Layout from "../Layout";

const Spinner = ({path='login'}) => {
    const navigate=useNavigate()
    const [count,setCount]=useState(4);
    const location=useLocation();
    useEffect(()=>{
        const interval=setInterval(()=>{
            setCount((prevValue)=>--prevValue);
        },1000)
        count===0 && navigate(`/${path}`,{
            state:location.pathname, 
        })
        return ()=>clearInterval(interval)
    },[count,navigate,location,path])
  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center">
        <h1 className="text-center">Redirecting to you in {count}</h1>
        <div className="spinner-border " role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </Layout>
  );
};

export default Spinner;
