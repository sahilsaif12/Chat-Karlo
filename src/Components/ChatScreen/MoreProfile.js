import React, { useEffect, useState, useRef, useContext } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import { User } from './User';
import { Spinner } from './Spinner';
import chatContext from '../../Context/Chat/chatContext';

export const MoreProfile = ({ open, setOpen }) => {
    let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const { getAllUser, alluser,loading,searchByUsername } = useContext(chatContext)
    const [search, setsearch] = useState('')
    let ref = useRef('')
    let close = useRef('')

    let handleSearch=(text)=>{
        searchByUsername(text)
    }
    useEffect(() => {
        console.log(alluser);
        getAllUser()
        ref.current.click()
    }, [])

    return (
        <>
            {/* <MDBBtn onClick={toggleShow}>Vertically centered modal</MDBBtn> */}

            <div >
                <button type="button" className="btn btn-primary d-none" ref={ref} data-toggle="modal" data-target="#staticBackdrop">
                    Launch static backdrop modal
                </button>

                <div className="modal fade rgba-black-strong " style={{ overflow: 'hidden' }} id="staticBackdrop" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered " role="document">
                        <div className="modal-content rounded msg-box border border-primary shadow-lg " style={{ "height": "80vh" }}>

                            <div className="modal-header border-0  bg-first  text-white">
                                <h5 className="modal-title h5 px-3 text-center " id="staticBackdropLabel">Add more new chat buddy  </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setOpen(false)} style={{ outline: 'none' }}>
                                    <ion-icon size="large" name="close-circle-outline"></ion-icon>
                                </button>
                            </div>

                            <form class="  form-inline m-0 d-flex justify-content-center md-form form-   " onChange={() => console.log("sahil")}>
                                <i class="fas fa-search" aria-hidden="true" style={{ color: 'violet' }}></i>
                                <input class="form-control grey-text form-control-sm ml-3  w-75" style={{ borderBottom: " 2px solid violet " }} type="text" placeholder="Search by Username "
                                    aria-label="Search"
                                    onChange={(e)=>handleSearch(e.target.value)}
                                     />
                            </form>
                            <div className="modal-body   scrollbar">
                                
                                {alluser==null || alluser.length==0 ?  <div className="center h-100 ">
                                        <Spinner />
                                    </div>
                                    :alluser=="notfound"? <div className="text center grey-text ">No such user with this username</div>:
                                     alluser.map((user) => {
                                        return (
                                            <User photo={user.photo} username={user.userName} uid={user.uid} name={user.name} close={close} />
                                        )
                                    })
                                      }
                                
                            </div>

                            <div className="modal-footer border-0 py-1  d-flex justify-content-center  ">
                                <button type="button" className="btn mdb-colo= btn-danger lighten-1 white-text rounded " data-dismiss="modal" ref={close} onClick={() => setOpen(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}