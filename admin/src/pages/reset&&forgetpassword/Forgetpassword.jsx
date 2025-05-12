import React, { useState, useContext } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from "../../context/AdminContext";
export const Forgetpassword = () => {

    const [email, setEmail] = useState("")
    const [resetpassword, setresetpassword] = useState(false)
    const { setForreset, forreset } = useContext(AdminContext);

    const navigate = useNavigate();

    const onClickHandler = async (event) => {
        event.preventDefault();
        try {

            let response = await axios.post("http://localhost:7000/api/v1.0.0/users/forgotPassword", {
                email: email
            })

            console.log(response.data.url)
            const url = response.data.url;
            const parts = url.split('/');
            console.log(parts)
            const lastPart = parts[parts.length - 1];
            console.log(lastPart);
            localStorage.setItem("resetToken", lastPart)
            setresetpassword(true)
            setForreset(true)
            navigate("/resetpassword")
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

    return (
        <>
            {!resetpassword ? (
                <>  <div className="w-full">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="border border-[#DADADA] rounded w-full p-2 mt-1"
                        type="email"

                    />
                </div>
                    <button onClick={onClickHandler} className="bg-primary text-white w-full py-2 rounded-md text-base">
                        Send Reset Link
                    </button></>
            ) :
                (<p>Email</p>)


            }

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
        </>

    )
}

