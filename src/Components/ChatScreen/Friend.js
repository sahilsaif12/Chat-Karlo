import React,{useContext} from 'react'
import chatContext from '../../Context/Chat/chatContext'

export const Friend = ({name,photo,date,lastmsg,userInfo}) => {
  const {dispatch,data} = useContext(chatContext)
  let d=new Date(date.date?.seconds *1000)
  let today=new Date()
  let time=''
  if (d.toDateString()==today.toDateString()) {
    time= d.toLocaleTimeString("us",{hour:"numeric",minute:"numeric"})    
  }
  else{
    if (Math.floor((today-d)/1000/60/60)<24) {
      time= "Yesterday"
    }else{
      time= d.toLocaleDateString("us",{day:"numeric",month:"numeric",year:"numeric"})

    }
 

  }
  //   console.log(new Date(d.getTime()-today.getTime()).getHours());
  // }
  // let time=d.toLocaleTimeString("us",{hour:"numeric",minute:"numeric"})
//  console.log(date);
  let handleSelect=()=>{
    dispatch({type: 'CHANGE_USER',payload:userInfo})
  }
  
  return (
    <div className={`d-flex user ${data.user.uid==userInfo.uid && "user-selected" }  p-2  w-100`} onClick={handleSelect} >
    <div className=" center">
    <img src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${photo}`} className='rounded-circle border border-primary  bg-third' alt="" style={{"width":"60px","height":"60px"}} />
    </div>
    <div className="d-flex w-100  flex-column justify-content-around p-1 ml-3 ">
    <div className="d-flex w-100 justify-content-between">
        <h5 className='m-0' style={{"color":"#CBE4DE"}}>{name}</h5>
        <div className="msg-time align-self-end grey-text mt-1" style={{"fontSize":"12px"}}>{time}</div>
    </div>
        <p className='grey-text hide-long-msg mb-1'>{lastmsg?.text} </p>
    </div>
    
    </div>
  )
}
