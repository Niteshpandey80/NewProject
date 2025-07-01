import React, { createContext, useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';

const authContext = createContext()

const ContextProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const login = (user)=>{
        setUser(user)
    }
    const logout =()=>{
      localStorage.removeItem('token');
      setUser(null);
      Navigate('/login')
    }
  return (
    <authContext.Provider value={{user , login , logout}}>
       {children}
    </authContext.Provider>
  )
}
export const useAuth= ()=>useContext(authContext)
export default ContextProvider
