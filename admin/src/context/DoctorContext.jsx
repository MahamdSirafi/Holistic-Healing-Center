import axios from "axios";
import { createContext, useState } from "react";
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(localStorage.getItem("Doctortoken") ? localStorage.getItem("Doctortoken") : "")
  const [appointments, setAppointments] = useState([])

  const getAllAppoinmets = async () => {

    try {
      const response = await axios.get("http://localhost:7000/api/v1.0.0/dates/mineForDoctor", {
        headers: {
          Authorization: `  Bearer ${localStorage.getItem("Doctortoken")}`,
        },
      });

      setAppointments(response.data.doc)
      console.log(response.data.doc)
    

    } catch (error) {
      console.log(error)
    }
  }

  const value = {
    dToken,
    setDToken,
    appointments,
    setAppointments,
    getAllAppoinmets,

  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorContextProvider;
