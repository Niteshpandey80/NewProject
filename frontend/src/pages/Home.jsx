import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NoteModel from '../components/NoteModel';
import axios from 'axios';
import NoteCard from '../components/NoteCard';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNote] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/note');
      setNote(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const closeModel = () => {
    setModalOpen(false);
    setCurrentNote(null);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };
  const deleteNote = async(id)=>{
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
      }
    } catch (error) {
      console.log(error);
    }
  }
  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (title, description) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in. Please login first.');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/api/note/add',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
      } else {
        alert(response.data.message || 'Failed to add note');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized. Please login first.');
      } else {
        alert('Something went wrong while adding the note.');
      }
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-3 grid grid-cols-1 md:grid-cols-3">
        {notes.map((note) => (
          <NoteCard onEdit={onEdit} deleteNote={deleteNote} key={note._id} note={note} />
        ))}
      </div>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-teal-500 text-2xl fixed right-4 bottom-4 text-white font-bold p-4 rounded-full"
      >
        +
      </button>
      {isModalOpen && (
        <NoteModel
          closeModel={closeModel}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
