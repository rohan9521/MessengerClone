import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";
import CurrentChatUserReducer from "./CurrentChatUserReducer";
import ChatUserListReducer from "./ChatUserListReducer";
import StompReducer from "./StompReducer";

const combineReducer = combineReducers({
    userReducer             : UserReducer,
    currentChatUserReducer  : CurrentChatUserReducer,
    chatUserListReducer     : ChatUserListReducer,
    stompReducer            : StompReducer
})

export default combineReducer