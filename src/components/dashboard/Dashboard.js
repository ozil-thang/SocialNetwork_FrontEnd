import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { DashboardActions } from './DashboardActions';
import Experience from './Experience';
import Education from './Education';


const Dashboard = ({ auth: { user }, profile: { loading, profile }, getCurrentProfile, deleteAccount }) => {
    useEffect(() => {
        console.log('Dashboard useEffect')
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? <Spinner /> :
        <Fragment>
            <h1 className='large text-primary'>Dashboard</h1>

            {profile !== null ? (
                <Fragment>
                    <p className='lead'>
                        <i className='fas fa-user' />Welcome {profile.displayName ? profile.displayName : user.email}
                    </p>
                    <DashboardActions />
                    <Experience experience={profile.experiences} />
                    <Education education={profile.educations} />
                </Fragment>
            ) : (
                    <Fragment>
                        <p className='lead'>
                            <i className='fas fa-user' />Welcome {user && user.email}
                        </p>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
                    </Fragment>
                )}
        </Fragment>
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)

