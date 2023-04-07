import React, { useContext, useEffect, useState } from 'react'
import chatContext from '../../Context/Chat/chatContext';

export const User = ({username,photo,uid,name,close}) => {
    const [hover, sethover] = useState(false);
    const {addingToChatBuddy,friends} = useContext(chatContext)
    
    const handleClick=()=>{
        addingToChatBuddy(name,username,uid,photo)
        close.current.click()
    }
  return (
    <div  >
<div className={` d-flex align-items-center justify-content-between mb-3 p-1 border border-secondary rounded rgba-purple-slight ${hover?"rgba-purple-light":"rgba-purple-slight"} ` } onMouseOver={()=>{sethover(true)}} onMouseLeave={()=>{sethover(false)}}  >
<div className="d-flex ml-2 ">

    <img src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${photo} `} className={`rounded-circle bg-fourth align-self-center`} alt="" style={{"width":"45px","height":"45px"}} />
    <div className={`white-text px-4 py-2   `} style={{"maxWidth":"450px",fontFamily:"Edu NSW ACT Foundation",fontSize:"19px"}} >{name}</div>
    <div className={`white-text px-3 py-2   `} style={{"maxWidth":"450px",fontFamily:"Edu NSW ACT Foundation",fontSize:"19px"}} >{username}</div>
</div>
    <div className="p-2 " onClick={handleClick} style={{cursor:"pointer"}} >
    <ion-icon name="send"  ></ion-icon>

    </div>
    </div>    
    </div>
  )
}
