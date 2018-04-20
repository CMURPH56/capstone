import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logout } from '../helpers/auth';
import { logoutUser } from '../actions'

export default class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
    })
  }

  handleLogout = async() => {
    await logout(this.context.store);
    // Redirect to login
    this.props.store.dispatch(logoutUser())
    this.context.router.history.push('/login')
  }

  render () {
    if (this.props.store.getState().user){
      return (
        <nav className="navbar is-link" aria-label="main navigation">
          <div className="navbar-brand">
            <div className= "navbar-item">
              DePaul Degree Planner
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <button className="button is-link is-inverted" onClick={this.handleLogout}>Log Out</button>
            </div>
          </div>
        </nav>
      );
    }
    else {
      return (
        <nav className="navbar is-link" aria-label="main navigation">
          <div className="navbar-brand">
            <div className= "navbar-item">
              DePaul Degree Planner
            </div>
          </div>
        </nav>
      );
    }
  }
}
