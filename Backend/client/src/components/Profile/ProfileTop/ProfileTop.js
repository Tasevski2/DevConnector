import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebookSquare, faLinkedin, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

const ProfileTop = (props) => {
    const { profile } = props;
    return <div className="profile-top bg-primary p-2">
        <img
            className="round-img my-1"
            src={profile.user.avatar}
            alt=""
        />
        <h1 className="large">{profile.user.name}</h1>
        <p className="lead">{profile.status} {profile.company && <span>at {profile.company}</span>}</p>
        <p>{profile.location && <span>{profile.location}</span>}</p>
        <div className="icons my-1">
            {
                profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGlobe} size="2x" />
                    </a>
                )
            }

            {
                profile.social && profile.social.twitter && (
                    <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                )
            }
            {
                profile.social && profile.social.facebook && (
                    <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
            </a>
                )
            }
            {
                profile.social && profile.social.linkedin && (
                    <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
                )
            }
            {
                profile.social && profile.social.youtube && (
                    <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faYoutube} size="2x" />
    
                </a>
                )
            }
            {
                profile.social && profile.social.instagram && (
                    <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                )
            }
        </div>
    </div>
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop;