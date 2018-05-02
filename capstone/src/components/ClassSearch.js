import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { Redirect } from 'react-router';

export default class ClassSearch extends Component {
  constructor() {
    super();
    this.state = {
      courseName: "",
      courseType: "",
      courseNum: "",
      search: false
    }
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  courseTypeChanged = (e) => {
    this.setState({courseType: e.target.value});
  }

  courseNameChanged = (e) => {
    this.setState({courseName: e.target.value});
  }

  courseNumChanged = (e) => {
    this.setState({courseNum: e.target.value});
  }

  render(){
    if (this.context.store.getState().user){
      return(
        <div>
          <Navbar store={this.context.store} active="ClassSearch"/>
          <section className="section">
            <div className="container">
              <h1 className="title has-text-left">
                Class Search
              </h1>
            </div>
            <div className="is-divider" />
          </section>
          <section className="section">
            <div className="columns">
               <div className="column">
                 <div className="container is-fluid">
                   <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label is-medium">Course Name</label>
                    </div>
                    <div className="field-body">
                      <div className="control">
                      <input className="input is-medium is-link is-rounded" type="text" value={this.state.courseName} onChange={this.courseNameChanged}/>
        
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                      <div className="field-label">
                        <label className="label is-medium">Course Type</label>
                      </div>
                      <div className="field-body">
                        <div className="control">
                          <div className="select is-medium is-link is-rounded">
                            <select value={this.state.courseType} onChange={this.courseTypeChanged}>
                              <option value="Computer Science">Computer Science</option>
                              <option value="Information Systems">Information Systems</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="field is-horizontal">
                     <div className="field-label">
                      <label className="label is-medium">Course Name</label>
                      </div>
                     <div className="field-body">
                      <div className="control">
                        <input className="input is-medium is-link is-rounded" type="text" value={this.state.courseNum} onChange={this.courseNumChanged}/>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                      <div className="field-label">
                        <label className="label is-medium"></label>
                      </div>
                      <div className="field-body">
                        <div className="control">
                          <button className={"button is-link is-rounded " + this.state.search}>Search</button>
                        </div>
                      </div>
                    </div>
                 </div>
                </div>
              </div>
          </section>
        </div>
      )
    }
    return <Redirect to="/login"/>
  }
}
