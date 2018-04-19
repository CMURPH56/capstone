import React, { Component } from 'react'

export default class Navbar extends Component {
  render () {
    return (
      <nav class="navbar is-link" aria-label="main navigation">
        <div class="navbar-brand">
          <div class= "navbar-item">
            DePaul Degree Planner
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            {
              this.props.user ?
              <button class="button is-link is-inverted" onClick={this.props.logout}>Log Out</button>
              :
              <button class="button is-link is-inverted" onClick={this.props.login}>Log In</button>
            }
          </div>
        </div>
      </nav>
    );
  }
}
