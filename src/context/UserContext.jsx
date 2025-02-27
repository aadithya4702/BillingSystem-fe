import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("dsquare_valid_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("dsquare_token");

    if (storedToken && !user) {
      axios
        .get("http://65.0.176.95/api/account", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(({ data }) => {
          setUser(data);

          localStorage.setItem("dsquare_valid_user", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("dsquare_token");
    localStorage.removeItem("dsquare_valid_user");

    Cookies.remove("dsquare_token");

    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
