import React, { useEffect, useState } from 'react'
import AuthContext from './authContext';

// import { useHistory } from "react-router-dom";
// import { getAuth, signInWithCustomToken } from "firebase";
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { schema } from '@dicebear/core';
import { micah } from '@dicebear/collection';

export default function AuthState(props) {
  let navigate=useNavigate()
  let femaleAvatar=['Mimi','Miss kitty','Boo','Nala','Loki','Harley','Jasmine','Gizmo','Annie','Lola','Cleo','Simon','Molly','Kiki','Mimi',]
  let maleAvatar=['Mittens','Simba','Whiskers','Rocky','Jasper','Chester','Sam','Pepper','Rocky','Zoe','Jack','Bella','Snickers','Chester','Dhoni',]
const [userDetails, setuserDetails] = useState({})
  const [currentUser, setcurrentUser] = useState([])
  
const [loginError, setloginError] = useState("")
const [signUpError, setsignUpError] = useState(false)

  useEffect(() => {
    const unsub=onAuthStateChanged(auth,(user)=>{
      setcurrentUser(user)
    })
  
    return () => {
      unsub()
    }
  }, [])
  
  const signUp = (userName, name, gender, password) => {
    const email = userName + "@email.com";
    let idx=Math.floor(Math.random() * femaleAvatar.length)
    const photo=gender=='M'?maleAvatar[idx]:femaleAvatar[idx]
    setuserDetails({
      name:name,
      photo:photo
    })
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        updateProfile(user,{
          displayName:name,
          photoURL:photo
        })
        setcurrentUser(user)
        
        setDoc(doc(db,"users",user.uid),{
          userName:userName,
          name:name,
          gender:gender,
          uid:user.uid,
          password:password,
          photo:photo
        })

        setDoc(doc(db,"userChats",user.uid),{})
        // ...
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  }

  const logIn = (userName, password) => {
    setloginError(false)
    let email=userName + "@email.com";
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setuserDetails({
          name:user.displayName,
          photo:user.photoURL
        })
        navigate('/')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setloginError("Invalid Username or Password")
      });
  }

  const userNameExistOrNot=async(username) => {
    setsignUpError(false)
    const q = query(collection(db, "users"),where("userName", "==", username));
    const querySnapshot = await getDocs(q);
    let users=[]
    querySnapshot.forEach((doc) => {
          users.push(doc.data());
  });
    if (users.length>0) {
        setsignUpError("username already exists. Try another")
    }
    
    
    
}
  return (
    <AuthContext.Provider value={{ signUp,logIn,currentUser,userDetails,userNameExistOrNot,signUpError,loginError }}>
      {props.children}
    </AuthContext.Provider>
  )
}
