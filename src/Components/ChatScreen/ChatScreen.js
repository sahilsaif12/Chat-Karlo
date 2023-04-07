import React from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { Chat } from './Chat'

export const ChatScreen = () => {
  return (
    <div>
    <Navbar/>
    <div className="d-flex">
        <Sidebar />
        <Chat/>
    </div>
    </div>
  )
}
