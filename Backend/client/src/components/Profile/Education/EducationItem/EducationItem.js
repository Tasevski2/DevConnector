import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const EducationItem = (props) => {
    const { education } = props;
    return <div>
        <h3>{education.school}</h3>
        <p><Moment format='MMM YYYY'>{education.from}</Moment> - {education.current ? 'Current' : <Moment format='MMM YYYY'>{education.to}</Moment>}</p>
        <p><strong>Degree: </strong>{education.degree}</p>
        <p><strong>Field Of Study: </strong>{education.fieldofstudy}</p>
        {
            education.description && <p>
                <strong>Description: </strong>{education.description}</p>
        }
    </div>
}

EducationItem.propTypes = {
    education: PropTypes.object.isRequired
}

export default EducationItem;