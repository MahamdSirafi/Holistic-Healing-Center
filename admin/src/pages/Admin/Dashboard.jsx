import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { aToken, dashData, setDashData, getDashData, appointments, setAppointments, getAllAppoinmets, Awallet, setAWallet, getAWallet } = useContext(AdminContext);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (aToken) {
      getDashData();
      getAllAppoinmets();
      getAWallet();
    }
  }, []);

  const handleWithdraw = () => {
    setShowPopup(true);
  };

  const handleRefreshBalance = () => {
    getDashData();
    toast.info("Balance refreshed", { autoClose: 2000 });
  };

  return (
    dashData && (
      <div className="m-5 md:m-10 space-y-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-4 rounded shadow-sm">

          <div className=" flex text-lg font-semibold text-gray-800">
            Balance:
            <span className="text-green-600 ml-2">
              {Awallet.map((item, index) => (
                <p key={index}>
                  {item.balance}
                </p>
              ))}

            </span>
          </div>


          <div className="flex gap-3">
            <button
              onClick={handleRefreshBalance}
              className="px-5 py-2 bg-green-600 text-white font-medium rounded-md transition"
            >
              Refresh Balance
            </button>
            <button
              onClick={handleWithdraw}
              className="px-5 py-2 bg-blue-600 text-white font-medium rounded-md  transition"
            >
              Withdraw Balance
            </button>

          </div>
        </div>



        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex items-center gap-3 bg-white p-5 min-w-52 rounded shadow-md hover:shadow-lg transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="Doctor" />
            <div>
              <p className="text-xl font-semibold text-gray-700">{dashData.doctor}</p>
              <p className="text-gray-500">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-5 min-w-52 rounded shadow-md hover:shadow-lg transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="Appointments" />
            <div>
              <p className="text-xl font-semibold text-gray-700">{dashData.date}</p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-5 min-w-52 rounded shadow-md hover:shadow-lg transition-all">
            <img className="w-14" src={assets.patients_icon} alt="Patients" />
            <div>
              <p className="text-xl font-semibold text-gray-700">{dashData.pataint}</p>
              <p className="text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded shadow-md mt-10 overflow-hidden">
          <div className="flex items-center gap-2.5 px-4 py-4 border-b bg-gray-50">
            <img src={assets.list_icon} alt="List" />
            <p className="font-semibold text-gray-700">Latest Bookings</p>
          </div>

          <div className="divide-y">
            {appointments.length === 0 ? (
              <p className="px-6 py-4 text-gray-500">No bookings yet.</p>
            ) : (
              appointments.slice(-5).map((item, index) => (
                <div className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-all" key={index}>
                  <img className="rounded-full w-10 h-10 object-cover" src={assets.patients_icon} alt="Patient" />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {item.pataint.first_name} {item.pataint.last_name}
                    </p>
                    <p className="text-gray-500">
                      {item.date.slice(0, 10)} {item.hour}:{item.minute === 0 ? '00' : item.minute}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
              <h2 className="text-xl font-semibold mb-4">Withdraw Request</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Withdrawal completed successfully", {
                    position: "top-right",
                    autoClose: 5000,
                  });
                  setTimeout(() => {
                    setShowPopup(false);
                  }, 2000);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cards Accepted:</label>
                  <img src={assets.payment} alt="Cards" className="w-32" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                  <input
                    type="text"
                    placeholder="Mr. John Doe"
                    required
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="number"
                    placeholder="1111-2222-3333-4444"
                    required
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Month</label>
                  <input
                    type="text"
                    placeholder="January"
                    required
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Year</label>
                    <input
                      type="number"
                      placeholder="2025"
                      required
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      required
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Confirm Payment
                  </button>
                </div>
              </form>

              <ToastContainer />
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Dashboard;
