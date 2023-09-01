import React from 'react'
import { connect } from 'react-redux'
import Avatar from '@mui/material/Avatar';

function Profile(props) {
    return (
        <div
          style={{
            width: '80vw',
            height: '90vh',
           
        }}>
            <div
                style={{
                    width: '100%',
                    height: '30%',
                 
                }}
            >
                <Avatar  style={{
                    width: '5%',
                    height: '5%',
              
                }} alt="https://hips.hearstapps.com/hmg-prod/images/jackie-chan-news-photo-83389121-1567001252.jpg?crop=0.784xw:1.00xh;0.0255xw,0&resize=1200:*" />
            </div>
            <div>
sfs
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}


export default connect(mapStateToProps)(Profile)