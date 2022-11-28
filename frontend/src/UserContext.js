import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(window.sessionStorage.getItem("userId"));
  // const [userPreferences, setUserPreferences] = useState(null);

  // useEffect(() => {
  //   fetch(`/preferences/${userId}`).then((res) => {
  //     res
  //       .json()
  //       .then((data) => {
  //         console.log(data);
  //         setUserPreferences(data.data);
  //       })
  //       .catch((e) => console.log("got error", e));
  //   });
  // }, [userId]);

  return (
    <UserContext.Provider value={{ user, setUser, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
