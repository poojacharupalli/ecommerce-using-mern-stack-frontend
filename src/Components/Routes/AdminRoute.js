import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router";
import axios from "axios";
import Spinner from "../user/Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("https://ecommerce-backend-ebon-iota.vercel.app/api/v1/auth/admin-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path=""/>;
}