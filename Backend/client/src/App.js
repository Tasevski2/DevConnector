import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import Layout from './components/Layout/Layout';
import Landing from './components/Landing/Landing';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Alerts from './components/Alerts/Alerts';
import * as actions from './store/actions/index';




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
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </section>
      </Layout>
    </Fragment>
  );
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(actions.loadUser())
  }
}

export default connect(null, mapDispatchToProps)(App);
