import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import fetchAllUsers from '../../redux/actions/FetchUsersAction'

var stompClient = null
function ChatRoom(props) {
  const[currentReciever,setCurrentReciever] = useState('')
  const [message, setMessage] = useState()
  const [incomingMessageList, setIncomingMessageList] = useState([])

  const [connected, setConnected] = useState(false)
  console.log(JSON.stringify(props))
  let sendMessage = (message) => {
    if (connected && stompClient != null) {
      stompClient
        .send("/user/" + props.currentChatUser.userId + "/private-message"
          , {},
          JSON.stringify({
            senderUserId: props.user.userId,
            receiverUserId: props.currentChatUser.userId,
            message: message,
            status: '',
            date: Date()
          })
        )
    }
  }
  useEffect(() => {
    connect(props.user.userId)
  }, [])

  useEffect(()=>{
    if(props.currentChatUser.email!=''){
      let index = props.chatUserList.userIdList.indexOf(props.currentChatUser.userId)
      let messages = props.chatUserList.userMessages[index]
      setIncomingMessageList([...messages])
      setCurrentReciever(props.currentChatUser)
  
    }
  },[props.currentChatUser])

  useEffect(()=>{
    if(props.currentChatUser.email!=''){
      let index = props.chatUserList.userIdList.indexOf(props.currentChatUser.userId)
      let messages = props.chatUserList.userMessages[index]
      setIncomingMessageList([...messages])
      setCurrentReciever(props.currentChatUser)
  
    }
  },[props.chatUserList.userMessages])

  const connect = (userId) => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, () => { onConnected(userId) }, () => { });
  }

  let onPrivateMessageRecieved = (payload) => {
    console.log("privateMessagePayload" + JSON.stringify(JSON.parse(payload.body)))
    props.setUserMessages(
      JSON.parse(payload.body)
    )
    console.log("InAdduser" + JSON.stringify(props.chatUserList.userIdList))

    if (JSON.parse(payload.body).senderUserId === props.currentChatUser)
      setIncomingMessageList([...incomingMessageList, JSON.parse(payload.body).message])
  }

  const onConnected = (userId) => {
    console.log("connected" + props.user.userId)
    stompClient.subscribe('/user/' + userId + '/private-message', onPrivateMessageRecieved, {});

    setConnected(true)
  }

  return (
    <div
      style={{
        width: '100%',
      }}
    >

      <div
        style={{
          height: '90%'
        }}
      >
        {props.currentChatUser.userId}
        {incomingMessageList.map((messages) => (
          <div>{messages}</div>
        ))}
      </div>
      <div
        style={{

          display: 'flex',
          paddingLeft: '1%',
          paddingRight: '1%'
        }}
      >
        <TextField onChange={(e) => { setMessage(e.target.value) }} id="standard-helperText" fullWidth={true} label="" variant="standard" />

        <Button onClick={() => { sendMessage(message) }} style={{ color: 'blue' }} variant="outlined">Send</Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentChatUser: state.currentChatUserReducer.currentChatUser,
    stompClient: state,
    user: state.userReducer.user,
    chatUserList: state.chatUserListReducer.chatUserList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    setUserMessages: (chatMessage) => {
      console.log(JSON.stringify(chatMessage))
      dispatch({
        payload: {
          senderUserId: chatMessage.senderUserId,
          message: chatMessage.message
        },
        type: "ADD_USER"
      })
    },
    fetchUserObjectList: (userIdList) => {
      dispatch(fetchAllUsers(userIdList))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)