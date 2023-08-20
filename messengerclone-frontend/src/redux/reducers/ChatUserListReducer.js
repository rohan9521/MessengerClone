const initialState = {
   chatUserList: []
}

const ChatUserListReducer = (state = initialState, action) => {
    if (action.type == "ADD_TO_CHAT_USER_LIST") {
        state.chatUserList.push(action.payload)
    }
    return state
}

export default ChatUserListReducer