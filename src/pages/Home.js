import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import axios from "axios";

import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
import { useNavigate } from "react-router";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const Home = () => {
  const [cart,setCart]=useCart()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //getTotal
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //Get categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-backend-ebon-iota.vercel.app/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/product-list/1`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  //filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Products"}>
      <div className="row ">
        <div className="col-md-2"> 
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>  
          <h4 className='text-center'>Filter By Prices</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={e=>setRadio(e.target.value)}>

                {Prices?.map((p)=>(
                  <div key={(p._id)}>
                    <Radio value={p.array}>{p.name}</Radio>

                  </div>
                ))}

            </Radio.Group>

          </div> 
          <div className="d-flex flex-column mt-4">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTER
            </button> 
          </div> 
        </div> 

        <div className="col-md-9">
          {/* {JSON.stringify(checked,null,4)}
          {JSON.stringify(radio,null,4)} */}
          {/* {total} */}
          <h1 className="text-center">All Products {`(${total})`}</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div
                className="card m-2 "
                style={{ width: "18rem" }}
                key={p.name}
              >
                <img
                  src={`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/get-photo/${p._id}`}
                  className="card-img-top"
                  key={p._id}
                  alt={p.name}
                  width={300}
                  height={350}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">₹{p.price} </p>
                  <button
                    className="btn btn-danger ms-1"
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                    }}
                  >
                    More Details
                  </button>
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
      </div>
    </Layout>
  );
};

export default Home;
