import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { connect } from 'react-redux';

function ChatRoom(props) {
  const [message, setMessage] = useState()
 // console.log(JSON.stringify(props))
  let sendMessage = () => {
    props.stompClient
      .send("/user/" + props.currentChatUser.userId + "/private-message"
        , {},
        {
          senderUserId   : props.user.userId,
          recieverUserId : props.currentChatUser.userId, 
          message:message,
        }
      )
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
      </div>
      <div
        style={{

          display: 'flex',
          paddingLeft: '1%',
          paddingRight: '1%'
        }}
      >
        <TextField onChange={(e) => { setMessage(e.target.value) }} id="standard-helperText" fullWidth={true} label="" variant="standard" />

        <Button onClick={() => { }} style={{ color: 'blue' }} variant="outlined">Send</Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentChatUser: state.currentChatUserReducer.currentChatUser,
    stompClient: state.stompReducer.stompClient,
    user        : state.userReducer.user
  }
}

export default connect(mapStateToProps)(ChatRoom)