import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";


import {apiSlice} from '../../app/api/apiSlice'


const notesAdapter= createEntityAdapter({
    sortComparer: (a,b) => (a.completed ===b.completed) ? 0 : a.completed ? 1: -1
});

const initialState=notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints : builder =>({
        getNotes : builder.query({
            query: () =>({
                url:'/notes',
                validateStatus: (response,result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            // keepUnusedDataFor:5, // this is in seconds
            transformResponse: responseData =>{
                const loadedNotes = responseData.map(note =>{
                    note.id = note._id;
                    // this is because in normalize data it will going to look for id property not _id.
                    return note
                });
                return notesAdapter.setAll(initialState,loadedNotes);
            }
            ,providesTags: (result,err,arg) =>{
                if(result?.ids){
                    return [
                        {type:'Note',id:'LIST'},
                        ...result.ids.map(id => ({
                            type:'Note',id
                        }))
                    ]
                }else return[{type :'Note' ,id:'LIST'}]
            }
        }),
        addNewNote:builder.mutation({
            query:initialNote =>({
                url:'/notes',
                method:'POST',
                body:{
                    ...initialNote
                }
            }),
            invalidatesTags:[
                {type:'Note', id:'LIST'}
            ]
        }),
        updateNote:builder.mutation({
            query:initialNote=>({
                url:'/notes',
                method:'PATCH',
                body:{
                    ...initialNote,
                }
            }),
            invalidatesTags:(result,error,arg) =>[
                {type:'Note',id:arg.id}
            ]
        }),
        deleteNote:builder.mutation({
            query:({id}) =>({
                url:'/notes',
                method:'DELETE',
                body:{
                    id
                }
            }),
            invalidatesTags:(result,error,arg)=>[
                {type:'Note',id:arg.id}
            ]
        })
    })
})

export const {
    useGetNotesQuery,
    useAddNewNoteMutation,
    useDeleteNoteMutation,
    useUpdateNoteMutation
}= notesApiSlice


// returns the query result object
export const selectNoteResult  = notesApiSlice.endpoints.getNotes.select()

//  create memoized selector 
const selectNoteData = createSelector(
    selectNoteResult,
    notesResult => notesResult.data // normalized state object with ids & entities.
)
// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll :selectAllNotes,
    selectById:selectNoteById,
    selectIds:selectNoteIds
    // pass in a selector that returns the notes slice of state
}= notesAdapter.getSelectors(state=> selectNoteData(state) ?? initialState) 