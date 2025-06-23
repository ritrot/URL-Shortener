import { createContext, useContext, useEffect } from "react";
import UseFetch from "./hooks/UseFetch";
import { getCurrentUser } from "./db/apiAuth";
import { data } from "react-router-dom";


const UrlContext = createContext();

const UrlProvider = ({children}) => {
  const {data: user, loading, fn: fetchUser} = UseFetch(getCurrentUser);
  console.log(user , loading);
  
  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{user, fetchUser, loading, isAuthenticated}}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
