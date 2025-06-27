import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { DoctorContext } from '../../context/DoctorContext'
import { BsPersonLinesFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const AllApointments = () => {

  const { dToken, setDToken, appointments, getAllAppoinmets } = useContext(DoctorContext)


  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (dToken) {
      getAllAppoinmets()
      console.log("joud doctor")
    
    }
  }, [])

  const calculateAge = (birthDateStr) => {
    const birthDate = new Date(birthDateStr)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const dayDiff = today.getDate() - birthDate.getDate()
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--
    }
    return age
  }

  const filteredAppointments = appointments.filter((item) => {
    const fullName = `${item.pataint.first_name} ${item.pataint.last_name}`.toLowerCase()
    const dateStr = item.date.slice(0, 10)
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      dateStr.includes(searchTerm)
    )
  })

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-4 text-2xl font-bold text-gray-800">All Appointments</p>

      {/* 🔍 حقل البحث */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by patient name or date (YYYY-MM-DD)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="bg-white border rounded shadow-md text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* رأس الجدول */}
        <div className="hidden sm:grid grid-cols-[0.3fr_1.2fr_0.6fr_1.2fr_1.2fr_1fr_0.6fr] py-3 px-6 border-b bg-gray-100 text-gray-700 font-semibold text-sm">
          <p>#</p>
          <p className="pl-2">Patient</p>
          <p className="text-center">Age</p>
          <p className="text-center">Date & Time</p>
          <p className="text-center">Status</p>
          <p className="text-center">Fees</p>
          <p className="text-center">Action</p>
        </div>

        {filteredAppointments.length === 0 ? (
          <p className="p-6 text-gray-400 text-center">
            No appointments found.
          </p>
        ) : (
          filteredAppointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-between items-center sm:grid sm:grid-cols-[0.3fr_1.2fr_0.6fr_1.2fr_1.2fr_1fr_0.6fr] text-gray-700 text-sm py-4 px-6 border-b hover:bg-gray-50 transition-all"
            >
              <p className="font-medium">{index + 1}</p>

              <p className="pl-2">
                {item.pataint.first_name} {item.pataint.last_name}
              </p>

              <p className="text-center">{}</p>

              <p className="text-center">
                {item.date.slice(0, 10)} {item.hour}:
                {item.minute === 0 ? '00' : item.minute}
              </p>

              <p
                className={`text-center font-semibold ${
                  item.status === 'confirmed'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}
              >
                {item.status}
              </p>

              <p className="text-center">{item.fees || '-'}</p>

              <div className="flex justify-center">
                <Link to={`patient/${item.pataint._id}/${item._id}`}>
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="View Patient Profile"
                  >
                    <BsPersonLinesFill size={20} />
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllApointments
