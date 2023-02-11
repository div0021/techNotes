


import React from 'react'
import { useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import EditUserForm from './EditUserForm'
import { useGetUsersQuery } from './userApiSlice'

const EditUser = () => {

  const {id} = useParams()
  // const user = useSelector(state => selectUserById(state,id));

  const {user} = useGetUsersQuery('usersList',{
    selectFromResult:({data}) => ({
      user:data?.entities[id]
    })
  })

 if(!user) return <PulseLoader color={'#fff'} />
 
   const content = <EditUserForm user={user} />
  
  return content;
}

export default EditUser

// for active subscription purpose: we have to create an active subscription that remain active even through our edit user form
// here we are using useSelector to get the data. So it's not querying that data again and that's why we don't have subscription butt we've already queried the data we don't want to send another query when we already have it so we're not using rtk query although rtk query would know we already have that data and create that subscription we're using useSelector someWhat of a preference but also just a demonstrate what is going on here so we're pulling useSelector out of the cache and out of redux state and using select user by id rather than creating a new subscription and we want notes and users throughout the application, so it;s really no problem to create a subscription that lasts for the duration of our protected(logined user page) pages.