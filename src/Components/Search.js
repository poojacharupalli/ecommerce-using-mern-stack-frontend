import React from 'react'
import Layout from './Layout'
import { useSearch } from '../context/Search'
import { useNavigate } from 'react-router';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';


const Search = () => {
    const [values,setValues]=useSearch();
    const navigate=useNavigate()
    const [cart,setCart]=useCart()
  return (
    <Layout title={"Search Results"}>
        <div className="container">
            <div className="text-center">
                <h1>Search Results</h1>
                <h6>{values?.results.length<1?'No Products Found':`Results Found ${values?.results.length}`}</h6>
                <div className="d-flex flex-wrap mt-4">
          {values?.results.map((p) => (
                 <div
                  className="card m-2 "
                  style={{ width: "18rem" }} 
                  key={p.name}
                >
                  <img src={`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/product/get-photo/${p._id}`} width={300} height={350} className="card-img-top" key={p._id} alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <p className="card-text">${p.price}</p>
                    <button className="btn btn-danger ms-1" onClick={()=>{navigate(`product/${p.slug}`)}}>More Details</button>
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
  )
}

export default Search
