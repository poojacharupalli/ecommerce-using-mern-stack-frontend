import React from 'react'
import Layout from '../Components/Layout'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <Layout>
      <div className="container mt-5">
        <h1 className="text-center">404</h1>
        <h2 className="text-center">Oops ! Page Not Found</h2>
        <Link to="/" className="btn">
          Go Back
        </Link>
      </div>
    </Layout>
  )
}

export default PageNotFound
