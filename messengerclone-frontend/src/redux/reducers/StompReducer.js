const initialState = {
    stompClient : null
}

const StompReducer = (state = initialState,action)=>{
    if(action.type == "SET_STOMP_CLIENT"){
        state.stompClient = action.payload
    }
    return {...state}
}

export default StompReducer