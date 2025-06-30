import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModel from '../components/NoteModel'

const Home = () => {
  const [isModalOpen , setModalOpen] = useState(false)

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar/>
      <button className='bg-teal-500 text-2xl fixed right-4 bottom-4 text-white font-bold p-4 rounded-full'> 
        +
      </button>
      {isModalOpen && <NoteModel/> }

    </div>
  )
}

export default Home
