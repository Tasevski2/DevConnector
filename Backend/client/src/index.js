import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './store/reducers/auth';
import profilesReducer from './store/reducers/profile';
import alertReducer from './store/reducers/alert';

const rootReducer = combineReducers({
  auth: authReducer,
  profiles: profilesReducer,
  alert: alertReducer
});

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

