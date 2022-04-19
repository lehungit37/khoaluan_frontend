import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticator } from "./../app/user_slice";
import Cookies from "js-cookie";

const useAuthAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      dispatch(authenticator(token))
        .unwrap()
        .then(() => setIsAdmin(true))
        .catch(() => {
          setIsAdmin(true);
        });
    }
  }, []);

  return isAdmin;
};

export default useAuthAdmin;
