import React, { useState } from 'react'
import './LandingPage.css'
import { SignUp } from './SignUp'
import { LogIn } from './LogIn'
import { MDBCol } from 'mdb-react-ui-kit'
export const LandingPage = () => {
  const [activeBtn, setactiveBtn] = useState('login')
  return (
    <div className="main-container text-white">
    <span className="app-name ">Chat Karlo</span>
      <div className="p-4 container  vh-100 center ">
        <div className="w-75 h-100 center">
          <div className={`img-container w-100 ${window.innerWidth<800&&"d-none"} `}>
            <img src={require('../../images/chatting_illu.png')} style={{ "maxWidth": "550px" }} className='w-100' alt="" />
          </div>
          <div className="  glass-effect py-4  w-100 d-flex justify-content-center" style={{ "minHeight": "410px","minWidth":"300px" }} >
            <div className='w-75 d-flex justify-content-between flex-column' style={{ "maxWidth": "550px" }}>
              <div className="btn-group mb-3 align-self-center" role="group" aria-label="Button Group">
                <button type="button" className={`btn  rounded ${activeBtn == 'login' ? 'teal darken-3 border border-white text-white' : 'cyan darken-4 grey-text'} `} onClick={() => setactiveBtn('login')}>Log In</button>
                <button type="button" className={`btn  rounded ${activeBtn == 'signup' ? 'teal darken-3 border border-white text-white' : 'cyan darken-4 grey-text'} `} onClick={() => setactiveBtn('signup')}>sign Up</button>
              </div>
              {
                activeBtn == 'signup' ? <SignUp setactiveBtn={setactiveBtn} /> : <LogIn setactiveBtn={setactiveBtn} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}