import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {

    const inputRef = useRef()

    let handleUploadProfilePic = () => {
        inputRef.current.click()
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw'
            }}
        >
            <Card
                style={{
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
                    <TextField style={{ margin: '2%' }} id="outlined-basic" fullWidth={true} variant='outlined' label="Email" ></TextField>
                    <TextField style={{ margin: '2%' }} id="outlined-basic" fullWidth={true} variant='outlined' label="Name" ></TextField>
                    <TextField style={{ margin: '2%' }} id="outlined-basic" fullWidth={true} variant='outlined' label="Password" ></TextField>
                    <CardActions>
                        <Button margin="dense" fullWidth={true} color="secondary" onClick={handleUploadProfilePic} variant="outlined" >
                            <input type="file" hidden ref={inputRef} />
                            Upload profile image
                        </Button>
                    </CardActions>
                    <CardActions>
                        <Button margin="dense" fullWidth={true} color="primary" variant="contained">Sign Up</Button>
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
                    <Typography gutterBottom variant="h10" component="div">
                        Already have an account ? <Link to="/" > Login </Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUp