import React from 'react'
import { useParams } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../hooks/useAuth';
import { useGetUsersQuery } from '../users/userApiSlice';
import EditNoteForm from './EditNoteForm';
import {  useGetNotesQuery } from './notesApiSlices';

const EditNote = () => {

  const {id} =useParams();
  // const note = useSelector(state=> selectNoteById(state,id));
  // const users = useSelector(selectAllUsers);

  const {username,isManager,isAdmin} = useAuth();

  const {note } = useGetNotesQuery('notesList',{
    selectFromResult:({data}) => ({
      note:data?.entities[id]
    })
  })

  const {users} = useGetUsersQuery("usersList", {
    selectFromResult:({ data }) => ({
      users: data?.ids.map(id => data?.entities[id])
    })
  })

  if(!note || !users?.length) return <PulseLoader color={"#fff"} />

  if(!isManager && !isAdmin){
    if(note.username !== username){
      return <p className='errmsg'> No access</p>
    }
  }
  const content = <EditNoteForm note={note} users={users} />
  
  return content
}
export default EditNote;