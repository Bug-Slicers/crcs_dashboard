import React, { createContext, useState } from "react";

// Create the context
const UserContext = createContext();

// Create a data store provider
const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("");
  const [userData, setUserData] = useState(null);

  const updateUser = (type, data) => {
    setUserType(type);
    setUserData(data);
  };

  return (
    <UserContext.Provider value={{ userType, userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
