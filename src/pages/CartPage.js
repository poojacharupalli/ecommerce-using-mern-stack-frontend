import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router";
import { useAuth } from "../context/Auth";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += parseFloat(item.price);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart
                    ${auth?.token ? "" : "please login to checkout"}`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-12">
            {cart?.length ? (
              cart?.map((p) => (
                <div className="row mb-2 card flex-column flex-sm-row" key={p._id}>
                  <div className="col-md-4 col-12 mb-2">
                    <img
                      src={`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/get-photo/${p._id}`}
                      className="card-img-top img-fluid"
                      alt={p.name}
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="col-md-8 col-12">
                    <p><strong>{p.name}</strong></p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p><strong>Price:</strong> {p.price}</p>
                    <div className="text-center"> {/* Center the button */}
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mt-4">
                <p>Your cart is empty. You can browse our products and start shopping!</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate("/")}
                >
                  Shop Now
                </button>
              </div>
            )}
          </div>

          {cart?.length ? (
            <div className="col-md-4 col-12 text-center">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>
              {auth?.user?.address ? (
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        // paypal: {
                        //   flow: "vault",
                        // },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
