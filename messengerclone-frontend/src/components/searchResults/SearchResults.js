import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function SearchResults(props) {
    const [allUser, setAllUser] = useState([])
    const navigate = useNavigate()

    let fetchAllUsers = async ()=>{
        try{
           await axios
            .get("http://localhost:8080/users/getAllUsers")
            .then((response)=>{
                console.log(JSON.stringify(response.data))
                setAllUser(response.data)
            })
    
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchAllUsers()
    })

    let handleChatButton = (user)=>{
        props.setCurrentChatUser(user)
        navigate("/feed/home")
    }

    return (
        <div 
            style={{
                width:'60%',
                marginLeft:'20%'
            }}
        >
            All users
            {
                allUser.map((user)=>(
                    <div 
                        style={{
                            border:'solid blue 2px',
                            borderRadius:'10px'
                        }}
                    >
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                       <Button onClick={()=>{handleChatButton(user)}}>Chat</Button>
                    </div>
                ))
            }
        </div>
    )
}
const mapDispatchToProps = (dispatch)=>{
    return {
        setCurrentChatUser : (user)=>{
            dispatch({
                payload:user,
                type:'SET_CURRENT_CHAT_USER'
            })
            dispatch({
                payload:user,
                type:'ADD_TO_CHAT_USER_LIST'
            })
        }
    }
}
const mapStateToProps = (state)=>{
    return {
        currentChatUser:state.currentChatUser
    }
}
export default connect( mapStateToProps,mapDispatchToProps)(SearchResults)