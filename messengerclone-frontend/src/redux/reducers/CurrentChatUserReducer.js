const initialState = {
    currentChatUser: {
        name: "",
        passwword: "",
        email: ""
    }
}

const CurrentChatUserReducer = (state = initialState, action) => {
    
    if (action.type == "SET_CURRENT_CHAT_USER") {
        state.currentChatUser = {...action.payload}
    }
    console.log(JSON.stringify(state))
    return {...state}
}

export default CurrentChatUserReducer