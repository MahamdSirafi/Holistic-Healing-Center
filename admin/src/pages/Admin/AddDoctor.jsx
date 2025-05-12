import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets"
import { AdminContext } from "../../context/AdminContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useNavigate } from "react-router-dom"
import { AiOutlineDelete } from 'react-icons/ai';
import CustomOption from "./CustomOption";




const AddDoctor = () => {
  const navigate = useNavigate()
  const [docImg, setDocImg] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [experience, setExperience] = useState(" 1");
  const [about, setAbout] = useState("");
  const [Speciality, setSpeciality] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [Specialityid, setSpecialityid] = useState("")
  const [duration, setDuration] = useState("")
  const [showFields, setShowFields] = useState(false);
  const [schedules, setSchedules] = useState([{ first: '', last: '', day: '' }]);
  const handleOptionClick = (option) => {
    setSpeciality(option.name)
    setSpecialityid(option._id)
    console.log(option._id)
  };
  console.log("from out", Specialityid)

  const handleChange = (index, field, value) => {
    const newSchedules = [...schedules];
    newSchedules[index][field] = value;
    setSchedules(newSchedules);
  };

  const handleAddSchedule = () => {
    setSchedules([...schedules, { first: '', last: '', day: '' }]);
  };
  const onDelete = (index) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedules);
  }


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


  // useEffect(() => {
  //   const fetchSpecialities = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:7000/api/v1.0.0/departments',
  //         {
  //           headers: {
  //             Authorization: `  Bearer ${localStorage.getItem("Admintoken")}`,
  //           },
  //         }
  //       );
  //       setSpecialities(response.data.doc);
  //       console.log(specialities)
  //     } catch (error) {
  //       console.error('Error fetching specialities:', error);
  //     }
  //   };

  //   fetchSpecialities();
  // }, []);


  const onSubmitHandler = async (event) => {

    console.log(schedules);
    event.preventDefault();
    // if (!firstname || !lastname || !phone || !email || !experience || !gender || !Specialityid || !docImg) {
    //   console.error(" ");
    //   return;
    // // }
    // const formData = new FormData()
    // formData.append("first_name", firstname);
    // formData.append("last_name", lastname);
    // formData.append("phone", Number(phone));
    // formData.append("email", email);
    // formData.append("expertise", Number(experience));
    // formData.append("sex", gender);
    // formData.append("department", Specialityid);
    // formData.append("photo", docImg)
    // days.forEach(ele => {
    //   formData.append("first", ele.first);
    //   formData.append("last", ele.last);
    //   formData.append("day", ele.day);
    // })



    // console.log(formData)
    // formData.forEach((value, key) => {
    //   console.log(`${key} ${value}`)
    // })
    try {
      const response = await axios.post('http://localhost:7000/api/v1.0.0/doctors', {
        first_name: firstname,
        last_name: lastname,
        phone: phone,
        email: email,
        expertise: parseInt(experience),
        sex: gender,
        department: Specialityid,
        duration: duration,
        photo: docImg.name,
        date: schedules.map(schedule => ({
          first: parseInt(schedule.first),
          last: parseInt(schedule.last),
          day: schedule.day
        }))

      }

        , {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("Admintoken")}`,
          },
        });
      console.log(response.data)
      notify();
    } catch (err) {
      const notifyy = () => {

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
      notifyy()
    }
  };

  console.log(parseInt(experience))
  return (

    <>
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
              <div className="flex-1  flex flex-col gap-1 my-4">
                <p>First Name</p>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstname}
                  className="border rounded px-3 py-2 focus:outline-none focus:border-indigo-500  "
                  type="text"
                  placeholder="name"

                />
              </div>

              <div className="flex-1  flex flex-col gap-1 my-4">
                <p>Last Name</p>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastname}
                  className="border rounded px-3 py-2 focus:outline-none focus:border-indigo-500 "
                  type="text"
                  placeholder="name"

                />
              </div>

              <div className="flex-1  flex flex-col gap-1 my-4">
                <p>Doctor Email</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="border rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                  type="emaIL"
                  placeholder="Email"

                />
              </div>

              <div className="flex-1  flex flex-col gap-1 my-4 focus:outline-none ">
                <p>Phone</p>
                <PhoneInput defaultCountry="SY" placeholder='Phone' onChange={(value) => { setPhone(value) }}
                  value={phone}
                  name="phone"
                  className="border rounded px-3 py-2  focus:outline-none " />

              </div>

              <div className="flex-1  flex flex-col gap-1 my-4">
                <p>Gender</p>
                <select
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                  className="border rounded px-3 py-2  focus:outline-none focus:border-indigo-500"
                  name=""
                  id=""
                >
                  <option value=""></option>
                  <option value="male"> male</option>
                  <option value="female"> female </option>
                </select>
              </div>
              <div className="flex-1  flex flex-col gap-1 my-4">
                <p>Experience</p>
                <select
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                  className="border rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                  name=""
                  id=""
                >
                  <option value="1 Year "> 1 </option>
                  <option value="2 Year "> 2 </option>
                  <option value="3 Year "> 3 </option>
                  <option value="4 Year "> 4 </option>
                  <option value="5 Year "> 5 </option>
                  <option value="6 Year "> 6 </option>
                  <option value="7 Year "> 7 </option>
                  <option value="8 Year "> 8</option>
                  <option value="9 Year "> 9 </option>
                  <option value="10 Year "> 10 </option>
                </select>
              </div>
              <div className=" w-full lg:flex-1 flex flex-col  gap-4 my-4">
                <div>
                  <div className="flex-1  flex flex-col gap-1">
                    <p className="mb-4">Speciality</p>

                    <div>
                      <p className="-mb-7 mt-4 ml-2">{Speciality}</p>
                      <CustomOption specialities={specialities} onOptionClick={handleOptionClick} />
                    </div>
                    {/* <select
                      onChange={(e) => setSpeciality(e.target.value)}
                      value={Speciality}
                      className="border rounded px-3 py-2 focus:outline-none focus:border-indigo-500 "
                      name=""
                      id=""
                    >
                      <option value=""></option>
                      {specialities.map((spec) => (
                        <>

                          <option
                            onClick={(e) => setSpecialityid(e.target.id)}

                            id={spec._id} value={spec.name}>
                        
                            {spec.name}

                          </option>
                         

                        </>

                      ))}

                    </select> */}

                  </div>
                </div>
              </div>

              <div className="flex-1  flex flex-col gap-1 my-4">
                <p>Duration</p>
                <input
                  onChange={(e) => setDuration(e.target.value)}
                  value={duration}
                  className="border rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                  type="number"
                  placeholder="duration"

                />
              </div>
              <div className="my-4">
                <p className=" mt-4 mb-2 ">About Doctor</p>
                <textarea
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  className="w-full  px-4 pt-2 border rounded focus:outline-none focus:border-indigo-500 "
                  placeholder="write about doctor"
                  rows={5}
                />
              </div>
              <p className="mb-2 py-3 text-gray-600">Time Slot:</p>
              <div className=" flex  flex-col ">
                {schedules.map((schedule, index) => (
                  <div key={index} className=" gap-2 flex-wrap sm:gap-0 flex flex-row justify-between mb-4  ">
                    <div className="  sm:basis-1/4 basis-1/2  ">
                      <label className="mt-4 text-gray-600  ">
                        StartTime
                        <input
                          type="time"
                          value={schedule.first}
                          onChange={(e) => handleChange(index, 'first', e.target.value)}
                          className="p-2 border border-gray-300 rounded w-full mt-2 text-gray-600  focus:outline-none focus:border-indigo-500"
                        />
                      </label>
                    </div>
                    <div className="sm:basis-1/4 basis-1/2  ">
                      <label className="mt-4 text-gray-600 ">
                        EndTime
                        <input
                          type="time"
                          value={schedule.last}
                          onChange={(e) => handleChange(index, 'last', e.target.value)}
                          className="p-2 border border-gray-300 rounded w-full mt-2 text-gray-600  focus:outline-none focus:border-indigo-500"
                        />
                      </label>
                    </div>
                    <div className="mt-6 sm:basis-1/4 basis-1/2  ">

                      <select
                        value={schedule.day}
                        onChange={(e) => handleChange(index, 'day', e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full mt-2 text-gray-600  focus:outline-none focus:border-indigo-500 "
                      >
                        <option value="">select</option>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                      </select>

                    </div>
                    <button className="  mt-6 text-red-500 hover:text-red-700 text-2xl " onClick={() => { onDelete(index) }}>
                      <AiOutlineDelete className="" />
                    </button>
                  </div>
                ))}
                <button
                  className=" w-36 bg-black  mt-4   text-white rounded-lg  p-1 hover:bg-zinc-900 transition-all  sm:basis-1/6 basis-1/2   "
                  type="button" onClick={handleAddSchedule}>Add Time Slot</button>

              </div>


            </div>
          </div>

          <button

            type="submit"
            className=" bg-primary px-10 py-3 mt-4 hover:bg-indigo-400  text-white rounded-xl  transition-all"
          >
            Add Doctor{" "}
          </button>
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



    </>
  );
};

export default AddDoctor;
