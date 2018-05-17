import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import DegreePlanner from './DegreePlanner'
import ClassSearch from './ClassSearch'
import DegreeRequirements from './DegreeRequirements'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" render={() => (
              <Redirect to="/login"/>
          )}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/degree_planner" component={DegreePlanner}/>
        <Route path="/class_search" component={ClassSearch}/>
        <Route path="/degree_requirements" component={DegreeRequirements}/>
      </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
