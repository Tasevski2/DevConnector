import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Credential from '../Credential/Credential';
import PropTypes from 'prop-types';
import * as actions from '../../../../store/actions/index';

const Experience = (props) => {

    const deleteExperienceHandler = (id) => {
        props.deleteExperience(id);
    }
    let output = null;
    if (props.experience) {
        output = props.experience.map(exp => <Credential
            key={exp._id}
            name_c_s={exp.company}
            title_degree={exp.title}
            from={exp.from}
            to={exp.to ? exp.to : null}
            deleteCredential={() => deleteExperienceHandler(exp._id)}
        />);
    }


    return <Fragment>
        <h2 className="my-2">Experience Credentials</h2>
        { output && output.length !== 0 ?
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        output
                    }
                </tbody>
            </table>
            :
            <h4 className="my-2">Add some experience!</h4>

        }
    </Fragment>

}

Experience.propTypes = {
    experience: PropTypes.array,
    deleteExperience: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        experience: state.profiles.profile.experience
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteExperience: (id) => dispatch(actions.deleteExperience(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience);