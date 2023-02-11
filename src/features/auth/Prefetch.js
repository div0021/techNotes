// rtk toolkit does have a use prefetch hook but that's not we are going use




import React, { useEffect } from 'react'
import { notesApiSlice } from '../notes/notesApiSlices';
import {store} from '../../app/store'
import { usersApiSlice } from '../users/userApiSlice';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(()=>{
        console.log('subscribing');

        //manual subscription to users and notes that will remain active 
        // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate()); // initiate create manualsub. and getNotes is the query.
        // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
        // so this way we have access to that state and not expire in 5 or 60s.

        // return () =>{
        //     console.log('unsubscribing')
        //     notes.unsubscribe()
        //     users.unsubscribe()
            // when we leave the protected pages.
            // this will be done by wraping all childern we're going to wrap our protected pages in pre-fetch component
            // This will also going to refresh the page and we still want to have that state including pre-filling our forms.
        // }
        // Another way
        // here we are using built in prefetch and we prefetch hooks that we are using
        // 'getNotes' is the endpoint
        //'notesList' is the argument
        // force is used to force the query even if it already have the data..
        store.dispatch(notesApiSlice.util.prefetch('getNotes','notesList',{force:true}));
        store.dispatch(usersApiSlice.util.prefetch('getUsers','usersList',{force:true}))

    },[])
  return (
    <Outlet />
  )
}

export default Prefetch