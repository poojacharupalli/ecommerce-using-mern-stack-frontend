import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import Spinner from '../Components/Spinner';
import { Header } from 'antd/es/layout/layout';

const CategoryProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading,setLoading]=useState(false);

    const getProductByCat = async () => {
        try {
          setLoading(true)
            const { data } = await axios.get(`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/product-category/${params.slug}`);
            setProduct(data?.product);
            setCategory(data?.category);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params?.slug) getProductByCat();
    }, [params?.slug]);

    return (
      <>
      {loading ? (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
          <Spinner />
          <p className="mt-3">Loading products, please wait...</p>
        </div> 
      ) : (
        <Layout>
            <div className="container mt-3">
                <h6 className='text-center'>Category - {category.name}</h6>
                <div className="row justify-content-center">
                    {/* Centering product cards */}
                    <div className="col-md-9">
                        <div className="d-flex flex-wrap justify-content-center">
                            {product?.map((p) => (
                                <div
                                    className="card m-2"
                                    style={{ width: "18rem" }}
                                    key={p._id}
                                >
                                    <img
                                        src={`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/get-photo/${p._id}`}
                                        className="card-img-top"
                                        width={300}
                                        height={350}
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description.substring(0, 30)}...
                                        </p>
                                        <p className="card-text">₹{p.price}</p>
                                        <div className="d-flex justify-content-between">
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => {
                                                    navigate(`/product/${p.slug}`);
                                                }}
                                            >
                                                More Details
                                            </button>
                                            <button className="btn btn-primary btn-sm">
                                                ADD TO CART
                                            </button>
                                        </div>
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
      </>
    );
};

export default CategoryProduct;
