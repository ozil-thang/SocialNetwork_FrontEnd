import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const OnlineUsers = ({ users }) => {
    return (
        <ul>
            {users.map((user, index) => {
                return <li key={index}>{user}</li>
            })}
        </ul>
    )
}

OnlineUsers.propTypes = {
    users: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    users: state.onlineuser.users
})

export default connect(mapStateToProps)(OnlineUsers)
