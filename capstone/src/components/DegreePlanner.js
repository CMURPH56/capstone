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
        </div>
      )
    }
    return <Redirect to="/login"/>
  }
}
