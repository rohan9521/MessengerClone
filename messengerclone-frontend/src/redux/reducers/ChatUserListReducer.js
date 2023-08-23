const initialState = {
    chatUserList: {
        userIdList: [],
        userMessages: []
    },
}

const ChatUserListReducer = (state = initialState, action) => {

    if (action.type === "ADD_USER") {
        if (state.chatUserList.userIdList.includes(action.payload.senderUserId)) {
            let indexOfUserId = state.chatUserList.userIdList.indexOf(action.payload.senderUserId)
            let messagesArr = state.chatUserList.userMessages[indexOfUserId]
            state.chatUserList.userMessages[indexOfUserId] = [...messagesArr, action.payload.message]
        } else {
            state.chatUserList.userIdList = [
                ...state.chatUserList.userIdList ,
                action.payload.senderUserId
            ]
            state.chatUserList.userMessages = [
                ...state.chatUserList.userMessages,
                [] 
            ]
        }
    }

    return state
}

export default ChatUserListReducer