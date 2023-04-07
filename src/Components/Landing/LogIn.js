
import React, { useContext, useEffect, useState } from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import authContext from '../../Context/Auth/authContext';
import { Spinner } from '../ChatScreen/Spinner';

export const LogIn = ({ setactiveBtn }) => {
  let context = useContext(authContext)
  const { logIn,loginError } = context
  const [loading, setloading] = useState(false)

  const handleSubmit = (e) => {
    setloading(true)
    e.preventDefault();
    let username = e.target[0].value
    let password = e.target[1].value
    logIn(username, password)
  }

  // useEffect(() => {
  //   setloading(false)
  // }, [])
  
  return (
    <form onSubmit={handleSubmit} className='animated fadeIn ' style={{ "minHeight": "290px" }}>
      <MDBInput className='mb-4 white-text ' labelClass='grey-text' type='text' id='form2Example1 ' label='Username' />
      <MDBInput className='mb-4 white-text ' labelClass='grey-text' type='password' id='form2Example2' label='Password' />

      <MDBBtn type='submit' className='mb-4' block>
        Log In
      </MDBBtn>

      <div className='text-center'>
        <p>
          Not a member? <span onClick={() => setactiveBtn('signup')} className="blue-text" style={{ cursor: "pointer" }}  >Sign Up</span>

        </p>
      </div>
      {loading && !loginError &&
        <div className="center  ">
          <Spinner />
        </div>}
        {
          loginError && 
          <div className="center  ">
          <div className="red-text px-2 my-2">{loginError} </div>
        </div>
        }
    </form>
  );
}

