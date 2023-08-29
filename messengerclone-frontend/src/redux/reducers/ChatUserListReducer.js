import ActionType from "../actions/ActionType"

const initialState = {
    chatUserList: {
        userIdList: [],
        userMessages: [],
        userObjectList: []
    },
}

const ChatUserListReducer = (state = initialState, action) => {

    console.log(JSON.stringify(action))

    switch (action.type) {
        // case ActionType.ADD_USER_OBJECT_LIST: {
   

        //     return {
        //         chatUserList: {
        //             userIdList: state.chatUserList.userIdList,
        //             userMessages: state.chatUserList.userMessages,
        //             userObjectList: [ ...action.payload]
        //         }
        //     }
        // }
        case "ADD_USER": {
            if (state.chatUserList.userIdList.includes(action.payload.senderUserId)) {
                let indexOfUserId = state.chatUserList.userIdList.indexOf(action.payload.senderUserId)
                let messagesArr = state.chatUserList.userMessages[indexOfUserId]
                console.log("MessagesList"+JSON.stringify(state.chatUserList.userMessages))
                messagesArr.push(action.payload.message)
               state.chatUserList.userMessages[messagesArr] = messagesArr
               
                return {
                    chatUserList: {
                        userIdList: state.chatUserList.userIdList,
                        userMessages: [...state.chatUserList.userMessages],
                        userObjectList: [...state.chatUserList.userObjectList]
                    }
                }
            } else {
             
                let newUserIdList = [
                    ...state.chatUserList.userIdList,
                    action.payload.senderUserId
                ]

                let newMessageArrForuser = []
                newMessageArrForuser.push(action.payload.message)
                let newUserMessagesList = [
                    ...state.chatUserList.userMessages,
                    newMessageArrForuser
                ]
                console.log("InAdduserElse"+JSON.stringify(newUserIdList))
                return {
                    chatUserList: {
                        userIdList: newUserIdList,
                        userMessages: newUserMessagesList,
                        userObjectList: state.chatUserList.userObjectList
                    }
                }
            }
        }
        default:
            return state
    }


}

export default ChatUserListReducer