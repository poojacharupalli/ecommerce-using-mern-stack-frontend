import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
import { useNavigate } from "react-router";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";

const Home = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen); // Toggle filter window visibility
  };

  // Get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Get categories
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

  // Get products
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

  // Handle filters
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
    getAllCategory();
    getTotal();
    getAllProducts(); // Initial load of products
    setInitialLoad(false); // Set initialLoad to false after first load
  }, []);

  useEffect(() => {
    if (!initialLoad && (checked.length || radio.length)) {
      filterProduct();
    }
  }, [checked, radio]);

  // Filter products
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
    <>
      {loading ? (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
          <Spinner />
          <p className="mt-3">Loading products, please wait...</p>
        </div>
      ) : (
        <Layout title={"All Products"}>
          <div className="row">
            {/* Filter Section for Desktop */}
            <div className="col-md-2 d-none d-md-block">
              <h4 className="text-center">Filter By Category</h4>
              <div className="filter-container d-flex flex-column">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}

                <h4 className="text-center mt-3">Filter By Prices</h4>
                <div className="d-flex flex-column">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Prices?.map((p) => (
                      <div key={p._id}>
                        <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="d-md-none text-center">
              <button
                className="btn btn-primary mt-4"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#filterOffcanvas"
                aria-controls="filterOffcanvas"
              >
                Open Filters
              </button>
            </div>

            {/* Offcanvas Filter for Mobile */}
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="filterOffcanvas"
              aria-labelledby="filterOffcanvasLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="filterOffcanvasLabel">
                  Filters
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <h4 className="text-center">Filter By Category</h4>
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}

                <h4 className="text-center mt-3">Filter By Prices</h4>
                <div className="d-flex flex-column">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Prices?.map((p) => (
                      <div key={p._id}>
                        <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              </div>
            </div>

            <div className="col-md-10">
              <h1 className="text-center">All Products {`(${total})`}</h1>
              <div className="d-flex flex-wrap justify-content-center">
                {products?.map((p) => (
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={p._id}
                  >
                    <img
                      src={`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/get-photo/${p._id}`}
                      className="card-img-top"
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
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            navigate(`/product/${p.slug}`);
                          }}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item added to Cart", {
                              position: toast.POSITION.TOP_CENTER,
                            });
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Home;
