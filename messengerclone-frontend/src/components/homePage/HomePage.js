import React from 'react'
import ContactList from '../contactList/ContactList'
import ChatRoom from '../chatRoom/ChatRoom'
import { Outlet } from 'react-router-dom'

function HomePage() {
  return (
    <div>
   
        <div
            style={{
                width:"100%",
                display:'flex',
            }}
        >

            <ContactList />
            <Outlet/>
        </div>
    </div>
  )
}

export default HomePage