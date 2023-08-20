import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";
import CurrentChatUserReducer from "./CurrentChatUserReducer";
import ChatUserListReducer from "./ChatUserListReducer";

const combineReducer = combineReducers({
    userReducer: UserReducer,
    currentChatUserReducer: CurrentChatUserReducer,
    chatUserListReducer: ChatUserListReducer
})

export default combineReducer