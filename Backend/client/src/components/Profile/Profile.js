import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import ProfileTop from './ProfileTop/ProfileTop';
import ProfileAbout from './ProfileAbout/ProfileAbout';
import Experience from './Experience/Experience';
import Education from './Education/Education';
import GithubRepos from './GithubRepos/GithubRepos';

const Profile = (props) => {
    const { getProfileById, match: { params: { id } } } = props;

    useEffect(() => {
        getProfileById(id);
    }, [getProfileById]);

    return props.loading || props.profile === null ? <Spinner /> : <Fragment>
        <Link to='/profiles' className="btn btn-light">Back To Profiles</Link>
        {   props.auth.isAuthenticated && props.profile.user._id === props.auth.user._id ?
            <Link to='/edit-profile' className="btn btn-dark">Edit Profile</Link>
            :
            null
        }
        <div className="profile-grid my-1">
            <ProfileTop profile={props.profile}/>
            <ProfileAbout profile={props.profile}/>
            <Experience experiences={props.profile.experience}/>
            <Education education={props.profile.education}/>
            <GithubRepos repos={props.repos} username={props.profile.githubusername}/>
        </div>
    </Fragment>  
        
}

Profile.propTypes = {
    profile: PropTypes.object,
    auth: PropTypes.object,
    repos: PropTypes.array,
    loading: PropTypes.bool
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        profile: state.profiles.profile,
        repos: state.profiles.repos,
        loading: state.profiles.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfileById: (id) => dispatch(actions.getProfileById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);