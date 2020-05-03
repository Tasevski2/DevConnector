import React, { Fragment, useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import * as actions from './store/actions/index';

import Alerts from './components/Alerts/Alerts';
import Landing from './components/Landing/Landing';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// import Dashboard from './components/Dashboard/Dashboard';
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));

const Login = lazy(() => import('./components/auth/Login/Login'));
const Register = lazy(() => import('./components/auth/Register/Register'));






function App(props) {
  const { loadUser } = props;
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  
  return (
    <Fragment>
      <Layout>
        <Route exact path='/' component={Landing} />
        <section className="container">
          <Alerts />
          <Suspense fallback={<p>Loading...</p>} >
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <Redirect to='/' />
            </Switch>
          </Suspense>
        </section>
      </Layout>
    </Fragment>
  );
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
}



const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(actions.loadUser())
  }
}

export default connect(null, mapDispatchToProps)(App);
