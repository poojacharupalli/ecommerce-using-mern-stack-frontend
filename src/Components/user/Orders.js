import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import UserMenu from "./UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";
// import moment from "moment/moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);
  return (
    <Layout title={"Your Oders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th scope="col">Status</th>
                        {/* <td scope='col'>Buyer</td> */}
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        {/* <td>{o?.buyer?.name}</td> */}
                       {/* <td>{moment(o?.createdAt).fromNow()}</td> */}
                        <td>Success</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                  {o?.products?.map((product, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={product._id}>
                        <div className="col-md-4">
                          <img
                            src={`http://localhost:8080/api/v1/product/get-photo/${product}`}
                            className="card-img-top"
                            alt={product.name}
                            width="300px"
                            height={"300px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{i+1}</p>
                          <p>product id: {product}</p>
                          <p>Price : ₹{product[i]}00</p>
                        </div>
                      </div>
                    //  console.log(p)  
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
