import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModel from '../components/NoteModel'
import axios from 'axios'

const Home = () => {
  const [isModalOpen , setModalOpen] = useState(false) ; 
  const closeModel = ()=>{
    setModalOpen(false)
  }
  const addNote = async (title , description)=>{
     try{
              const response = await axios.post(
                "http://localhost:5000/api/note/add" , 
                {title , description} , {       
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
              );
              if(response.data.success){
                closeModel()
              }
            }
            catch(error){
              console.log(error)
            }
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar/>
      <button  
      onClick={()=>setModalOpen(true)}  className='bg-teal-500 text-2xl fixed right-4 bottom-4 text-white font-bold p-4 rounded-full'> 
        +
      </button>
      {isModalOpen && <NoteModel closeModel ={closeModel} addNote={addNote} /> }

    </div>
  )
}

export default Home
