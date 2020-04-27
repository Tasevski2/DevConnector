import React, { useState } from 'react';

import { Link } from 'react-router-dom';


const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const formDataHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitHandler = (e) => {
        console.log(formData);
        e.preventDefault();
    }
    return (
        <div>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input
                        type="email"
                        value={formData.email}
                        onChange={formDataHandler}
                        placeholder="Email Address"
                        name="email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={formData.password}
                        onChange={formDataHandler}
                        placeholder="Password"
                        name="password"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    )
}

export default Login;