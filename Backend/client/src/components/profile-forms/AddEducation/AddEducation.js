import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../store/actions/index';

const AddEducation = (props) => {

    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: ""
    });


    const onChangeCheckbox = () => {
        setFormData({ ...formData, current: !formData.current });
    }

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        props.addEducation(formData, props.history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
      </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => formSubmitHandler(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        onChange={e => onChangeHandler(e)}
                        value={formData.school}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        onChange={e => onChangeHandler(e)}
                        value={formData.degree}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Field Of Study"
                        name="fieldofstudy"
                        onChange={e => onChangeHandler(e)}
                        value={formData.fieldofstudy}
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
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            value={formData.current}
                            checked={formData.current}
                            onChange={onChangeCheckbox}
                        /> Current School or Bootcamp
          </p>
                </div>

                {!formData.current ?
                    <div className="form-group">
                        <h4>To Date</h4>
                        <input
                            type="date"
                            name="to"
                            onChange={e => onChangeHandler(e)}
                        value={formData.to}
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
                        placeholder="Program Description"
                        onChange={e => onChangeHandler(e)}
                        value={formData.description}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func
}


const mapDispatchToProps = dispatch => {
    return {
        addEducation: (data, history) => dispatch(actions.addEducationProfile(data, history))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(AddEducation));