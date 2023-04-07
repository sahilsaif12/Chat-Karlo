import React, { useState } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { Chat } from './Chat'

export const ChatScreen = () => {
  const [mobile, setmobile] = useState(window.innerWidth <= 750)
  const [chat, setchat] = useState(false)

  return (
    <div>
      <Navbar />
      {window.innerWidth > 750 ?
        <div className="d-flex">
          <Sidebar />
          <Chat />
        </div>
        : chat ?
          <Chat chatwindow={chat} setchatwindow={setchat} />
          :
          <Sidebar  setchatwindow={setchat} />

      }
    </div>
  )
}
