const initialState = {
    user: {
        name: "",
        passwword: "",
        email: ""
    }
}

const UserReducer = (state = initialState, action) => {
    console.log(JSON.stringify(action))
    if (action.type == "SET_USER") {
        state.user = action.payload
    }
    return state
}

export default UserReducer