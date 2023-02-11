import PulseLoader from 'react-spinners/PulseLoader';
import { useGetUsersQuery } from '../users/userApiSlice'
import NewNoteForm from './NewNoteForm';

const NewNote = () => {

  // const users = useSelector(selectAllUsers);

  const { users } = useGetUsersQuery('usersList',{
    selectFromResult:({data}) => ({
      users: data?.ids.map(id => data?.entities[id])
    })
  })
  if(!users?.length) return <PulseLoader color={'#fff'} />

  const content =<NewNoteForm users={users} /> 

  return content;
}

export default NewNote