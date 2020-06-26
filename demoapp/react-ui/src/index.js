import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import Auth from './components/Auth';
import Search from './components/Search/Search';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './redux/rootReducer'
import { CookiesProvider } from 'react-cookie';
import reduxlogger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import getJWTToken from './helper/GetJWTToken'

const store = createStore(
  rootReducer,
  {
    auth:{isAuthenticated:getJWTToken()}
  },
  composeWithDevTools(applyMiddleware(reduxThunk,reduxlogger))
);

// console.log('initial state', store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <App>
          <Route path="/" exact component={Auth} />
          <Route path="/search" component={Search} />
        </App>
      </BrowserRouter>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
