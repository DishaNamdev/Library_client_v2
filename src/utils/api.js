import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({ baseURL: process.env.REACT_APP_SERVER });

export const getToken = () => {
  return Cookies.get("token");
};
