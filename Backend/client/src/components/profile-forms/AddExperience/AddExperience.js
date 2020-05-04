import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../store/actions/index';

const AddExperience = (props) => {

    const [formData, setformData] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: ""
    });

    const onChangeHandler = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onChangeCheckbox = () => {
        setformData({
            ...formData,
            current: !formData.current
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // console.log(formData);
        props.addExperience(formData, props.history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add An Experience
      </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmitHandler(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        value={formData.title}
                        onChange={e => onChangeHandler(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        value={formData.company}
                        onChange={e => onChangeHandler(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={formData.location}
                        onChange={e => onChangeHandler(e)}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        name="from"
                        value={formData.from}
                        onChange={e => onChangeHandler(e)}
                    />
                </div>
                <div className="form-group">
                    <p><input
                        type="checkbox"
                        name="current"
                        value={formData.current}
                        checked={formData.current}
                        onChange={onChangeCheckbox}
                    /> Current Job</p>
                </div>
                {!formData.current ?
                    <div className="form-group">
                        <h4>To Date</h4>
                        <input
                            type="date"
                            name="to"
                            value={formData.to}
                            onChange={e => onChangeHandler(e)}
                        />
                    </div>
                    :
                    null
                }
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={formData.description}
                        onChange={e => onChangeHandler(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        addExperience: (data, history) => dispatch(actions.addExperienceProfile(data, history))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(AddExperience));