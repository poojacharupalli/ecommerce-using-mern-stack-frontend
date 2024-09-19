import React from "react";
import Layout from "../Components/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import '../App.css'; // Make sure to import the CSS file

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row justify-content-center">
          {categories.map((c) => (
            <div className="col-md-6 col-lg-4 mt-5 gx-3 gy-3 d-flex justify-content-center" key={c._id}>
              <button className="btn btn-primary text-light">
                <Link to={`/category/${c.slug}`} className="text-light text-decoration-none">{c.name}</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
