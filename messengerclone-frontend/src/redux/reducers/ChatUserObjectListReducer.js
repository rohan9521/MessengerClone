import ActionType from "../actions/ActionType"

const initialState = {
    chatUserObjectList: []
}

const ChatUserObjectListReducer = (state = initialState, action) => {
    console.log(JSON.stringify(action))
    switch (action.type) {
        case ActionType.ADD_USER_OBJECT_LIST: {
            return {
                chatUserObjectList: [...action.payload]
            }
        }
        default:
            return state
    }
}

export default ChatUserObjectListReducer