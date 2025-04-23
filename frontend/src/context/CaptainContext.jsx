import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullName: {
      firstName: "",
      lastName: ""
    },
    email: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: ""
    }
  });

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
    {children}
    </CaptainDataContext.Provider>
  );
};
CaptainContext.propTypes = {
  children: PropTypes.node.isRequired
};

export default CaptainContext;

