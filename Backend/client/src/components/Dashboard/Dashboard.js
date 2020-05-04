import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import DashboardActions from './DashboardActions/DashboardActions';
import Experience from './DashboardCredentials/Experience/Experience';
import Education from './DashboardCredentials/Education/Education';

const Dashboard = (props) => {
    const { profileFetch } = props;
    useEffect(() => {
        profileFetch();
    }, [profileFetch]);

    return props.profile.loading && props.profile.profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary"> Dashboard</h1>
        <p className="lead">
            <FontAwesomeIcon icon={faUser} /> Welcome {props.user ? props.user.name : null}
        </p>
        {props.profile.profile === null ? <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className="btn btn-primary my-1">
                Create Profile
            </Link>
        </Fragment> : <Fragment> 
            <DashboardActions />
            <Experience />
            <Education />
            <div className="my-2">
            <button className="btn btn-danger" onClick={props.deleteAccount}>
                <FontAwesomeIcon icon={faUserMinus}/>Delete My Account
            </button>
          </div>
            </Fragment>}
    </Fragment>;
}

Dashboard.propTypes = {
    profileFetch: PropTypes.func.isRequired,
    profile: PropTypes.object,
    user: PropTypes.object
}

const mapStateToProps = state => {
    return {
        profile: state.profiles,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        profileFetch: () => dispatch(actions.profileFetch()),
        deleteAccount: () => dispatch(actions.deleteAccount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);