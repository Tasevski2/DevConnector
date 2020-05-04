import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PublicRoute = ({component: Component, isAuth, ...rest }) => (
    <Route {...rest} render={props => isAuth ? <Redirect to='/dashboard'/> : <Component {...props}/>}/>
);

PublicRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(PublicRoute);