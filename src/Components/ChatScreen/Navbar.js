import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useContext } from 'react'
import authContext from '../../Context/Auth/authContext'
import { useEffect } from 'react'
import chatContext from '../../Context/Chat/chatContext'

export const Navbar = () => {
    let navigate = useNavigate()
    let { userDetails,currentUser } = useContext(authContext)
    let {dispatch}=useContext(chatContext)
    const handleLogOut = () => {
        dispatch({ type:"LOGGING_OUT"})
        auth.signOut()
    }

    return (
        <div>
            <nav class="py-2 pt-3 navbar navbar-expand-lg navbar-dark bg-second">
                <span className="app-name white-text app-name-chat " style={{ "top": "0", "fontSize": "34px" }} >Chat Karlo</span>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
                    aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navbarSupportedContent-4">
                    <ul class="navbar-nav  ml-auto">
                        <li class="nav-item dropdown active rounded overflow-hidde">
                            <a class="nav-link  p-1 dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <img src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${currentUser.photoURL || userDetails.photo}&flip=true `} className={`rounded-circle    align-self-center`} alt="" style={{ "width": "35px", "height": "35px" }} /> {currentUser.displayName || userDetails.name} </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                                <Link class="dropdown-item " >Edit Details</Link>
                                <Link class="dropdown-item" onClick={handleLogOut}  >Log out</Link>

                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
