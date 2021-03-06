import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { faFacebookSquare, faTwitterSquare, faYoutubeSquare, faLinkedin, faInstagramSquare } from '@fortawesome//free-brands-svg-icons';
import Spinner from '../../UI/Spinner/Spinner';

const EditProfile = (props) => {
    const {fetchProfile, loading, profile} = props;
    
    const [formData, setFormData] = useState({
        status: "",
        company: "",
        website: "",
        location: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        youtube: "",
        linkedin: "",
        instagram: ""
    });


    useEffect(() => {
        fetchProfile();

        setFormData({
            status: !profile.status ? '' : profile.status,
            company:!profile.company ? '' : profile.company,
            website: !profile.website ? '' : profile.website,
            location: !profile.location ? '' : profile.location,
            skills: !profile.skills ? '' : profile.skills.join(','),
            githubusername: !profile.githubusername ? '' : profile.githubusername,
            bio: !profile.bio ? '' : profile.bio,
            twitter: !profile.social ? '' : profile.social.twitter,
            facebook: !profile.social ? '' : profile.social.facebook,
            youtube: !profile.social ? '' : profile.social.youtube,
            linkedin: !profile.social ? '' : profile.social.linkedin,
            instagram: !profile.social ? '' : profile.social.instagram
        });        

    }, [fetchProfile]);

    const [toggleSocial, setToggleSocial] = useState(false);

    
    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const formHandler = (e) => {
        props.createProfile(formData, props.history, true)
        e.preventDefault();
    }

    const toggleHandler = () => {
        setToggleSocial(!toggleSocial);
    }

    
    let output = <Spinner />

    if(!loading) {
        output =  <Fragment>
        <h1 className="large text-primary">
            Create Your Profile
  </h1>
        <p className="lead">
            <i className="fas fa-user"></i> Let's get some information to make your
    profile stand out
  </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e => formHandler(e)}>
            <div className="form-group">
                <select name="status" value={formData.status} onChange={e => onChangeHandler(e)}>
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text"
                >Give us an idea of where you are at in your career</small
                >
            </div>
            <div className="form-group">
                <input type="text" placeholder="Company" name="company" value={formData.company} onChange={e => onChangeHandler(e)} />
                <small className="form-text"
                >Could be your own company or one you work for</small
                >
            </div>
            <div className="form-group">
                <input type="text" placeholder="Website" name="website" value={formData.website} onChange={e => onChangeHandler(e)} />
                <small className="form-text"
                >Could be your own or a company website</small
                >
            </div>
            <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={formData.location} onChange={e => onChangeHandler(e)} />
                <small className="form-text"
                >City & state suggested (eg. Boston, MA)</small
                >
            </div>
            <div className="form-group">
                <input type="text" placeholder="* Skills" name="skills" value={formData.skills} onChange={e => onChangeHandler(e)} />
                <small className="form-text"
                >Please use comma separated values (eg.
        HTML,CSS,JavaScript,PHP)</small
                >
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Github Username"
                    name="githubusername"
                    value={formData.githubusername}
                    onChange={e => onChangeHandler(e)}
                />
                <small className="form-text"
                >If you want your latest repos and a Github link, include your
        username</small
                >
            </div>
            <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio" value={formData.bio} onChange={e => onChangeHandler(e)}></textarea>
                <small className="form-text">Tell us a little about yourself</small>
            </div>

            <div className="my-2">
                <button type="button" className="btn btn-light" onClick={toggleHandler}>
                    Add Social Network Links
      </button>
                <span>Optional</span>
            </div>
            {toggleSocial ?
                <Fragment>
                    <div className="form-group social-input">
                        <FontAwesomeIcon icon={faTwitterSquare} size="2x" />
                        <input type="text" placeholder="Twitter URL" name="twitter" value={formData.twitter} onChange={e => onChangeHandler(e)} />
                    </div>

                    <div className="form-group social-input">
                        <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
                        <input type="text" placeholder="Facebook URL" name="facebook" value={formData.facebook} onChange={e => onChangeHandler(e)} />
                    </div>

                    <div className="form-group social-input">
                        <FontAwesomeIcon icon={faYoutubeSquare} size="2x" />
                        <input type="text" placeholder="YouTube URL" name="youtube" value={formData.youtube} onChange={e => onChangeHandler(e)} />
                    </div>

                    <div className="form-group social-input">
                        <FontAwesomeIcon icon={faLinkedin} size="2x" />
                        <input type="text" placeholder="Linkedin URL" name="linkedin" value={formData.linkedin} onChange={e => onChangeHandler(e)} />
                    </div>

                    <div className="form-group social-input">
                        <FontAwesomeIcon icon={faInstagramSquare} size="2x" />
                        <input type="text" placeholder="Instagram URL" name="instagram" value={formData.instagram} onChange={e => onChangeHandler(e)} />
                    </div>
                </Fragment>
                :
                null
            }
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
    </Fragment>;
    }
    return output;
};

EditProfile.propTypes = {
    createProfile: PropTypes.func,
    fetchProfile: PropTypes.func,
    profile: PropTypes.object
};

const mapStateToProps = state => {
    return {
        profile: state.profiles.profile,
        loading: state.profiles.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createProfile: (formData, history, edit) => dispatch(actions.profileCreate(formData, history, edit)),
        fetchProfile: () => dispatch(actions.profileFetch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));