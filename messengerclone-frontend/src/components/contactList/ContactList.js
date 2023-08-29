import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import fetchAllUsers from '../../redux/actions/FetchUsersAction'

function ContactList(props) {
  console.log(JSON.stringify(props))
  const [chatUserList, setChatUserList] = useState([])
  const [userIdList, setUserIdList] = useState(props.chatUserList.userIdList)
  useEffect(() => {
   props.fetchUserObjectList(props.chatUserList.userIdList)
  }, [props.chatUserList.userIdList])

  let openUserChat = (user) => {
    console.log(user)
    props.setCurrentChatUser(user)
  }

  return (
    <div
      style={{
        height: '88vh',
        width: '30vw',
        border: 'solid green 2px'
      }}
    >
      {
       props.chatUserObjectList.map((user) => (
            <div
              style={{
                border: 'solid blue 2px',
                borderRadius: '10px',
                padding:'1%',
                margin: '2%'
              }}
              onClick={() => { openUserChat(user) }}
            >
              <p style={{ wordBreak: 'break-all' }}>{user.email}</p>
            </div>
       ))
      }
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    chatUserList: state.chatUserListReducer.chatUserList,
    chatUserObjectList : state.chatUserObjectListReducer.chatUserObjectList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentChatUser: (user) => {
      dispatch({
        payload: { ...user },
        type: "SET_CURRENT_CHAT_USER"
      })
    },
    fetchUserObjectList: (userIdList) => {
      dispatch(fetchAllUsers(userIdList))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)