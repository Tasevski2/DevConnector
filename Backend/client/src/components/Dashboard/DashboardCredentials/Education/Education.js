import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Credential from '../Credential/Credential';
import PropTypes from 'prop-types';
import * as actions from '../../../../store/actions/index';

const Education = (props) => {

    const deleteEducationHandler = (id) => {
        props.deleteEducation(id);
    }
    let output = null;
    if (props.education) {
        output = props.education.map(edu => <Credential
            key={edu._id}
            name_c_s={edu.school}
            title_degree={edu.degree}
            from={edu.from}
            to={edu.to ? edu.to : null}
            deleteCredential={() => deleteEducationHandler(edu._id)}
        />);
    }


    return <Fragment>
        <h2 className="my-2">Education Credentials</h2>
        { output && output.length !== 0 ?
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {
                        output
                    }
                </tbody>
            </table>
            :
            <h4 className="my-2">Add some education!</h4>
        }
    </Fragment>;
}

Education.propTypes = {
    education: PropTypes.array
}

const mapStateToProps = state => {
    return {
        education: state.profiles.profile.education
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteEducation: (id) => dispatch(actions.deleteEducation(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Education);