import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom"
const MedicalRecord = () => {
    const navigate = useNavigate()
    const [record, setRecord] = useState({
        symptoms: '',
        diagnosis: '',
        recipe: {
            name: '',
            count: '',
            details: '',
        },
        department: '',
    });
    const { id } = useParams();
    console.log(id)


    const notify = () => {

        toast.success('Added Successfully', {
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
            navigate("/doctor-appointments")
        }, 4000)
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in record.recipe) {
            setRecord({ ...record, recipe: { ...record.recipe, [name]: value } });
        } else {
            setRecord({ ...record, [name]: value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post(
                'http://localhost:7000/api/v1.0.0/recourds',
                {
                    dateId: id,
                    symptoms: record.symptoms,
                    diagnosis: record.diagnosis,
                    recipe: {
                        name: record.recipe.name,
                        count: record.recipe.count,
                        details: record.recipe.details
                    },
                    department: record.department
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("Doctortoken")}`,
                    },
                }
            );

            notify(); // نجاح الإرسال
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong", {
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
    };


    return (

        <form onSubmit={handleSubmit} className="space-y-5 text-sm text-gray-700">
            <div>
                <label className="block mb-1 font-medium">Symptoms</label>
                <input
                    type="text"
                    name="symptoms"
                    value={record.symptoms}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter symptoms"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Diagnosis</label>
                <input
                    type="text"
                    name="diagnosis"
                    value={record.diagnosis}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter diagnosis"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block mb-1 font-medium">Medication Name</label>
                    <input
                        type="text"
                        name="name"
                        value={record.recipe.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Medication"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Count</label>
                    <input
                        type="text"
                        name="count"
                        value={record.recipe.count}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="e.g. 2x/day"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Details</label>
                    <input
                        type="text"
                        name="details"
                        value={record.recipe.details}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="How to take it"
                    />
                </div>
            </div>

            <div>
                <label className="block mb-1 font-medium">Department</label>
                <input
                    type="text"
                    name="department"
                    value={record.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g. Cardiology"
                />
            </div>

            <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
                Save Record
            </button>
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

export default MedicalRecord;
