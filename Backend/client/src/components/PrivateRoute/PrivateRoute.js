import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest}) => (
    <Route {...rest} render={props => !isAuthenticated ? (<Redirect to='/login'/>) : (<Component {...props}/>)}/>
);

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps)(PrivateRoute);
