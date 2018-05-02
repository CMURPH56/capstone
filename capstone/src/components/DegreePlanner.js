import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { Redirect } from 'react-router';

export default class DegreePlanner extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  render(){
    if (this.context.store.getState().user){
      return(
        <div>
          <Navbar store={this.context.store} active="DegreePlanner"/>
          <section className="section">
            <div className="container">
              <h1 className="title has-text-left">
                Degree Planner
              </h1>
            </div>
            <div className="is-divider" />
          </section>
        </div>
      )
    }
    return <Redirect to="/login"/>
  }
}
