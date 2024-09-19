import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [cart,setCart]=useCart()
  const navigate = useNavigate();

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/get-products/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category);
    } catch (error) {
      console.log(error);
    }
  };

  //get Similar
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelated(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/get-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>

          <h4>Name: {product.name || "N/A"}</h4>
          <h4>Description: {product.description || "N/A"}</h4>
          <h4>Price: {product.price || "N/A"}</h4>
          <h4>Category: {product.category ? product.category.name : "N/A"}</h4>
          <h4>Shipping: {product.shipping || "N/A"}</h4>

          <button className="btn btn-primary ms-1"
                  onClick={()=>{setCart([...cart,product])
                   localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart,product])
                   );
                    toast.success("Item added to Cart", {position: toast.POSITION.TOP_CENTER})
                  }}>
                    ADD TO CART</button>
        </div>
      </div>
      <div className="row md-3">
        <div className="d-flex flex-wrap">
          {related?.map((p) => (
            <div className="card m-2 " style={{ width: "18rem" }} key={p.name}>
              <img
                src={`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/get-photo/${p._id}`}
                className="card-img-top"
                key={p._id}
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text">${p.price}</p>
                <button className="btn btn-primary ms-1"
                  onClick={()=>{setCart([...cart,p])
                   localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart,p])
                   );
                    toast.success("Item added to Cart", {position: toast.POSITION.TOP_CENTER})
                  }}>
                    ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
