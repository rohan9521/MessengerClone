import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import { BASE_URL } from '../../utils/Constants';
import { useEffect } from 'react';
import FormData from 'form-data';
function SignUp() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [user,setUser] = useState('')
    const [file,setFile] = useState(null)
    const [profileImageId,setProfileImageId] = useState('')
    const inputRef = useRef()

    let handleUploadProfilePic = () => {
        inputRef.current.click()
    }

    let handleSignUp = ()=>{
        if(email == '' || name == '' || password == ''){
            setError("Please fill the mandatory fields")
            return
        }
        setLoading(true)
        axios
            .post(BASE_URL+'users/saveUser',{
                name:name,
                email:email,
                password:password
            })
            .then((response)=>{
                setUser(response.data)
            })
    }

    useEffect(()=>{
        if(user=='')
            return 
        let data = new FormData()
        data.append('Image',file)
        axios
        .post(BASE_URL+"users/uploadprofileimage",data)
        .then((response)=>{
            console.log(JSON.stringify(response))
            setProfileImageId(response.data.url)
        })
    },[user])

    useEffect(()=>{
        if(profileImageId=='')
            return 
        let data = new FormData()
        data.append('Image',file)
        axios
        .post(BASE_URL+`users/setprofileimage`,{
            profileImageUrl:profileImageId,
            userId:user.userId
        })
        .then((response)=>{
            console.log(JSON.stringify(response))
        })
    },[profileImageId])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                backgroundColor: 'lightskyblue',

            }}
        >
            <div>
                <LinearProgress color="success"  style={{height:'100%'}}/>
            </div>
            <Card
                style={{
                    borderRadius: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh',
                    width: '30vw',
                    marginTop: '3%',
                }}
            >

                <CardContent
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%'
                    }}>
                    <Typography gutterBottom variant="h5" component="div">
                        SignUp
                    </Typography>
                    <TextField style={{ margin: '2%', borderRadius: '30px' }} onChange={(e)=>{setEmail(e.target.value)}} id="outlined-basic" fullWidth={true} variant='outlined' label="Email" ></TextField>
                    <TextField style={{ margin: '2%' }} id="outlined-basic" onChange={(e)=>{setName(e.target.value)}} fullWidth={true} variant='outlined' label="Name" ></TextField>
                    <TextField style={{ margin: '2%' }} id="outlined-basic"  onChange={(e)=>{setPassword(e.target.value)}} fullWidth={true} variant='outlined' label="Password" ></TextField>
                    <Typography gutterBottom variant="h5" component="div">
                        {error != '' && error}
                    </Typography>
                    <CardActions>
                        <Button margin="dense" fullWidth={true} color="secondary" onClick={handleUploadProfilePic} variant="outlined" >
                            <input type="file" accept="image/*" onChange={(e)=>{setFile(e.target.files[0])}} hidden ref={inputRef} />
                            Upload profile image
                        </Button>
                    </CardActions>
                    <CardActions>
                        <Button margin="dense" fullWidth={true} color="primary" variant="contained" onClick={handleSignUp} >Sign Up</Button>
                    </CardActions>
                </CardContent>
            </Card>
            <Card
                variant="outlined"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30vw',
                    borderRadius: '40px'
                }}
            >

                <CardContent
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%',

                    }}>
                    <Typography gutterBottom variant="h10" component="div">
                        Already have an account ? <Link to="/" > Login </Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUp