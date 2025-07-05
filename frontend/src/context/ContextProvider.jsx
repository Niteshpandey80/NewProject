import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react';
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
    useEffect(()=>{
      const verifyUser = async()=>{
        try {
          const res = await axios.get('http://localhost:3000/api/auth/verify' , {
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`,
            }
          })
          if(res.data.success){
            setUser(res.data.user)
          }else[
            setUser(null)
          ]
        } catch (error) {
          console.log(error)
        }
      }
      verifyUser() 
    })
  return (
    <authContext.Provider value={{user , login , logout}}>
       {children}
    </authContext.Provider>
  )
}
export const useAuth= ()=>useContext(authContext)
export default ContextProvider
