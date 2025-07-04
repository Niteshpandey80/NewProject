import React from 'react'
import { FaRegEdit , FaTrash  } from "react-icons/fa";

const NoteCard = ({note}) => {
  return (
    <div className='bg-white p-4 ml-3 mt-3 rounded shadow '>
        <h2 className='text-xl font-bold overflow-y-auto max-h-40 break-words'>{note.title}</h2>
        <p className='break-words whitespace-pre-wrap max-h-40 overflow-y-auto' >{note.description}</p>
        <div className='flex justify-end mt-2'>
            <button className='text-blue-500 mr-2'>
                <FaRegEdit />
            </button>
            <button className='text-red-500'><FaTrash /></button>
        </div>
    </div>
  )
}

export default NoteCard
