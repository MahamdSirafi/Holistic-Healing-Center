import React, { useState, useContext } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AdminContext } from "../../context/AdminContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Repassword = () => {

    const [confirmpassword, setConfirmpassword] = useState("")
    const [password, setPassword] = useState("")
    const [accept, setaccept] = useState(false)
    const navigate = useNavigate();
    const { setAToken, state, setState } = useContext(AdminContext);
    let token = localStorage.getItem("resetToken")
    console.log(token)

    const notify = () => {
        toast.success('The password has been reset successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",


        });
        setTimeout(() => {
            navigate("/")
            window.location.reload()

        }, 4000)
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setaccept(true)
        if (password != confirmpassword) {
            return
        } else {
            try {
                let response = await axios.patch(`http://localhost:7000/api/v1.0.0/users/resetPassword/${token}`, {
                    password: password
                })
                console.log(response)
                notify()
            }

            catch {

            }
        }

    }
    return (
        <div>

            <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
                <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-x1 text-[#5e5e5e] text-sm shadow-lg">
                    <p className="text-2xl font-semibold m-auto">

                        <p >
                            <span className="text-primary"> {state} </span>{" "} Reset password</p>

                    </p>



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
                    <div className="w-full">
                        <p> Confirm Password</p>
                        <input
                            onChange={(e) => setConfirmpassword(e.target.value)}
                            value={confirmpassword}
                            className="border border-[#DADADA] rounded w-full p-2 mt-1"
                            type="password"
                            required
                        />
                    </div>
                    {password !== confirmpassword && accept
                        && <p style={{ color: 'red' }}>Password Does Not Match</p>
                    }
                    <button className="bg-primary text-white w-full py-2 rounded-md text-base">
                        Reset Password
                    </button>
                </div>
            </form >
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

        </div >
    )

}

export default Repassword;
