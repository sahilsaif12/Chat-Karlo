import React, { useState } from 'react'
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBRadio } from 'mdb-react-ui-kit'
import { useContext } from 'react'
import authContext from '../../Context/Auth/authContext'
import { Spinner } from '../ChatScreen/Spinner'
export const SignUp = ({ setactiveBtn }) => {
  let context = useContext(authContext)
  const { signUp,userNameExistOrNot,signUpError } = context
  const [loading, setloading] = useState(false)
  const [err, seterr] = useState(false)

  let handleSubmit = (e) => {
    seterr(false)
    setloading(true)
    e.preventDefault();
    const userName = e.target[0].value
    const name = e.target[1].value
    const gender = e.target[2].checked ? 'M' : 'F'
    const password = e.target[4].value
    if (password.length <6) {
      seterr("password")
      setloading(false)
    }
    if (name == "") {
      seterr("name")
      setloading(false)
    }
    if (userName == "") {
      seterr("username")
      setloading(false)
    }
    if (name != "" && password.length >= 6 && !signUpError) {
      signUp(userName, name, gender, password)
    }
  }

  let usernameCheck=(username)=>{
    seterr(false)
    userNameExistOrNot(username)
  }
  return (
    <div>

      <form className='animated fadeIn' onSubmit={handleSubmit} >
        <MDBInput onChange={(e)=>usernameCheck(e.target.value)} className={`${err!="username" && !signUpError  && "mb-3"}  white-text `} labelClass='grey-text' type='text' id='form2Example1' label='Username' />
        {err=="username" &&
        <div className="red-text px-2 mb-2">you must give a username</div>
        }
        {signUpError && 
        <div className="red-text px-2 mb-2">{signUpError} </div>
        }
        <MDBInput className={`${err!="name" && "mb-3"}   white-text `} labelClass='grey-text' type='text' id='form2Example2' label='Nick Name' />
        {err=="name"&&
        
        <div className="red-text px-2 mb-">Give yourself a name first</div>
        }

        <div class="custom-control custom-radio custom-control-inline mb-1">
          <input type="radio" class="custom-control-input" id="defaultInline1" name="inlineDefaultRadiosExample" />
          <label class="custom-control-label" for="defaultInline1">Male</label>
        </div>

        <div class="custom-control custom-radio custom-control-inline">
          <input defaultChecked type="radio" class="custom-control-input" id="defaultInline2" name="inlineDefaultRadiosExample" />
          <label class="custom-control-label" for="defaultInline2">Female</label>
        </div>

        <MDBInput className={`${err!="password" && "mb-3"}   white-text `} labelClass='grey-text' type='password' id='form2Example2' label='Password' />
        {err=="password" &&
        <div className="red-text px-2 mb-1"> password should at least 6 characters</div>
        }


        <MDBBtn type='submit' className='mb-4' block>
          Register
        </MDBBtn>

        <div className='text-center'>
          <p>
            Already Chatted before?  <span onClick={() => setactiveBtn('login')} className="blue-text" style={{ cursor: "pointer" }}  >Log In</span>
          </p>

        </div>
        {loading &&
          <div className="center  ">
            <Spinner />
          </div>}
      </form>
    </div>
  )
}

