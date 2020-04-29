import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link, Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

const Register = (props) => {
    
    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const formHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const onSubmitHandler = (e) => {
        if(formData.password !== formData.confirmPassword) {
            props.setAlert("Passwords does not match!", "danger");
        } else {
            props.register(formData.name, formData.email, formData.password);
        }
        e.preventDefault();
    }

    if(props.isAuthenticated) {
        return <Redirect to='/dashboard'/>
    }

    return (
        <React.Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input type="text" 
                    value = {formData.name}
                    onChange = {e => formHandler(e)}
                    placeholder="Name" 
                    name="name"  />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        value={formData.email}
                        onChange={e => formHandler(e)}
                        placeholder="Email Address"
                        name="email" />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={formData.password}
                        onChange={e => formHandler(e)}
                        placeholder="Password"
                        name="password"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={e => formHandler(e)}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </React.Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAlert: (msg, alertType) => dispatch(actions.setAlert(msg, alertType)),
        register: (name, email, password) => dispatch(actions.register(name, email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);