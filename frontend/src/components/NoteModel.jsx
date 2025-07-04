import React, { useState } from 'react';

const NoteModel = ({ closeModel, addNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("Title and Description cannot be empty.");
      return;
    }
    if (title.length > 30 ) {
    alert("Title should be less than or equal to 30 characters.");
    return;
  } 
  if(description.length>70){
    alert("Description should be less than or equal to 70 characters.")
  }
  
    await addNote(title, description);
    closeModel();
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Add New Note</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="w-full px-4 py-2 mb-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="text-red-500 font-semibold hover:underline"
              onClick={closeModel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModel;
