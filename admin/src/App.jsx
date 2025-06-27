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
import Repassword from "./pages/reset&&forgetpassword/Repassword";
import EditDoctor from "./pages/Admin/EditDoctor";
import AddSection from './pages/Admin/AddSection'
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import Pataint from "./pages/Doctor/Pataint"
import MedicalRecord from "./pages/Doctor/MedicalRecord ";


const App = () => {
  const { aToken, setForreset, forreset } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext)
  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className=" flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin*/}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/allappointments" element={<AllApointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/doctor-list" element={<DoctorList />} />
          <Route path="/add-section" element={<AddSection />} />

          <Route
            path="/doctor-list/edit/:id"
            element={<EditDoctor></EditDoctor>}
          />
          {/* <Route path="/navbar" element={<Navbar />} /> */}
          {/*  <Route path="/sidebar" element={<Sidebar />} />*/}
          {/* Doctor*/}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route
            path="/doctor/add-record/:id"
            element={<MedicalRecord />}
          />
          <Route path="/doctor-appointments/patient/:patientId/:visitId" element={<Pataint />} />

        </Routes>
      </div>
    </div>
  ) : (
    <>
      {!forreset ? (
        <Login>
          <ToastContainer />
        </Login>
      ) : (
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="resetpassword" element={<Repassword />}></Route>
        </Routes>
      )}
    </>
  );
};

export default App;
