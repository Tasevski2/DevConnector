import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Landing from './components/Landing/Landing';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Alerts from './components/Alerts/Alerts';




function App() {
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

export default App;
