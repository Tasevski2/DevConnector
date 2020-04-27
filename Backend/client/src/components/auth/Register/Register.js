import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const Register = () => {
    
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
            console.log("Passwords does not match!");
        } else {
            console.log(formData);
        }
        e.preventDefault();
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
                    name="name" 
                    required />
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
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={e => formHandler(e)}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        minLength="6"
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

export default Register;