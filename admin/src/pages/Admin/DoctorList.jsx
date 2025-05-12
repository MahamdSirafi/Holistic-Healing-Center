import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const DoctorList = () => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/v1.0.0/doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Admintoken")}`,
        },
      })
      setList(response.data.doc)
    } catch (err) {
      console.error("Error fetching doctors:", err)
    }
  }

  const notify = () => {
    toast.success('Deleted Successfully', {
      position: "top-right",
      autoClose: 2000,
    });
  }

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/v1.0.0/doctors/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Admintoken")}`,
        },
      })
      notify()
      fetchList()
    } catch (err) {
      toast.error('Failed to delete doctor')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='w-full max-w-6xl mx-auto p-4'>
      <p className='text-2xl font-semibold mb-6'>All Doctors</p>

      <div className="overflow-x-auto bg-white shadow-md rounded border">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">First Name</th>
              <th className="py-3 px-4">Last Name</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((doctor, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img
                    src={`../../../public/${doctor.photo}`}
                    alt="Doctor"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4">{doctor.first_name}</td>
                <td className="py-3 px-4">{doctor.last_name}</td>
                <td className="py-3 px-4">{doctor.department.name}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => deleteHandler(doctor._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                    <Link to={`edit/${doctor._id}`}>
                      <button className="text-green-600 hover:text-green-800" title="Edit">
                        <AiOutlineEdit size={20} />
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  )
}

export default DoctorList
