import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function ChatRoom() {
  return (
    <div 
      style={{
        width:'100%',
        

      }}
    >
      <div 
        style={{
          height:'90%'
        }}
      >

      </div>
      <div 
        style={{

          display:'flex',
          paddingLeft:'1%',
          paddingRight:'1%'
        }}
        >
        <TextField id="standard-helperText" fullWidth={true} label="" variant="standard" />

        <Button onClick={()=>{}} style={{ color: 'blue' }} variant="outlined">Send</Button>
      </div>
    </div>
  )
}

export default ChatRoom