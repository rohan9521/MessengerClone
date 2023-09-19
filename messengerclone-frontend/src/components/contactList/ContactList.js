import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import fetchAllUsers from '../../redux/actions/FetchUsersAction'
import ContactVIew from './ContactVIew'

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
                margin: '2%'
              }}
              onClick={() => { openUserChat(user) }}
            >
              <ContactVIew user={user}/>
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