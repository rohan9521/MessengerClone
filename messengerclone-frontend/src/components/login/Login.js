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
    const navigate = useNavigate()
    const [user, setUser] = useState({

    })
    let navigateToHomePage = () => {
        navigate('/feed/home')
    }
    let setUserInStore = () => {
        axios
            .post("http://localhost:8080/users/saveUser", user)
            .then( (response) => {
                console.log(response)
                props.setUser(response.data)
                setUser({...response.data,userId:response.data.userId})
                console.log("response" + JSON.stringify(response.data))
                console.log("user" + JSON.stringify(user))
                connect()
            })
        navigateToHomePage()
    }

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, () => { });
    }

    const onConnected = () => {
        console.log("connected")
        stompClient.subscribe('/user/' + user.userId + '/private-message', () => { });
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
                    <TextField onChange={(e) => { setUser(user => ({ ...user, name: e.target.value })) }} id="standard-helperText" fullWidth={true} label="UserName" variant="standard" />
                    <TextField onChange={(e) => { setUser(user => ({ ...user, email: e.target.value })) }} id="standard-helperText" fullWidth={true} label="Password" variant="standard" />
                    <TextField onChange={(e) => { setUser(user => ({ ...user, password: e.target.value })) }} id="standard-helperText" fullWidth={true} label="UserName" variant="standard" />
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
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => { dispatch({ payload: user, type: "SET_USER" }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)