import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const AllApointments = () => {
  const { aToken, appointments, getAllAppoinmets } = useContext(AdminContext)

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (aToken) {
      getAllAppoinmets()
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

  // 🔍 تصفية النتائج حسب الاسم أو التاريخ
  const filteredAppointments = appointments.filter((item) => {
    const fullName = `${item.pataint.first_name} ${item.pataint.last_name}`.toLowerCase()
    const dateStr = item.date.slice(0, 10)
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      dateStr.includes(searchTerm)
    )
  })

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-4 text-2xl font-bold text-gray-800'>All Appointments</p>

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

      <div className='bg-white border rounded shadow-md text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        {/* رأس الجدول */}
        <div className='hidden sm:grid grid-cols-[0.3fr_1fr_0.7fr_1fr_1.5fr_1.2fr_0.7fr] py-3 px-6 border-b bg-gray-100 text-gray-700 font-medium'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Doctor</p>
          <p>Date & Time</p>
          <p>Status</p>
          <p>Fees</p>
        </div>

        {/* النتائج */}
        {
          filteredAppointments.length === 0 ? (
            <p className="p-6 text-gray-400 text-center">No appointments found.</p>
          ) : (
            filteredAppointments.map((item, index) => (
              <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.3fr_1fr_0.7fr_1fr_1.5fr_1.2fr_0.7fr] items-center text-gray-600 py-4 px-6 border-b hover:bg-gray-50 transition-all'>
                <p>{index + 1}</p>
                <p>{item.pataint.first_name} {item.pataint.last_name}</p>
                <p>{calculateAge(item.pataint.birth_day.slice(0, 10))}</p>
                <p>{item.doctor.first_name} {item.doctor.last_name}</p>
                <p>{item.date.slice(0, 10)} {item.hour}:{item.minute === 0 ? '00' : item.minute}</p>
                <p className={`font-medium ${item.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {item.status}
                </p>
                <p>{item.fees || '-'}</p>
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

export default AllApointments
