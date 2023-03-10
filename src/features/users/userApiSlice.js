import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";


import {apiSlice} from '../../app/api/apiSlice'


const usersAdapter= createEntityAdapter({});

const initialState=usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints : builder =>({
        getUsers : builder.query({
            query: () =>({
                url:'/users',
                validateStatus:(response,result) =>{
                    return response.status ===200 && !result.isError
                }
            }),
            // keepUnusedDataFor:5, // this is in seconds(this is the subscription which hold data for 5 second only by default it is 60s.) commenting because we want active subscription.
            transformResponse: responseData =>{
                const loadedUsers = responseData.map(user =>{
                    user.id = user._id;
                    // this is because in normalize data it will going to look for id property not _id.
                    return user
                });
                return usersAdapter.setAll(initialState,loadedUsers);
            }
            ,providesTags: (result,err,arg) =>{
                if(result?.ids){
                    return [
                        {type:'User',id:'LIST'},
                        ...result.ids.map(id => ({
                            type:'User',id
                        }))
                    ]
                }else return[{type :'User' ,id:'LIST'}]
            }
        }),
        addNewUser: builder.mutation({
            query:initialUserData => ({
                 url:'/users',
                 method:'POST',
                 body:{
                    ...initialUserData,
                 }
            }),
            invalidatesTags:[
                {type:'User',id:'LIST'}
            ]
        }),
        updateUser: builder.mutation({
            query:initialUserData =>({
                url:'/users',
                method:'PATCH',
                body:{
                    ...initialUserData
                }
            }),
            invalidatesTags:(result,error,arg)=>[
                {type:'User', id:arg.id} // arg.id is id of user that we pass
            ]
        }),
        deleteUser:builder.mutation({
            query:({id}) =>({
                url:'/users',
                method:'DELETE',
                body:{id}
            }),
            invalidatesTags:(result,error,arg)=>[
                {type:'User',id:arg.id}
            ]
        })
    })
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation
}= usersApiSlice


// returns the query result object
export const selectUserResult  = usersApiSlice.endpoints.getUsers.select()

//  create memoized selector 
const selectUserData = createSelector(
    selectUserResult,
    usersResult => usersResult.data // normalized state object with ids & entities.
)
// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll :selectAllUsers,
    selectById:selectUserById,
    selectIds:selectUserIds
    // pass in a selector that returns the users slice of state
}= usersAdapter.getSelectors(state=> selectUserData(state) ?? initialState) 