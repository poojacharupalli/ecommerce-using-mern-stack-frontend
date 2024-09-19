import React from 'react';
import Layout from '../Components/Layout';
import { Link } from 'react-router-dom';
import '../App.css'
const PageNotFound = () => {
  return (
    <Layout>
      <div className="container mt-5 text-center">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
