// this component is used to protect routes even if someone try to enter  non-permission component.




import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({allowedRoles}) => {
const location = useLocation();

const {roles} = useAuth();

const content = (
    roles.some(role  => allowedRoles.includes(role))
    ? <Outlet /> : <Navigate to='/login' state={{from:location}} replace /> 
)
return content;
}

export default RequireAuth