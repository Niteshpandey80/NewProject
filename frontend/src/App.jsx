import React from 'react'
import Signup from './pages/signup'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/Home' element={<Home/>} ></Route>
      <Route path='/register' element={<Signup/>} ></Route>
      <Route path='/' element ={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
