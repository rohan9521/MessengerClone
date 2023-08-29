import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";
import CurrentChatUserReducer from "./CurrentChatUserReducer";
import ChatUserListReducer from "./ChatUserListReducer";
import StompReducer from "./StompReducer";
import ChatUserObjectListReducer from "./ChatUserObjectListReducer";

const combineReducer = combineReducers({
    userReducer: UserReducer,
    currentChatUserReducer: CurrentChatUserReducer,
    chatUserListReducer: ChatUserListReducer,
    stompReducer: StompReducer,
    chatUserObjectListReducer: ChatUserObjectListReducer
})

export default combineReducer