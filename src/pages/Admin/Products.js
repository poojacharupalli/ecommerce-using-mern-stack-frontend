import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import Adminmenu from "../../Components/Adminmenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //getAll products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/get-products"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something error occured");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3  ">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">ALL Products List</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link to={`/dashboard/admin/product/${p.slug}`}>
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
                      <h5 className="card-title ">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
