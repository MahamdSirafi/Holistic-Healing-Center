import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard";
import AllApointments from "./pages/Admin/AllApointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import { AdminContext } from "./context/AdminContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <div className="bg-[#F8F9FD]">
      
      <Navbar />
      <div className=" flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/allappointments" element={<AllApointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/doctor-list" element={<DoctorList />} />
          {/* <Route path="/navbar" element={<Navbar />} /> */}
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
