import React, { useContext, useEffect, useState } from 'react'
import { Message } from './Message'
import { MDBBtn } from 'mdb-react-ui-kit'
import chatContext from '../../Context/Chat/chatContext'
import { useRef } from 'react'
import authContext from '../../Context/Auth/authContext'
import { Timestamp } from 'firebase/firestore'
import {v4 as uuid } from 'uuid'

export const Chat = ({chatwindow, setchatwindow}) => {
  const [text, settext] = useState('')
  const [img, setimg] = useState(null)
  const { data,postTextMessage,postImgMessage ,getMessages,messages,setmessages } = useContext(chatContext)
  const {currentUser} = useContext(authContext)
const ref = useRef('')
  if (data.chatId) {
    getMessages()
  }

  useEffect(() => {
    if (data.chatId) {
      getMessages()
    }
    }, [messages])
  
  const handleSend=()=>{
    if (img) {
      postImgMessage(img)
      
    } else {
      postTextMessage(text)
      console.log(messages);
    }

    settext("")
    setimg(null)
  }
  return (
    <div className={`msg-box ${window.innerWidth <= 750} && "animated slideInRight"`} style={{ "flexGrow": "3" }}>
    <div className={`animated fadeIn kkkk ${data.chatId==null && "d-none"}`}>
      <div className="receiver-name bg-firs  px-2 white-text">
    {chatwindow &&
    <b onClick={()=>setchatwindow(false)} className="pr-2 " style={{fontSize:"26px",transform:"scale(1.5)"}} >↩</b>
     }
        <img src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${data.user.photo} `} className={`rounded-circle  align-self-center`} alt="" style={{ "width": "35px", "height": "35px" }} />
        {data.user.name}
      </div>
      <div ref={ref} className="messages-wrapper px-3 py-1 scrollbar">
      <div className='scrollbar  messages w-100'>
        {
          messages.map((m,i) => {
            return (
              <Message message={m} last={i==messages.length - 1}  />
            )
          })
        }
        </div>
      </div>
      <div class=" px-2 form-group shadow-textarea d-flex">
        <textarea value={text} onChange={(e)=>settext(e.target.value)} className="form-control scrollbar z-depth-1  white-text" style={{ "backgroundColor": "#00000063", "resize": "none" }} id="exampleFormControlTextarea6" rows="2" placeholder="Message.."></textarea>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          accept="image/*"
          onChange={(e)=>setimg(e.target.files[0])}
        />
        <label htmlFor="file" className=' align-self-center m-1' style={{cursor:"pointer"}} >
          <img src={require('../../images/add img.png')}  style={{width: "40px", height: " 40px"}} alt="" />
        </label>
        <button disabled={text=="" && img==null} type="button" onClick={handleSend} className="btn  rounded teal white-text" style={{ "textTransform": "capitalize", "fontSize": "16px" }} >Send</button>
      </div>
      </div>
      {data.chatId==null && 
      <div className="center h-100">
      <span class="badg text-white-50 rounded font-weight-bold border border-dark   px-3   p-1" style={{background:"rgba(225,225,225,0.15)",fontSize:"13px"}} >Welcome to Chat Karlo</span>
      </div>
      }
    </div>
  )
}
