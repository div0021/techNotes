


import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo } from 'react'
// import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetNotesQuery } from './notesApiSlices'

const Note = ({noteId}) => {

    // const note = useSelector(state=> selectNoteById(state,noteId))

    const {note} = useGetNotesQuery('notesList',{
        selectFromResult:({data}) => ({ // this is the selector for getNotesquery data
            note:data?.entities[noteId]
        })
    }) //here we get notes by making only one query with use get notes query, this will not creat a seperate query or network request..

    const navigate = useNavigate();

    if(note){

        const created = new Date(note.createdAt).toLocaleString('en-US',{day:'numeric',month:'long'})

        const updated = new Date(note.updatedAt).toLocaleString('en-US',{day:'numeric',month:'long'})

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr className='table__row'>
                <td className='table__cell note_status'>
                    {note.completed ? <span className='note__status--completed'>Completed</span> : <span className='note__status--open'>Open</span>}
        
                </td>
                <td className='table__cell note__created'>{created}</td>
                <td className='table__cell note__updated'>{updated}</td>
                <td className='table__cell note__title'>{note.title}</td>
                <td className='table__cell note__username'>{note.username}</td>
                
                <td className='table__cell'>
                    <button className='icon-button table__button'
                    onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    }else return null;

}
const memoizedNote = memo(Note);
// this is used, so that it only re-render when there is same changes happen in data.
export default memoizedNote