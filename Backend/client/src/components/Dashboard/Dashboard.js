import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions/index';


const Dashboard = (props) => {
    const { profileFetch } = props;
    useEffect(() => {
        profileFetch();
    }, [profileFetch]);

    return (
        <div>
            Dashboard
        </div>
    )
}

Dashboard.propTypes = {
    profileFetch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        profileFetch: () => dispatch(actions.profileFetch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);