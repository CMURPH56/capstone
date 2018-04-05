import React, { Component } from 'react'
import logout from '../helpers/auth'

export default class Navbar extends Component {
  render () {
    return (
      <nav class="navbar is-link" aria-label="main navigation">
        <div class="navbar-brand">
          <div class= "navbar-item">
            DePaul Degree Planner
          </div>
        </div>
        {
          this.props.signedIn &&
          <div class="navbar-end">
            <div class="navbar-item">
              <a class="button is-link is-inverted" onClick={logout}>Logout</a>
            </div>
          </div>
        }
      </nav>
    );
  }
}
