import axios from "axios";
import { useEffect, useState } from "react";
export default function useCategory(){
    const [categories,setCategories]=useState([])
    //get cat
    const getCategory=async()=>{
        try {
            const {data}=await axios.get(`https://ecommerce-backend-ebon-iota.vercel.app/api/v1/category/get-category`)
            setCategories(data?.category)
        } catch (error) {
            console.log(error)
            
        }
    }
    useEffect(()=>{
        getCategory()
    },[]);
    return categories;
}


