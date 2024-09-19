import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout.js'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'


const CategoryProduct = () => {
    const navigate=useNavigate()
    const params=useParams()
    const [product,setProduct]=useState([])
    const [category,setCategory]=useState([])
    const getProductByCat=async()=>{
        try {
            const {data}=await axios.get(`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/product-category/${params.slug}`)
            console.log(data);
            setProduct(data?.product)
            setCategory(data?.category);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(params?.slug) getProductByCat()
    },[params?.slug])
  return (
    <Layout>
      <div className="container mt-3" >
    <h6 className='text-center'> Category - {category.name}</h6>
    <div className="row">
    <div className="col-md-9">
          {/* {JSON.stringify(checked,null,4)}
          {JSON.stringify(radio,null,4)} */}
          {/* {total} */}
          <div className="d-flex flex-wrap">
            {product?.map((p) => ( 
              <div
                className="card m-2 "
                style={{ width: "18rem" }}
                key={p._id}
              >
                <img
                  src={`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/get-photo/${p._id}`}
                  className="card-img-top"
                  width={300}
                  height={350}
                  key={p._id}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">₹{p.price}</p>
                  <button
                    className="btn btn-danger ms-1"
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                    }}
                  >
                    More Details
                  </button>
                  <button className="btn btn-primary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct
