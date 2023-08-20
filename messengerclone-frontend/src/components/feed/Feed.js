import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

function Feed() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}

export default Feed