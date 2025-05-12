import axios from "axios";
import { createContext, useState } from "react";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState("");
  const backendUrl = 'http://localhost:7000/api/v1.0.0/';
  const [state, setState] = useState("Admin");
  const [forreset, setForreset] = useState(false);
  const [appointments, setAppointments] = useState([])
  const [dashData, setDashData] = useState({})
  const [Awallet, setAWallet] = useState([])



  const getDashData = async () => {

    try {
      const response = await axios.get("http://localhost:7000/api/v1.0.0/statisstics", {
        headers: {
          Authorization: `  Bearer ${localStorage.getItem("Admintoken")}`,
        },
      });

      setDashData(response.data)

    } catch (error) {

    }
  }
  const getAWallet = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/v1.0.0/wallets/mine", {
        headers: {
          Authorization: `  Bearer ${localStorage.getItem("Admintoken")}`,
        },
      });

      setAWallet(response.data.doc)
      console.log(response.data.doc)
    } catch (error) {

    }
  }



  const getAllAppoinmets = async () => {

    try {
      const response = await axios.get("http://localhost:7000/api/v1.0.0/dates", {
        headers: {
          Authorization: `  Bearer ${localStorage.getItem("Admintoken")}`,
        },
      });

      setAppointments(response.data.doc)
      console.log(response.data.doc)
      console.log("joud")
    } catch (error) {

    }
  }
  const value = {
    aToken,
    setAToken,
    state,
    setState,
    backendUrl,
    forreset,
    setForreset,
    appointments,
    setAppointments,
    getAllAppoinmets,

    dashData,
    getDashData,
    getAWallet, setAWallet, Awallet



    // getAllDoctors
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
