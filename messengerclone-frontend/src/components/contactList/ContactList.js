import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

function ContactList(props) {
  const [chatUserList, setChatUserList] = useState([])

  useEffect(() => {
    console.log(JSON.stringify({
      userIdList: props.chatUserList.userIdList
    }))

    axios.interceptors.request.use(request => {
      console.log('Starting Request', JSON.stringify(request, null, 2))
      return request
    })
      axios.post("http://localhost:8080/users/getUsersByIds",
        { 
          userIdList: props.chatUserList.userIdList 
        })
      .then((response) => {
        console.log(JSON.stringify(response))
        setChatUserList(response.data)
      })
      .catch((error) => {
        console.log(JSON.stringify(error))
      })
  }, [])

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

        chatUserList.map((user) => (
          <div
            style={{
              border: 'solid blue 2px',
              borderRadius: '10px'
            }}
            onClick={() => { openUserChat(user) }}
          >
            <p style={{wordBreak:'break-all'}}>{JSON.stringify(user)}</p>
          </div>
        ))
      }

    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    chatUserList: state.chatUserListReducer.chatUserList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentChatUser: (user) => {
      dispatch({
        payload: {...user},
        type: "SET_CURRENT_CHAT_USER"
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)