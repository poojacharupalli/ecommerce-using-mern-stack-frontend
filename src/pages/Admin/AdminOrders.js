import React, { useEffect, useState } from "react";
import Adminmenu from "../../Components/Adminmenu";
import Layout from "../../Components/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";
import { Select } from "antd";
const {Option}=Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-backend-ebon-iota.vercel.app/api/v1/auth/all-orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `https://ecommerce-backend-ebon-iota.vercel.app/api/v1/auth/order-status/${orderId}`,
        { status: value, }
      );
      getOrder();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Order Data"}>
      <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3 d-none d-md-block">
          <Adminmenu />
        </div>
        <div className="col-md-9 col-12">
          <h1 className="text-center mb-4">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow mb-4 p-3">
                <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th scope="col">Status</th>
                      {/* <th scope='col'>Buyer</th> */}
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>Success</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row flex-wrap" key={p._id}>
                      <div className="col-md-4 col-12 mb-2">
                        <img
                          src={`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/get-photo/${p}`}
                          className="card-img-top img-fluid"
                          alt={p.name}
                          style={{maxWidth:"100%",height:"auto"}}
                        />
                      </div>
                      <div className="col-md-8 col-12">
                        <p>Product Id : {p}</p>
                        <p>{p.name}</p>
                        <p>Price : ₹{p[i]}00</p>
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

export default AdminOrders;
