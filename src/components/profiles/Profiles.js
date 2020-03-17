import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getProfiles } from '../../actions/profile'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <div style={{ width: "50%", margin: "auto" }}>
            {
                loading ? <Spinner /> :
                    <Fragment>
                        <h1 className="large text-primary">Users</h1>

                        <div className="profiles">
                            {profiles.length > 0 ? (
                                profiles.map(profile => (
                                    <ProfileItem key={profile.userId} profile={profile} />
                                )))
                                : <Spinner />}
                        </div>
                    </Fragment>
            }
        </div>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
