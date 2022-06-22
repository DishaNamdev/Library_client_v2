import Cookies from "js-cookie";
import React, { useReducer } from "react";
import { api, getToken } from "../utils/api";
import { useNavigate } from "react-router-dom";
export const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      return { ...state, ...action.payload };
    }
    case "LOGOUT": {
      Cookies.remove("token", { path: "/" });
      return;
    }
    default: {
      return state;
    }
  }
};

export const Provider = ({ children }) => {
  const navigate = useNavigate();
  const [data, dispatch] = useReducer(reducer, {
    name: "",
    photo: "/assets/images/user.png",
    role: "user",
    token: "",
    enrollment: "",
  });

  const fetchUser = async () => {
    const { data } = await api.get("/api/v1/auth/profile", {
      headers: { Authorization: getToken() },
    });

    dispatch({
      type: "SET_USER",
      payload: {
        ...data.user,
        photo: data.user.photo || "/assets/images/user.png",
      },
    });
  };

  const setUser = (data) => {
    dispatch({ type: "SET_USER", payload: data });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <Context.Provider value={{ ...data, fetchUser, setUser, logout }}>
      {children}
    </Context.Provider>
  );
};
