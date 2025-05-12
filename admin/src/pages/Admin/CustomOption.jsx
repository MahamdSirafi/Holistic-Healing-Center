
import React, { useState, useEffect } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const CustomOption = ({ onOptionClick }) => {
    const [specialities, setSpecialities] = useState([]);
    const [Specialityid, setSpecialityid] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const notify = () => {
        toast.success('Deleted Successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",


        });
    }
    const fetchSpecialities = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/v1.0.0/departments',
                {
                    headers: {
                        Authorization: `  Bearer ${localStorage.getItem("Admintoken")}`,
                    },
                }
            );
            setSpecialities(response.data.doc);
        } catch (error) {
            console.error('Error fetching specialities:', error);
        }
    };
    useEffect(() => {
        fetchSpecialities();
    }, []);

    const onDelete = async (id, event) => {
        event.preventDefault()
        try {
            const response = await axios.delete(`http://localhost:7000/api/v1.0.0/departments/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("Admintoken")}` } })
            fetchSpecialities()
            notify()
        }

        catch (err) {
            console.log(err)
        }


    }
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div onClick={toggleDropdown} style={{ border: '1px solid #ccc', padding: '17px', cursor: 'pointer' }}>
                
            </div>
            {isOpen && (
                <ul style={{ border: '1px solid #ccc', listStyleType: 'none', padding: 0 }}>
                    {specialities.map((option) => (
                        <li onClick={() => onOptionClick(option)} key={option._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', cursor: 'pointer' }}>
                            <span>{option.name}</span>
                            <button className=" ml-4  text-red-500 hover:text-red-700 text-xl " >
                                <AiOutlineDelete onClick={() => { onDelete(option._id, event) }} className="" />
                            </button>
                        </li>
                    ))}

                </ul>
            )}
            <ToastContainer position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce />
        </div>
    );
};

export default CustomOption