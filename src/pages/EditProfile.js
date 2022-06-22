import React, { useState, useContext, useEffect } from "react";
import Footer from "@front/Footer";
import Button from "@ui/Button";
import { useNavigate } from "react-router-dom";
import { FilePond } from "react-filepond";
import { api, getToken } from "@utils/api";
import "filepond/dist/filepond.min.css";
import { Context as AuthContext } from "@context/authContext";

import Cookies from "js-cookie";
import toast from "react-hot-toast";

function EditProfile() {
  const userData = useContext(AuthContext);
  const navigate = useNavigate();

  const [filepondFiles, setFilepondFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState(userData.email);
  const [academicYear, setAcademicYear] = useState(userData.academicYear);
  const [branch, setBranch] = useState(userData.branch);
  const [mobile, setMobile] = useState(userData.mobile);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [requesting, setRequesting] = useState(false);

  async function handleProfileUpdate(e) {
    try {
      e.preventDefault();
      setRequesting(true);
      const { data } = await api.post(
        "/api/v1/auth/update",
        {
          email,
          academicYear,
          branch,
          mobile,
          photo: files[0]?.url || userData.photo,
        },
        {
          headers: { Authorization: getToken() },
        }
      );
      setRequesting(false);
      userData.setUser(data.user);
      navigate("/profile");
      toast.success("Profile updated");
    } catch (error) {
      console.log(error);
      toast.error("Something wrong happened!");
    }
  }

  useEffect(() => {
    if (userData.name === "") {
      userData.fetchUser();
    }
  }, []);

  return (
    <div>
      <div className=" text-gray-800">
        <img alt="" src="/assets/images/logo.png" className="w-32 mx-auto" />
        <h4 className="text-center text-xl font-medium mb-4">Profile</h4>
        <img
          src={userData.photo}
          alt="profile"
          className="h-24 w-24 mx-auto my-4 rounded-full object-cover"
        />
        <div className=" mx-4">
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
            <label className="mb-1">Mobile</label>
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              type="number"
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
          <Button onClick={handleProfileUpdate} btnType="fill">
            {requesting ? "Updating Profile..." : "Save"}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditProfile;
