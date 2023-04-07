import React, { useContext, useRef } from 'react'
import authContext from '../../Context/Auth/authContext'
import chatContext from '../../Context/Chat/chatContext'
import { useEffect } from 'react'

export const Message = ({message,last}) => {
  const {currentUser} = useContext(authContext)
  const {data} = useContext(chatContext)
  const ref = useRef('')
  let d=new Date(message.date.seconds *1000)
  let time=d.toLocaleTimeString("us",{hour:"numeric",minute:"numeric"})
  // console.log(message.date.seconds);
    let ownerSide=message.senderId===currentUser.uid
    useEffect(() => {
      if (last) {
        ref.current?.scrollIntoView({ behavior: "smooth" });
        
      }
      // element.scrollTop = element.scrollHeight;

      // ref.current.scrollTop=ref.current.scrollHeight
    }, [])
    
    // console.log(`https://api.dicebear.com/6.x/lorelei/svg?seed=${ownerSide ?currentUser.photoURL+ "&flip=true":data.user.photo}`);
  return (
    <div ref={ref} className={`d-flex mb-3 ${ownerSide && "flex-row-reverse"} `}>
    <img src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${ownerSide ?currentUser.photoURL+ "&flip=true":data.user.photo} `} className={`rounded-circle border border-primary   ${ownerSide?"bg-third":"bg-fourth"} align-self-end`} alt="" style={{"width":"45px","height":"45px"}} />
    <div className="d-flex flex-column align-items-start mx-3 white-text">
        <span className={`msg-username ${ownerSide&&"  sender-msg-username"}  px-2 bg-fourth"`} style={{"fontSize":"12px"}}>{ownerSide?currentUser.email.split("@")[0]: data.user.username} </span>
        {
          message.img ?
        <div   className={`msg ${ownerSide?"bg-fifth  sender-msg":"bg-fourth"} p-2 align-self-center`} style={{"width":"auto","height":"auto"}}>
        <img src={message.img} className='rounded' style={{"width":"300px", maxHeight:'50vh'}} alt=""  />
        <div className={` ${message.imgText && "p-1"} }   `} style={{"maxWidth":"300px"}}>{message.imgText}</div>

        </div>
        :
        <div className={`msg px-3 py-2 ${ownerSide?"bg-fifth sender-msg":"bg-third"}   `} style={{"maxWidth":"450px"}} >{message.text} </div>

        }
        <div className="msg-time align-self-end grey-text mt-1" style={{"fontSize":"12px"}}>{time}</div>
    </div>
    </div>
  )
}

