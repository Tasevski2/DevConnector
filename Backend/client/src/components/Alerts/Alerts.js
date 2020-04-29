import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alerts = (props) => {
    let alerts = null;
    if(props.alerts !== null && props.alerts.length > 0) {
        alerts = props.alerts.map(alert => 
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div>);
    }
    return alerts;
}

Alerts.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    return {
        alerts: state.alert
    }
}

export default connect(mapStateToProps)(Alerts);