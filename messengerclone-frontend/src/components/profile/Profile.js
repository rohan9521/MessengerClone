import React from 'react'
import { connect } from 'react-redux'

function Profile(props) {
    return (
        <div>
            {JSON.stringify(props)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}


export default connect(mapStateToProps)(Profile)