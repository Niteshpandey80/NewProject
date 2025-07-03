import React, { createContext, useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const authContext = createContext()

const ContextProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const navigate = useNavigate();

    const login = (user)=>{
        setUser(user)
    }
    const logout =()=>{
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login')
    }
  return (
    <authContext.Provider value={{user , login , logout}}>
       {children}
    </authContext.Provider>
  )
}
export const useAuth= ()=>useContext(authContext)
export default ContextProvider
