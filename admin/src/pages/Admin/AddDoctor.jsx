import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; 


const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [experience, setExperience] = useState(" 1 Year");
  const [about, setAbout] = useState("");
  const [Speciality, setSpeciality] = useState("");
  const [specialities, setSpecialities] = useState([]);


  useEffect(() => {
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

    fetchSpecialities();
  }, []);
  //  const {backendUrl , aToken} =useContext(AdminContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }
    } catch (error) { }
  };


  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full ">
      <p className="mb-3 text-lg font-medium">Add Doctor </p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600"
        >
          <div className="w-full lg:flex-1 flex-col gap-4">
            <div className="flex-1  flex flex-col gap-1">
              <p>First Name</p>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstname}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="name"
                required
              />
            </div>

            <div className="flex-1  flex flex-col gap-1">
              <p>Last Name</p>
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastname}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="name"
                required
              />
            </div>

            <div className="flex-1  flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="emaIL"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1  flex flex-col gap-1">
              <p>Phone</p>
              <PhoneInput defaultCountry="SY" placeholder='Phone' onChange={(value) => { setphone(value) }}
                value={phone}
                name="phone" />
        
            </div>

            <div className="flex-1  flex flex-col gap-1">
              <p>Gender</p>
              <select
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="male "> male</option>
                <option value="female "> female </option>
              </select>
            </div>
            {/* <div className="flex-1  flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="1 Year "> 1 Year</option>
                <option value="2 Year "> 2 Year</option>
                <option value="3 Year "> 3 Year</option>
                <option value="4 Year "> 4 Year</option>
                <option value="5 Year "> 5 Year</option>
                <option value="6 Year "> 6 Year</option>
                <option value="7 Year "> 7 Year</option>
                <option value="8 Year "> 8 Year</option>
                <option value="9 Year "> 9 Year</option>
                <option value="10 Year "> 10 Year</option>
              </select>
            </div> */}
            <div className=" w-full lg:flex-1 flex flex-col  gap-4">
              <div>
                <div className="flex-1  flex flex-col gap-1">
                  <p>Speciality</p>
                  <select
                    onChange={(e) => setSpeciality(e.target.value)}
                    value={Speciality}
                    className="border rounded px-3 py-2"
                    name=""
                    id=""
                  >
                    <option value=""></option>
                    {specialities.map((spec) => (
                      <option key={spec.id} value={spec.name}>
                        {spec.name}
                      </option>
                    ))}
                    
                  </select>
                </div>
              </div>
            </div>

            <div>
              <p className=" mt-4 mb-2 ">About Doctor</p>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                className="w-full  px-4 pt-2 border rounded"
                placeholder="write about doctor"
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className=" bg-primary px-10 py-3 mt-4 text-white rounded-full"
            >
              Add Doctor{" "}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
