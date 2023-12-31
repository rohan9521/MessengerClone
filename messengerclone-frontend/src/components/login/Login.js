import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import userEvent from '@testing-library/user-event';
function Login(props) {
    var stompClient = null;
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const [user, setUser] = useState({})
    let navigateToHomePage = () => {
        navigate('/feed/home')
    }
    let setUserInStore = async () => {
        await axios
            .post("http://localhost:8080/users/saveUser", {
                name: name,
                email: email,
                password: password
            })
            .then(async (response) => {
                console.log(response)
                props.setUser(response.data)
                // await setUser({
                //   ...response.data
                // })

                console.log("response" + JSON.stringify(response.data.userId))
                console.log("user" + JSON.stringify(props))
                connect()
            })
        props.setStompClient(stompClient)
        navigateToHomePage()
    }

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, () => { });
    }

    let onPrivateMessageRecieved = (payload) => {
        console.log("privateMessagePayload" + JSON.stringify(payload))
        props.setUserMessages({
            ...payload.body
        })
    }

    const onConnected = () => {
        console.log("connected" + props.user.userId)
        stompClient.subscribe('/user/' + props.user.userId + '/private-message', onPrivateMessageRecieved);
        userJoin();
    }



    const userJoin = () => {
        var chatMessage = {
            senderName: user.name,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    useEffect(() => {
        // axios
        //     .delete("http://localhost:8080/users/deleteAllUsers")
        //     .then(()=>{
        //         console.log("deleted")
        //     })
        console.log("useeffectUser" + JSON.stringify(user))
    })

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        }}>
            <Card
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                sx={{ maxWidth: 345 }}>

                <CardContent>
                    <Typography variant="h5" component="div">
                        Login
                    </Typography>
                    <TextField onChange={(e) => { setName(e.target.value) }} id="standard-helperText" fullWidth={true} label="UserName" variant="standard" />
                    <TextField onChange={(e) => { setEmail(e.target.value) }} id="standard-helperText" fullWidth={true} label="Email" variant="standard" />
                    <TextField onChange={(e) => { setPassword(e.target.value) }} id="standard-helperText" fullWidth={true} label="password" variant="standard" />
                </CardContent>
                <CardActions>
                    <Button onClick={setUserInStore} style={{ color: 'blue' }} variant="outlined">Login</Button>
                </CardActions>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch({
                payload: user,
                type: "SET_USER"
            })
        },
        setStompClient: (stompClient) => {
            dispatch({
                payload: stompClient,
                type: "SET_STOMP_CLIENT"
            })
        },
        setUserMessages: (chatMessage) => {
            dispatch({
                payload: {
                    senderUserId: chatMessage.senderUserId,
                    message: chatMessage.content
                },
                type: "ADD_TO_CHAT_USER_LIST"
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)