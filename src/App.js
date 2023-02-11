import { Routes,Route } from "react-router-dom";
import DashLayout from "./components/DashLayout";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Public from "./components/Public";
import Welcome from "./features/auth/Welcome";
import NoteList from "./features/notes/NoteList";
import UserList from "./features/users/UserList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote  from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";


function App() {

  useTitle('Dan D. Repairs')
  return (
   <Routes>
    <Route path="/" element={<Layout />} >
    <Route index element={<Public />} /> 
    {/* Here index let's us know that it is not showing layout instead this is the default component that it will show. */}
   <Route path="login" element={<Login />} />
   

    {/* Potected Routes */}

   <Route element={<PersistLogin/>}>
   <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />} >
   <Route element={<Prefetch />}>
    
   <Route path="dash" element={<DashLayout />} >
   <Route index element={<Welcome />} />  {/* /dash */}
   
   <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Manager]} />} >

   <Route path="users">
    <Route index element={<UserList />} /> 
    {/* /dash/users */}
    <Route path=":id" element={<EditUser />} />
    <Route path="new" element={<NewUserForm />} />
   </Route>
   </Route>

   <Route path="notes">
   <Route index element={<NoteList />} /> 
   {/* /dash/notes */}
   <Route path=":id" element={<EditNote />} />
   <Route path='new' element={<NewNote />} />
    </Route>

   </Route>{/* End Dash */}
   </Route>
   </Route>
</Route> {/*End of Protected routes. */}
   </Route>
   </Routes>
  );
}

export default App;
