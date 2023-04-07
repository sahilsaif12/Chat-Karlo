import React, { useContext, useEffect, useState } from 'react'
import { Friend } from './Friend'
import './ChatScreen.css'
import { MoreProfile } from './MoreProfile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import chatContext from '../../Context/Chat/chatContext'
import { Spinner } from './Spinner'
export const Sidebar = ({ setchatwindow} ) => {
    let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11.12]
    const { gettingChatMates, chatMates,newuser } = useContext(chatContext)
   
    useEffect(() => {
        gettingChatMates()
        Object.entries(chatMates).map((chat) =>{ console.log(chat)})

    }, [])

    const [openModal, setopenModal] = useState(false)
    return (
        <div className={`sidebar-wrapper ${window.innerWidth > 750 && " animated slideInLeft"} bg-fourth pt-2 `} style={{ "flexGrow": "1" }}>
            <div className="w-100 users-wrapper scrollbar" >

                {!chatMates ?
                    <div className="center h-100 ">
                        <Spinner />
                    </div>
                    :
                    newuser?<div className="grey-text center text-center">
                    Hey first time ? chilll ! <br /> Add your first chat buddy
                    </div>:
                    Object.entries(chatMates).sort((a, b) =>b[1].date?.date -a[1].date?.date).map((chat) =>{
                        return (
                            <Friend setchatwindow={setchatwindow} userInfo={chat[1].userInfo} name={chat[1].userInfo.name} photo={chat[1].userInfo.photo} date={chat[1].date} lastmsg={chat[1].lastMessage} />
                        )
                    })
                    
                }
            </div>

            <div className="p-2">

                <button type="button" onClick={() => { setopenModal(true) }} className="btn my-sm-0 mb-5 btn-default cyan darken-3 text-white bg-fourth btn-lg btn-block" style={{ "textTransform": "capitalize" }}> <span style={{ "fontSize": "16px" }}>+</span> New Chat Buddy</button>

                <span></span>
            </div>

            {openModal && <MoreProfile open={openModal} setOpen={setopenModal} />}
        </div>
    )
}
