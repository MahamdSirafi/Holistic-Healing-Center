import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import MedicalRecord from './MedicalRecord '
import { useNavigate } from "react-router-dom";


const Pataint = () => {
    const { patientId, visitId } = useParams();
    const [patient, setPatient] = useState(null)
    const [loading, setLoading] = useState(true)
    const [records, setRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const navigate = useNavigate();
    console.log(patientId)
    console.log(visitId)
    const handleAddRecord = () => {


        if (visitId) {
            // إذا تم اختيار سجل معين
            navigate(`/doctor/add-record/${visitId}`);
        } else {
            // إذا لا يوجد سجل أو لم يتم الاختيار، نستخدم معرف المريض نفسه
            navigate(`/doctor/add-record/${visitId}`);
        }
    };
    const onSubmitHandler = async (event) => {
        console.log("jojo")
    }

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/api/v1.0.0/recourds?pataint=${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Doctortoken")}`,
                    },
                })
                setRecords(response.data.doc)
                console.log(response.data.doc)
            } catch (error) {
                console.error("حدث خطأ أثناء جلب السجلات الطبية:", error);
            }
        };

        if (patientId) {
            fetchRecords();
        }
    }, [patientId]);


    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/api/v1.0.0/pataints/${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Doctortoken")}`,
                    },
                })
                setPatient(response.data.doc)
            } catch (error) {
                console.error('Failed to fetch patient:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPatient()
    }, [patientId])

    if (loading) {
        return <div className="text-center py-6 text-gray-500 text-base">Loading patient data...</div>
    }

    if (!patient) {
        return <div className="text-center py-6 text-red-500 text-base">Patient not found.</div>
    }

    return (

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 h-full mt-4  ">
            {/* Left Side: Patient Card */}
            <div className="lg:col-span-4 h-full">
                <div className="bg-white shadow-xl rounded-2xl p-8 ml-4 border h-full min-h-[600px] flex flex-col items-center justify-start">
                    {/* صورة المريض */}
                    <img
                        src={patient.photo || "/default-avatar.png"}
                        alt="Patient"
                        className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 mb-8"
                    />

                    {/* الاسم ورقم الهاتف */}
                    <p className="text-xl font-bold text-gray-800 mb-8 text-center">
                        {patient.first_name} {patient.last_name}
                    </p>

                    {/* معلومات المريض */}
                    <div className="w-full text-gray-800 text-sm p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {[{
                                label: "Phone",
                                value: patient.phone,
                            }, {
                                label: "Sex",
                                value: patient.sex,
                            }, {
                                label: "Blood Type",
                                value: patient.blood,
                            }, {
                                label: "Address",
                                value: patient.adderss,
                            }, {
                                label: "Birth Date",
                                value: new Date(patient.birth_day).toLocaleDateString(),
                            }, {
                                label: "Age",
                                value: `${new Date().getFullYear() - new Date(patient.birth_day).getFullYear()} years`,
                            }, {
                                label: "Insurance",
                                value: patient.insurance ? "Yes" : "No",
                                valueClass: patient.insurance ? "text-green-600" : "text-red-500",
                            }].map(({ label, value, valueClass }, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-700">{label}:</span>
                                    <span className={`text-gray-700 ${valueClass || ""}`}>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>




            {/* Right Side: Timeline and Records */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6 h-full">
                {/* Timeline */}
                <div className="bg-white shadow rounded-xl p-6 border min-h-[300px] max-h-[300px] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Visit Timeline</h3>
                        <button
                            onClick={handleAddRecord}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md"
                        >
                            + Add Record
                        </button>
                    </div>
                    <div className="relative border-l-2 border-gray-200 pl-8 space-y-6">
                        {records.map((record) => (
                            <div
                                key={record._id}
                                onClick={() => setSelectedRecord(record)}
                                className="relative cursor-pointer group"
                            >
                                <div className="absolute -left-3 w-4 h-4 bg-gray-300 rounded-full group-hover:bg-indigo-500 transition-all"></div>
                                <p className="ml-2 text-sm text-gray-700 group-hover:text-indigo-600">
                                    {new Date(record.dateId.date).toLocaleDateString("en-GB")} – {record.department}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Record Details */}
                <div className="bg-white shadow rounded-xl p-6 border min-h-[300px] max-h-[300px] overflow-y-auto">
                    {selectedRecord ? (
                        <>
                            <h3 className="text-xl font-bold text-indigo-600 mb-4">Record Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
                                <p><strong>Symptoms:</strong> {selectedRecord.symptoms}</p>
                                <p><strong>Diagnosis:</strong> {selectedRecord.diagnosis}</p>
                                <p><strong>Department:</strong> {selectedRecord.department}</p>
                                <p><strong>Doctor:</strong> {selectedRecord.doctor.first_name} {selectedRecord.doctor.last_name}</p>
                            </div>
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Prescription</h4>
                                <div className="space-y-3">
                                    {selectedRecord.recipe.map((r) => (
                                        <div key={r._id} className="border border-gray-100 bg-gray-50 p-3 rounded text-sm">
                                            <p><strong>Name:</strong> {r.name}</p>
                                            <p><strong>Count:</strong> {r.count}</p>
                                            <p><strong>Details:</strong> {r.details}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500 italic">Select a visit to view its details.</p>
                    )}
                </div>
            </div>
        </div>

    )
}

export default Pataint
