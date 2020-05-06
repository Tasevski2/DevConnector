import React, { Fragment, useEffect, lazy, Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import * as actions from './store/actions/index';

import Alerts from './components/Alerts/Alerts';
import Landing from './components/Landing/Landing';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
// import Dashboard from './components/Dashboard/Dashboard';
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));

const CreateProfile = lazy(() => import('./components/profile-forms/CreateProfile/CreateProfile'));
const EditProfile = lazy(() => import('./components/profile-forms/EditProfile/EditProfile'));
const AddExperience = lazy(() => import('./components/profile-forms/AddExperience/AddExperience'));
const AddEducation = lazy(() => import('./components/profile-forms/AddEducation/AddEducation'));
const Login = lazy(() => import('./components/auth/Login/Login'));
const Register = lazy(() => import('./components/auth/Register/Register'));
const Profiles = lazy(() => import('./components/Profiles/Profiles'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Posts = lazy(() => import('./components/posts/Posts'));
const Post = lazy(() => import('./components/Post/Post'));






function App(props) {
  const { loadUser } = props;
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  
  return (
    <Fragment>
      <Layout>
      
        <section className="container">
          <Alerts />
          <Suspense fallback={<p>Loading...</p>} >
            <Switch>
              <PublicRoute exact path='/' component={Landing} />
              <PublicRoute exact path='/register' component={Register} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
              <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
              <PrivateRoute exact path='/add-education' component={AddEducation} />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/post/:post_id' component={Post}/>
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PublicRoute exact path='/login' component={Login} />
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
