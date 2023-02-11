import React from 'react'
import useAuth from '../../hooks/useAuth';
import Note from './Note';
import { useGetNotesQuery } from './notesApiSlices'

const NoteList = () => {

  const {isManager, isAdmin, username} = useAuth();

  const {
    data:notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery(
      // this is done so that data refresh after certain interval of time
      // undefined  // this is done to fix re-request again and again
      'notesList'
      ,{ // every 15sec data will be updated.
        pollingInterval:15000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true
      }
  )

  let content;

  if(isLoading) content = <p>Loading...</p>

  if(isError){
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if(isSuccess){
    const {ids,entities} = notes;

    let filterIds;
    if(isManager || isAdmin){
      filterIds = [...ids];
    }else{
      filterIds = ids.filter(noteId => entities[noteId].username === username)
    }

    const tableContent = ids?.length && filterIds.map(noteId => <Note key={noteId} noteId={noteId} />)

    content = (
      <table className='table table--notes'>
        <thead className='table__thead'>
          <tr>
            <th scope='col' className='table__th note__status'>Username</th>
            <th scope='col' className='table__th note__created'>Created</th>
            <th scope='col' className='table__th note__updated'>Updated</th>
            <th scope='col' className='table__th note__title'>Title</th>
            <th scope='col' className='table__th note__username'>Owner</th>
            <th scope='col' className='table__th note__edit'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }
  return content
}

export default NoteList