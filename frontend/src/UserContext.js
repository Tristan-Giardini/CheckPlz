import { createContext, useState } from "react";
import ErrorPage from "./ErrorPage";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(window.sessionStorage.getItem("userId"));
  const [errorMessage, setErrorMessage] = useState("");
  const [failed, setFailed] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userId,
        setUserId,
        failed,
        setFailed,
        errorMessage,
        setErrorMessage,
      }}
    >
      {failed ? <ErrorPage /> : children}
    </UserContext.Provider>
  );
};
