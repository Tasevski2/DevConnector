import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Credential = (props) => {
    return <tr>
        <td>{props.name_c_s}</td>
        <td className="hide-sm">{props.title_degree}</td>
        <td className="hide-sm">
            <Moment format='YYYY/MM/DD'>{props.from}</Moment> - {props.to ? <Moment format='YYYY/MM/DD'>{props.to}</Moment> : "Now"}
        </td>
        <td>
            <button className="btn btn-danger" onClick={props.deleteCredential}>
                Delete
      </button>
        </td>
    </tr>

}

Credential.propTypes = {
    name_c_s: PropTypes.string.isRequired,
    title_degree: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string,
    deleteCredential: PropTypes.func.isRequired
}

export default Credential;