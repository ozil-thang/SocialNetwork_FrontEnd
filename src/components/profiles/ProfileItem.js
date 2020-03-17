import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = ({
    profile: {
        userId,
        userName,
        avatar,
        status,
        company,
        location,
        skills
    }
}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="not-found" className="round-img" />
            <div>
                <h2>{userName}</h2>
                <p>{status} {company && <span> at {company}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profiles/${userId}`} className="btn btn-primary">View Profile</Link>
            </div>
            <ul>
                {
                    skills.slice(0, 4).map((skill, index) => (
                        <li key={index} className="text-primary">
                            <i className='fas fa-check' /> {skill}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem
