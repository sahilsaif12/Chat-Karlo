import React, {  useReducer, useState } from 'react'
import ChatContext from './chatContext';
import { Timestamp, arrayUnion, collection, doc, endAt, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, startAt, updateDoc, where } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import authContext from '../Auth/authContext';
import { useContext } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {v4 as uuid } from 'uuid'
export default function ChatState(props) {
    const [alluser, setalluser] = useState(null)
    const {currentUser} = useContext(authContext)
const [chatMates, setchatMates] = useState([])
const [newuser, setnewuser] = useState(true)
const [loading, setloading] = useState(true)
const [friends, setfriends] = useState([])
const [messages, setmessages] = useState([])

const getAllUser = async () => {
    
        let users=[]
        const q = query(collection(db, "users"), where("uid", "!=", currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            let a= friends.some((id)=>id===doc.data().uid)
            if (!a) {
                users.push(doc.data());
            }
        });
        

        setalluser(users);
        setloading(false);
        console.log(users);
    }

    const addingToChatBuddy=async (name,username, userUid,userPhoto) =>{
        const combinedID=currentUser.uid>userUid?
        currentUser.uid+userUid : userUid+currentUser.uid
        
        await setDoc(doc(db,"chats",combinedID),{messages:[]})

         await updateDoc(doc(db,"userChats",currentUser.uid),{
            [combinedID + ".userInfo"] :{
                username:username,
                name:name,
                uid:userUid,
                photo:userPhoto
            },
            [combinedID + ".date"]:{
                date:serverTimestamp()
            } 
         })
         
         
         await updateDoc(doc(db,"userChats",userUid),{
             [combinedID + ".userInfo"] :{
                username:currentUser.email.split("@")[0],
                name:currentUser.displayName,
                uid:currentUser.uid,
                photo:currentUser.photoURL
            },
            [combinedID + ".date"]:{
                date:serverTimestamp()
            } 
         })        

        dispatch({type: "CHANGE_USER",payload:{
            username:username,
                name:name,
                uid:userUid,
                photo:userPhoto
        }})
        gettingChatMates()
        
    }
    
    const gettingChatMates=async()=>{
        onSnapshot(doc(db,"userChats",currentUser.uid),(doc)=>{
            setchatMates(doc.data())
            console.log(doc.data());
            if (Object.entries(doc.data()).length>0 ) {
                setnewuser(false)
            }
            let friendUids=[]
            Object.entries(doc.data()).map((i)=>{
                friendUids.push(i[1].userInfo.uid)
            })
            setfriends(friendUids)
        })
    }


    const chatReducer=(state,action)=>{
        switch (action.type) {
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId:
                        currentUser.uid>action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid+currentUser.uid
                }
            
            case "LOGGING_OUT":
                return{
                    user:{},
                    chatId:null
                }
        
            default:
                return state;
        }
    }

    const INITIAL_STATE ={
        chatId:null,
        user:{}
    }
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    const postImgMessage =(img)=>{
        const storageRef=ref(storage,uuid())
        const uploadTask=uploadBytesResumable(storageRef,img)

        uploadTask.on(
            (error)=>{
                console.log("img error: " +error);
                //handle error
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
                    console.log(downloadURL);
                    await updateDoc(doc(db,"chats",state.chatId),{
                        messages:arrayUnion({
                            id:uuid(),
                            img:downloadURL,
                            senderId:currentUser.uid,
                            date:Timestamp.now()
                            
                        })
                    })
                })
            }
        )

        updateDoc(doc(db,"userChats",currentUser.uid),{
            [state.chatId + ".lastMessage"]:{
                text:"📷Photo"
            },
            [state.chatId + ".date"]:{
                date:serverTimestamp()
            }
        })

        updateDoc(doc(db,"userChats",state.user.uid),{
            [state.chatId + ".lastMessage"]:{
                text:"📷Photo"
            },
            [state.chatId + ".date"]:{
                date:serverTimestamp()
            }
        })
        getMessages()
    }

    const postTextMessage = async (text)=>{
        await updateDoc(doc(db,"chats",state.chatId),{
            messages:arrayUnion({
                id:uuid(),
                text:text,
                senderId:currentUser.uid,
                date:Timestamp.now()
            })
        })

        await updateDoc(doc(db,"userChats",currentUser.uid),{
            [state.chatId + ".lastMessage"]:{
                text:text
            },
            [state.chatId + ".date"]:{
                date:serverTimestamp()
            }
        })

        await updateDoc(doc(db,"userChats",state.user.uid),{
            [state.chatId + ".lastMessage"]:{
                text:text
            },
            [state.chatId + ".date"]:{
                date:serverTimestamp()
            }
        })
        getMessages()

    }

    const getMessages=()=>{
        onSnapshot(doc(db,"chats",state.chatId),(doc)=>{
            doc.exists() && setmessages(doc.data().messages)
        })
    }

    const searchByUsername=async(username)=>{
        
        let users=[]
        const q = query(collection(db, "users"),where("userName", "!=", currentUser.email.split("@")[0]), orderBy("userName"),startAt(username),endAt(username+"\uf8ff"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            let a= friends.some((id)=>id==doc.data().uid)
            if (!a) {
                users.push(doc.data());
            }
        });
        
        setalluser(users);

        if (users.length==0) {
            setalluser("notfound")
        }
        // setalluser([])
        console.log(users);
    }

  
    return (
        <ChatContext.Provider value={{ getAllUser,alluser,addingToChatBuddy,chatMates,gettingChatMates,newuser,loading,data:state,dispatch,friends,postImgMessage,postTextMessage,getMessages ,messages, 
        searchByUsername,setmessages}}>
            {props.children}
        </ChatContext.Provider>
    )
}
