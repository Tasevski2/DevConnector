import React from 'react';
import PropTypes from 'prop-types';
import ExperienceItem from './ExperienceItem/ExperienceItem';

const Experience = (props) => {

    return props.experiences.length === 0 ? null : <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        {
            props.experiences && props.experiences.map(exp => <ExperienceItem 
                key={exp._id}
                experience = {exp}
            />)
        }
    </div>
}

Experience.propTypes = {
    experiences: PropTypes.array.isRequired
}

export default Experience;