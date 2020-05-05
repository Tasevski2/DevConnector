import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ExperienceItem = (props) => {
    const { experience } = props;
    return <div>
        <h3 className="text-dark">{experience.company}</h3>
        <p><Moment format='MMMM YYYY' >{experience.from}</Moment> - {experience.current ? 'Current' : <Moment format='MMMM YYYY'>{experience.to}</Moment>}</p>
        <p><strong>Position: </strong>{experience.title}</p>
        {
            experience.description && <p>
                <strong>Description: </strong>{experience.description}</p>
        }
    </div>
}

ExperienceItem.propTypes = {
    experience: PropTypes.object.isRequired
}

export default ExperienceItem;