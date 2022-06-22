import React, { useState } from "react";
import Footer from "@front/Footer";
import Button from "@ui/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { api } from "@utils/api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [requesting, setRequesting] = useState(false);

  async function handleLogin(e) {
    try {
      e.preventDefault();
      setRequesting(true);
      const { data } = await api.post("/api/v1/auth/login", {
        email,
        password: Password,
      });
      Cookies.set("token", data.token, { path: "/" });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setRequesting(false);
    }
  }

  return (
    <div>
      <div className=" text-gray-800">
        <img alt="" src="/assets/images/logo.png" className="w-32 mx-auto" />
        <h4 className="text-center text-xl font-medium mb-4">Login</h4>
        <form className=" mx-4" onSubmit={handleLogin}>
          <div className="flex flex-col items-start mb-2">
            <label className="mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="p-2 rounded border border-gray-400 bg-white text-sm w-full"
            />
          </div>
          <div className="flex flex-col items-start mb-2">
            <label className="mb-1">Password</label>
            <input
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="p-2 rounded border border-gray-400 bg-white text-sm w-full"
            />
          </div>

          <Button type="submit" btnType="fill">
            {requesting ? "Please wait..." : "Signin"}
          </Button>
          <p className="text-sm text-center my-4 text-gray-500 ">
            Do not have account ?{" "}
            <Link to="/register" className="underline">
              Register
            </Link>{" "}
            instead.
          </p>
        </form>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
