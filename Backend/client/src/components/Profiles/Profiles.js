import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';
import ProfileItem from './ProfileItem/ProfileItem';

const Profiles = (props) => {
    const { getProfiles } = props;

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return props.loading ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Developers</h1>
        <p className="lead"><FontAwesomeIcon icon={faConnectdevelop} /> Browse and connect with developers</p>
        <div className="profiles">
            {props.profiles.length > 0 ?
                props.profiles.map(pro => <ProfileItem
                    key={pro._id}
                    profile={pro}
                />)
                :
                <h4>No profiles found...</h4>
            }
        </div>
    </Fragment>
}

Profiles.propTypes = {
    profiles: PropTypes.array,
    loading: PropTypes.bool,
    getAllProfiles: PropTypes.func
}

const mapStateToProps = state => {
    return {
        profiles: state.profiles.profiles,
        loading: state.profiles.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfiles: () => dispatch(actions.getAllProfiles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);