import React from 'react'
import { connect } from 'react-redux'

function ContactList(props) {
  return (
    <div
      style={{
        height: '88vh',
        width: '30vw',
        border: 'solid green 2px'
      }}
    >
      {
       
        props.chatUserList.map((user) => (
          <div
            style={{
              border: 'solid blue 2px',
              borderRadius: '10px'
            }}
          >
            <p>{user.name}</p>
            <p>{user.email}</p>
           
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

export default connect(mapStateToProps)(ContactList)