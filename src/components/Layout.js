import { Outlet } from "react-router-dom";

import React from 'react'

const Layout = () => {
  return (
    <Outlet />
    // Render the children of outlet component
    // It help to display some consistant design accross various page have same layout.
  )
}

export default Layout