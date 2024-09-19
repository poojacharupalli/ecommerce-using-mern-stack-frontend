import React from 'react'
import Layout from '../Components/Layout'
import UserMenu from '../Components/user/UserMenu'
import { useAuth } from '../context/Auth'

const Dashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={"User Dashboard"}>
      <div className="container-fluid p-3 m-3"></div>
      <div className='row'>
        <div className="col-md-3">
          <UserMenu/>
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h3>User Name : {auth?.user?.name}</h3>
            <h3>User Email : {auth?.user?.email}</h3>
            <h3>User Contact :{auth?.user?.phone}</h3>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
