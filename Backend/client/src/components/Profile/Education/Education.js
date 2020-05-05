import React from 'react';
import PropTypes from 'prop-types';
import EducationItem from './EducationItem/EducationItem';

const Education = (props) => {

    return props.education.length === 0 ? null : <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Education</h2>
        {
            props.education.map(edu => <EducationItem 
                key={edu._id}
                education={edu}
            />)
        }
    </div>
}

Education.propTypes = {
    education: PropTypes.array.isRequired
}

export default Education;