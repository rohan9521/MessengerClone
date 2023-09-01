
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [loggedIn, setLoggedIn] = useState(false)

    let navigateToHomePage = () => {
        navigate('/feed/home')
    }
    let setUserInStore = async () => {
        console.log(JSON.stringify(props))

        await axios
            .get("http://localhost:8080/users/getUserByEmail/" + email)
            .then((response) => {
                console.log(response)
                setUser({
                    ...response.data
                })

                props.setUser({ ...response.data })

                console.log(JSON.stringify(props))

                console.log("response" + JSON.stringify(response.data.userId))
                console.log("user" + JSON.stringify(props))

                setLoggedIn(true)

            })


    }

    useEffect(() => {
        // axios
        //     .delete("http://localhost:8080/users/deleteAllUsers")
        //     .then(()=>{
        //         console.log("deleted")
        //     })
        if (loggedIn) {
            navigateToHomePage()
        }

        return () => {
            console.log(JSON.stringify(user))
            //    connect()

        }
    }, [loggedIn])

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',

            height: '100vh'
        }}>
            <Card
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '10%',
                    width:'25%',
                    alignItems: 'center',
                    height: '50vh'
                }}
                variant="outlined"
            >

                <CardContent
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width:'90%',
                    }}
                >
                    <Typography variant="h5" component="div">
                        Login
                    </Typography>

                    <TextField style={{ margin: '2%' }} onChange={(e) => { setEmail(e.target.value) }} id="standard-helperText" fullWidth={true} label="Email" variant="outlined" />
                    <TextField style={{ margin: '2%' }} onChange={(e) => { setPassword(e.target.value) }} id="standard-helperText" fullWidth={true} label="password" variant="outlined" />
                </CardContent>
                <Typography variant="h10" component="div">
                <Link to="/"> ForgotPassword ?</Link>
                    </Typography>
                <CardActions>
                    <Button onClick={setUserInStore} color="primary" fullWidth={true} variant="contained">Login</Button>
                </CardActions>
                <Typography variant="h10" component="div">
                        Don't have an account ? <Link to="/signup">SignUp</Link>
                    </Typography>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)