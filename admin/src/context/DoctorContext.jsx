import { createContext, useState } from "react";
export const DoctorContext = createContext();
const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState("")


  const value = {
    dToken,
    setDToken
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorContextProvider;
