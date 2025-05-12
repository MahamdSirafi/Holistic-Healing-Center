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


const EditDoctor = () => {
    const [docImg, setDocImg] = useState(false);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    let [gender, setGender] = useState("");
    const [experience, setExperience] = useState(" 1");
    const [about, setAbout] = useState("");
    const [Speciality, setSpeciality] = useState("");
    const [specialities, setSpecialities] = useState([]);
    const [Specialityid, setSpecialityid] = useState("")
    const navigate = useNavigate()
    const [showFields, setShowFields] = useState(false);
    const [schedules, setSchedules] = useState([{ first: '', last: '', day: '' }]);

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

        toast.success('Edited Successfully', {
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
            navigate("/doctor-list")
        }, 4000)
    }


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
        fetchDoctor()
        fetchSpecialities();
    }, []);

    const id = window.location.pathname.split("/").slice(-1)[0]
    // console.log(id)

    const fetchDoctor = async () => {
        try {
            let response = await axios.get(`http://localhost:7000/api/v1.0.0/doctors/${id} `, {
                headers: {
                    Authorization: `  Bearer ${localStorage.getItem("Admintoken")}`,
                },
            })
            setFirstName(response.data.doc.first_name);
            setLastName(response.data.doc.last_name);
            setEmail(response.data.doc.email);
            setPhone(response.data.doc.phone);
            setGender(response.data.doc.sex);
            setExperience(response.data.doc.expertise);
            setSchedules(response.data.doc.date.map(schedule => ({
                first: String(schedule.first),
                last: String(schedule.last),
                day: schedule.day
            })));
          
            setSpeciality(response.data.doc.department.name);
            console.log(schedules)

        }

        catch {

        }

    }
    console.log("joud", Specialityid, phone)
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:7000/api/v1.0.0/doctors/${id}`, {
                first_name: firstname,
                last_name: lastname,
                phone: phone,
                email: email,
                expertise: experience,
                sex: gender,
                department: Specialityid,

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

            notify();
            console.log(response.data)
        } catch (error) {
            console.log(response.error)
        }

    }

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
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="border rounded px-3 py-2  focus:outline-none focus:border-indigo-500"
                                    name=""
                                    id=""
                                >

                                    <option value="male"> male</option>
                                    <option value="female">female
                                    </option>
                                </select>
                            </div>
                            <div className="flex-1  flex flex-col gap-1 my-4">
                                <p>Experience</p>
                                <input
                                    onChange={(e) => setExperience(e.target.value)}
                                    value={experience}
                                    className="border rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                                    name=""
                                    id=""
                                    type="number"
                                >

                                </input>
                            </div>
                            <div className=" w-full lg:flex-1 flex flex-col  gap-4 my-4">
                                <div>
                                    <div className="flex-1  flex flex-col gap-1">
                                        <p>Speciality</p>
                                        {/* <select
                                            onChange={(e) => setSpeciality(e.target.value)}
                                            value={Speciality}
                                            className="border rounded px-3 py-2 focus:outline-none focus:border-indigo-500 "
                                            name=""
                                            id=""
                                        >
                                            <option value=""></option>
                                            {specialities.map((spec) => (
                                                <option
                                                    id={spec._id} value={spec.name}
                                                    onChange={(e) => setSpecialityid(e.target._id)}

                                                >
                                                    {spec.name}
                                                </option>
                                            ))}

                                        </select> */}
                                        <select onChange={(e) => setSpecialityid(e.target.value)}
                                            className="border rounded px-3 py-2 focus:outline-none focus:border-indigo-500 "
                                        >
                                            <option value=""></option>
                                            {specialities.map((spec) => (
                                                <option key={spec._id} value={spec._id}>
                                                    {spec.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
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
                        Edit Doctor{" "}
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

    )
}

export default EditDoctor