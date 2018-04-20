import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import App from '../App'
import Register from './Register'
import Profile from './Profile'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" render={() => (
              <Redirect to="/login"/>
          )}/>
        <Route path="/login" component={App}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
      </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
