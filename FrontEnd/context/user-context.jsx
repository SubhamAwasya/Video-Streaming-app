import React, { createContext, useState } from "react";

// Create a context for the user
export const UserContext = createContext(null);

// Create a provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the user details

  // Function to simulate user login
  const logIn = (userDetails) => {
    setUser(userDetails);
  };

  // Function to simulate user logout
  const logOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
