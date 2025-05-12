// src/DoctorSection.jsx
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"

const AddSection = () => {
  const [section, setSection] = useState({
    name: "",
    // image: "",
    price: 0,
    duration: 0, // حقل جديد لتحديد مدة المعاينة
    reviewPercentage: 0, // حقل جديد لتحديد نسبة المراجعة
    rateForDoctor: 0// مشان نسبة ربح الطبيب من القسم 
  });
 const navigate = useNavigate()
  const handleChange = (e) => {

    const name = e.target.name;
    const value = e.target.value

    setSection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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
      navigate("/")
    }, 4000)
  }


  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSection((prev) => ({
  //         ...prev,
  //         image: reader.result,
  //       }));
  //     };
  //     reader.readAsDataURL(file); // فك التعليق عن هذه السطر لقراءة الصورة
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("joud")
    try {
      const responce = await axios.post(`http://localhost:7000/api/v1.0.0/departments`, {
        name: section.name,
        price: section.price,
        rate: section.duration,
        rateForReview: section.reviewPercentage,
        rateForDoctor: section.rateForDoctor



      }, {
        headers: {
          Authorization: `  Bearer ${localStorage.getItem("Admintoken")}`,
        },
      }
      );
      notify()
      console.log(responce)
    }

    catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex flex-col justify-start min-h-screen m-5 w-full ">
      <p className="mb-3 text-lg font-medium"> Add a medical section</p>
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-md font-medium text-gray-700">
              Section Name
            </label>
            <input
              type="text"
              name="name"
              value={section.name}
              placeholder=" name"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full mt-2 text-gray-600  focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-md font-medium text-gray-700">
              Section Price
            </label>
            <input
              type="number"
              name="price"
              value={section.price}
              placeholder=" price"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full mt-2 text-gray-600  focus:outline-none focus:border-indigo-500"
              required

            />
          </div>
          <div>
            <label className="block mb-2 text-md font-medium text-gray-700 mr-2">
              Section Duration (%)
            </label>
            <input
              type="number"
              name="duration"
              value={section.duration}
              placeholder="Enter percentage"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full mt-2 text-gray-600  focus:outline-none focus:border-indigo-500"
              required
              min="0"
              max="100"
            />

            <span className="text-gray-500 text-sm ml-2">
              Enter a value between 0 and 100
            </span>
          </div>
          <div>
            <label className="block mb-2 text-md font-medium text-gray-700">
              Review Percentage
            </label>
            <input
              type="number"
              name="reviewPercentage"
              value={section.reviewPercentage}
              placeholder=" review percentage"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full mt-2 text-gray-600  focus:outline-none focus:border-indigo-500"
              required
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block mb-2 text-md font-medium text-gray-700">
              rate For Doctor
            </label>
            <input
              type="number"
              name="rateForDoctor"
              value={section.rateForDoctor}

              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full mt-2 text-gray-600  focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          {/* <div>
            <label className="block mb-2 text-md font-medium text-gray-700">
              Section Image
            </label>
            <input
              type="file"
              placeholder="image"
              onChange={handleImageChange}
              className="p-2 border border-gray-300 rounded w-full mt-2 text-gray-600  focus:outline-none focus:border-indigo-500"
              accept="image/*"
              required
            />
          </div> */}
          <button
            type="submit"
            className=" bg-primary px-10 py-3 mt-4 hover:bg-indigo-400  text-white rounded-xl  transition-all"
          >
            Add
          </button>
        </form>
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
    </div>
  );
};

export default AddSection;
