import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ProfileAbout = (props) => {
    const { profile } = props;

    return <div className="profile-about bg-light p-2">
        {profile.bio && (
            <Fragment>
                <h2 className="text-primary">{profile.user.name}'s Bio</h2>
                <p>{profile.bio}</p>
            </Fragment>
        )
        }

        <div className="line"></div>
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
            {
                profile.skills.map((skill, index) => <div key={index} className="p-1"><FontAwesomeIcon icon={faCheck} /> {skill}</div>)
            }
        </div>
    </div>
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout;