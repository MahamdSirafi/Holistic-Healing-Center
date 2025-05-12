// src/DoctorSection.jsx
import React, { useState } from "react";

const AddSection = () => {
  const [section, setSection] = useState({
    name: "",
    image: "",
    price: "",
    duration: "", // حقل جديد لتحديد مدة المعاينة
    reviewPercentage: "", // حقل جديد لتحديد نسبة المراجعة
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSection((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file); // فك التعليق عن هذه السطر لقراءة الصورة
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("", section);
  };

  return (
    <div className="flex flex-col justify-start min-h-screen m-5 w-full ">
      <p className="mb-8 mt-10 text-lg font-medium"> Add a medical section</p>
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md ">
        <h1 className="text-2xl font-medium text-center mb-4">
         
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Section Name
            </label>
            <input
              type="text"
              name="name"
              value={section.name}
              placeholder=" name"
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Section Price
            </label>
            <input
              type="number"
              name="price"
              value={section.price}
              placeholder=" price"
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 mr-2">
              Section Duration (%)
            </label>
            <input
              type="number"
              name="duration"
              value={section.duration}
              placeholder="Enter percentage"
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
              min="0"
              max="100"
            />

            <span className="text-gray-500 text-sm ml-2">
              Enter a value between 0 and 100
            </span>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Review Percentage
            </label>
            <input
              type="number"
              name="reviewPercentage"
              value={section.reviewPercentage}
              placeholder=" review percentage"
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Section Image
            </label>
            <input
              type="file"
              placeholder="image"
              onChange={handleImageChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              accept="image/*"
              required
            />
          </div>
          <button
            type="submit"
            className="w-60 mt-4 bg-blue-600 text-white p-2 hover:bg-blue-700 transition duration-200 px-10 py-3 rounded-full "
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSection;
