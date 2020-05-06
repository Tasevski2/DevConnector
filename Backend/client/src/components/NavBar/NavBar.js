import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const NavBar = (props) => {
    let links = <ul>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
    </ul>;

    if (props.isAuthenticated) {
        links = <ul>
            <li><Link to='/posts'>Posts</Link></li>
            <li><Link to="/dashboard"><FontAwesomeIcon icon={faUser} />     <span className="hide-sm">Dashboard</span></Link></li>
            <li><Link onClick={props.logout} to="/"><FontAwesomeIcon icon={faSignOutAlt} />     <span className="hide-sm">Logout</span></Link></li>
        </ul>;
    }
    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
                </h1>
                <ul>
                <li><Link to="/profiles">Developers</Link></li>
                    {links}
                </ul>
            </nav>
        </div>
    )
}

NavBar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);