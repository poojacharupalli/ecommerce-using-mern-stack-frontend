import React from "react";
import Layout from "../../Components/Layout";
import Adminmenu from "../../Components/Adminmenu";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../Components/form/CategoryForm";
import {Modal} from 'antd'

const CreateCategory = () => {
const [name,setName]=useState("")
const [visible,setVisible]=useState(false)
const [selected,setSelected]=useState(null)
const [updatedName,setUpdatedName]=useState("")

const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const {data}=await axios.post('https://ecommerce-backend-ebon-iota.vercel.app/api/v1/category/create-category',{name})
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategory();
        
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error) 
      toast.error("Something went wrong")
    }
  }
  const [categories, setCategories] = useState([]);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://ecommerce-backend-ebon-iota.vercel.app/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
//update 
const handleUpdate=async(e)=>{

  e.preventDefault()
  try {
    const {data}=await axios.put(`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/category/update-category/${selected._id}`,{name:updatedName})
    if(data.success){
      toast.success(`${updatedName} is updated `)
      setSelected(null)
      setUpdatedName("")
      setVisible(false)
      getAllCategory()
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error("Something went wrong")
  }
}
//delete category
const handleDelete=async (pId)=>{
  
    try {
      const {data}=await axios.delete(`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/category/delete-category/${pId}`);
      if(data.success){
        toast.success(`category is deleted`)
        getAllCategory()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("error while deleting category")
    }
}
  return (
    <Layout title={"Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
            <CategoryForm handleSubmit={handleSubmit} value={name} setvalue={setName}/>
            </div>
            <div  className='w-75'>
              <table className="table ">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  
                    {categories?.map((c)=>(
                    <>
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td ><button  className="btn btn-primary ms-2" onClick={()=>{setVisible(true); setUpdatedName(c.name); setSelected(c)} }>Edit</button></td>
                      <td ><button  className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}}>Delete</button></td>
                      </tr>
                    </>
                    ))}
                   
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=>setVisible(false) } footer={null} open={visible}>
                      <CategoryForm value={updatedName} setvalue={setUpdatedName} handleSubmit={handleUpdate}  />
          </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
