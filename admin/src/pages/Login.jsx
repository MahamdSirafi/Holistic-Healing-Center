import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './reset&&forgetpassword/Forgetpassword'
import { Forgetpassword } from "./reset&&forgetpassword/Forgetpassword";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetpassword, setresetpassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // New state for handling forgot password
  const { setAToken, state, setState } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext)
  // login
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (state == "Admin") {
      // console.log(password, email)
      try {
        let responce = await axios.post(`http://localhost:7000/api/v1.0.0/users/login`, {
          email: email,
          password: password
        });

        localStorage.setItem("Admintoken", responce.data.token)
        console.log(responce.data)
        setAToken(responce.data.token);


      }
      catch (err) {

        const notify = () => {

          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

        }
        notify()
      }
    }
    else {
      try {
        let responce = await axios.post(`http://localhost:7000/api/v1.0.0/users/login`, {
          email: email,
          password: password
        });

        localStorage.setItem("Doctortoken", responce.data.token)
        console.log(responce.data)
        setDToken(responce.data.token);


      }
      catch (err) {

        const notify = () => {

          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

        }
        notify()
      }
    }
  };
  // forget password




  return (

    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-x1 text-[#5e5e5e] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">

          <span className="text-primary"> {state} </span>{" "}
          {isForgotPassword ? "Forgot Password" : "Login"}
        </p>

        {!isForgotPassword ? (
          <>
            <div className="w-full">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="email"
                required
              />
            </div>
            <div className="w-full">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="password"
                required
              />
            </div>
            <button className="bg-primary text-white w-full py-2 rounded-md text-base">
              Login
            </button>
            <p
              className="text-primary underline cursor-pointer"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot Password?
            </p>
          </>
        ) : (
          <>
            <Forgetpassword></Forgetpassword>
            <p
              className="text-primary underline cursor-pointer"
              onClick={() => setIsForgotPassword(false)}
            >
              Back to Login
            </p></>

        )}

        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce />
    </form>
  );
};

export default Login;
