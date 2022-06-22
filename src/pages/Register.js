import React, { useState, useContext } from "react";
import Footer from "@front/Footer";
import Button from "@ui/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FilePond } from "react-filepond";
import { api } from "@utils/api";
import "filepond/dist/filepond.min.css";
import { Context as AuthContext } from "@context/authContext";

import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Register() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [filepondFiles, setFilepondFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [branch, setBranch] = useState("");
  const [enrollment, setEnrollment] = useState("");

  async function handleSignup(e) {
    try {
      e.preventDefault();
      const { data } = await api.post("/api/v1/auth/signup", {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
        enrollment,
        academicYear,
        branch,
        photo: files[0]?.url || "",
      });
      Cookies.set("token", data.token, { path: "/" });
      setUser(data.user);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <div>
      <div className=" text-gray-800">
        <img alt="" src="/assets/images/logo.png" className="w-32 mx-auto" />
        <h4 className="text-center text-xl font-medium mb-4">Register</h4>
        <div className=" mx-4">
          <div className="flex flex-col items-start mb-2">
            <label className="mb-1 "> Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="p-2 rounded border border-gray-400 bg-white text-sm w-full"
            />
          </div>
          <div className="flex flex-col items-start mb-2">
            <label className="mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="p-2 rounded border border-gray-400 bg-white text-sm w-full"
            />
          </div>

          <div className="flex flex-col items-start mb-2">
            <label className="mb-1">Enrollment</label>
            <input
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              type="text"
              className="p-2 rounded border border-gray-400 bg-white text-sm w-full"
            />
          </div>
          <div className="flex flex-col items-start mb-2">
            <label className="mb-1">Branch</label>
            <input
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              type="text"
              className="p-2 rounded border border-gray-400 bg-white text-sm w-full"
            />
          </div>
          <div className="flex flex-col items-start mb-2">
            <label className="mb-1">Academic Year</label>
            <input
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              type="number"
              maxLength={1}
              className="p-2 rounded border border-gray-400 bg-white text-sm w-full"
            />
          </div>
          <div className="flex flex-col items-start mb-2">
            <label className="mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="p-2 rounded border border-gray-400 bg-white text-sm w-full"
            />
          </div>
          <div className="flex flex-col items-start mb-2">
            <label className="mb-1">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              type="text"
              className="p-2 rounded border border-gray-400 bg-white text-sm w-full"
            />
          </div>
          <div className=" h-44 w-full  mb-2">
            <label className="mb-1">Profile Photo</label>
            <FilePond
              files={filepondFiles}
              onupdatefiles={setFilepondFiles}
              allowMultiple={false}
              maxFiles={1}
              server={{
                url: `${process.env.REACT_APP_SERVER}/api/v1/utils/upload`,
                process: {
                  headers: {
                    authorization: Cookies.get("token"),
                  },
                  onload: (response) => {
                    const res = JSON.parse(response);
                    setFiles([...files, { url: res.url, id: res.id }]);
                  },
                  onerror: (err) => {
                    console.log(err);
                  },
                },
              }}
              name="file"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
          </div>
          <Button onClick={handleSignup} btnType="fill">
            Signup
          </Button>
          <p className="text-sm text-center my-4 text-gray-500 ">
            Already have account ?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>{" "}
            instead.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
