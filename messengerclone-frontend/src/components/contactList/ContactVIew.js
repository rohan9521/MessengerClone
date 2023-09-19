import React from 'react'
import Avatar from '@mui/material/Avatar';

function ContactVIew(props) {
  return (
    <div
        style={{
            display:'flex',
            borderRadius:'30px',
            backgroundColor:'#1d62d1'
        }}
    >
         <Avatar  
            style={{
                  margin:'2%',
                }} 
                sx={{ width:50, height: 50}}
                src={`${props.user.imageUrl}`}  alt="https://hips.hearstapps.com/hmg-prod/images/jackie-chan-news-photo-83389121-1567001252.jpg?crop=0.784xw:1.00xh;0.0255xw,0&resize=1200:*" />
        <h3
         style={{
            overflow:'hidden',
            color:'white'
          }} 
        >{props.user.name}</h3>
    </div>
  )
}

export default ContactVIew