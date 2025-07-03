import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import NoteModel from '../components/NoteModel';
import axios from 'axios';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModel = () => {
    setModalOpen(false);
  };

  const addNote = async (title, description) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You are not logged in. Please login first.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        closeModel();
      } else {
        alert(response.data.message || "Failed to add note");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Unauthorized. Please login first.");
      } else {
        alert("Something went wrong while adding the note.");
      }
      console.error(error);
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
      <button
        onClick={() => setModalOpen(true)}
        className='bg-teal-500 text-2xl fixed right-4 bottom-4 text-white font-bold p-4 rounded-full'
      >
        +
      </button>
      {isModalOpen && <NoteModel closeModel={closeModel} addNote={addNote} />}
    </div>
  );
};

export default Home;
